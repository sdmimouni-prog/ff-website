"""Generate the six English pages from the approved French layout and translations.

Edit translations/en.json (HTML) and en-runtime.json (script text), then regenerate.
Images and styles are shared; original film titles and media links are preserved.
"""
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'en'
PAGES = ('index', 'a-propos', 'filmographie', 'galerie', 'presse', 'contact')
TRANSLATIONS = json.loads((ROOT / 'translations/en.json').read_text())
RUNTIME = json.loads((ROOT / 'translations/en-runtime.json').read_text())
BLOCKS = json.loads((ROOT / 'translations/en-blocks.json').read_text())
MISSING = set()


def translate(text):
    if not text.strip():
        return text
    match = re.fullmatch(r'(\s*)(.*?)(\s*)', text, re.S)
    before, phrase, after = match.groups()
    if phrase not in TRANSLATIONS:
        MISSING.add(phrase)
    return before + TRANSLATIONS.get(phrase, phrase) + after


class EnglishPage(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.raw = False

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        raw = self.get_starttag_text()
        updates = {}
        for key in ('alt', 'title', 'aria-label', 'aria-roledescription', 'placeholder', 'data-caption', 'data-search'):
            if attrs.get(key):
                updates[key] = translate(attrs[key])
        if tag == 'option' and attrs.get('value'):
            updates['value'] = translate(attrs['value'])
        if tag == 'html':
            updates['lang'] = 'en'
        if tag == 'meta':
            if attrs.get('name') in ('description', 'twitter:title', 'twitter:description', 'twitter:image:alt') or attrs.get('property') in ('og:title', 'og:description', 'og:image:alt'):
                updates['content'] = translate(attrs['content'])
            if attrs.get('property') == 'og:locale':
                updates['content'] = 'en_GB'
            if attrs.get('property') == 'og:url':
                updates['content'] = attrs['content'].replace('vercel.app/', 'vercel.app/en/')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            updates['href'] = attrs['href'].replace('vercel.app/', 'vercel.app/en/')
        for key in ('src', 'href', 'data-image'):
            path = attrs.get(key, '')
            if path.startswith('assets/') or path.startswith('favicon.ico') or re.match(r'^[\w-]+\.css(?:\?|$)', path):
                updates[key] = '../' + path
        if attrs.get('src') in ('assets/signature.png', 'assets/signature-claire.png'):
            updates['src'] = 'signature-light.svg' if 'claire' in attrs['src'] else 'signature.svg'
        if tag == 'script' and re.match(r'^[\w-]+\.js(?:\?|$)', attrs.get('src', '')):
            updates['src'] = attrs['src'].split('?')[0] + '?v=english-copy-2'
        for key, value in updates.items():
            raw = re.sub(r'(\b' + re.escape(key) + r'\s*=\s*)([\"\'])(.*?)\2', lambda m: m[1] + '"' + escape(value, quote=True) + '"', raw, count=1, flags=re.S)
        self.parts.append(raw)
        if tag in ('script', 'style'):
            self.raw = True

    def handle_startendtag(self, tag, pairs):
        self.handle_starttag(tag, pairs)

    def handle_endtag(self, tag):
        self.parts.append('</' + tag + '>')
        if tag in ('script', 'style'):
            self.raw = False

    def handle_data(self, text):
        self.parts.append(text if self.raw else escape(translate(text), quote=False))

    def handle_comment(self, text):
        self.parts.append('<!--' + text + '-->')

    def handle_decl(self, text):
        self.parts.append('<!' + text + '>')


def english_script(name):
    script = (ROOT / (name + '.js')).read_text()
    # Retire the unused Arabic dictionaries from the English output.
    script = re.sub(r'Object\.assign\(AR, \{.*?\}\);', '', script, flags=re.S)
    if name == 'script':
        script = re.sub(r'const AR = \{.*?\n\};', 'const AR = {};', script, count=1, flags=re.S)
        start = script.index("let language = 'fr';")
        end = script.index('// Mobile menu:', start)
        script = script[:start] + """const language = 'en';
let currentImageIndex = 0;
// HTML is already translated, including the content used by shared dialogs.
$$('[data-i18n]').forEach(element => { element.dataset.fr = element.innerHTML; });
document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(new CustomEvent('site:languagechange', { detail: { language } }));
});

""" + script[end:]
    pattern = re.compile('|'.join(re.escape(key) for key in sorted(RUNTIME, key=len, reverse=True)))
    script = pattern.sub(lambda match: RUNTIME[match[0]], script)
    script = script.replace('assets/', '../assets/')
    if name == 'contact':
        script += '\n' + (ROOT / 'translations/en-form-validation.js').read_text()
    return '// Generated by scripts/build-english.py; edit translations, not this file.\n' + script.rstrip() + '\n'


def build():
    OUTPUT.mkdir(exist_ok=True)
    used_blocks = set()
    for name in PAGES:
        parser = EnglishPage()
        parser.feed((ROOT / (name + '.html')).read_text())
        html = ''.join(parser.parts)
        # Translate complete editorial blocks when English needs its own word order.
        for key, copy in BLOCKS.items():
            pattern = r'(<(?P<tag>h[1-6]|p)\b[^>]*data-i18n="' + re.escape(key) + r'"[^>]*>).*?(</(?P=tag)>)'
            html, count = re.subn(pattern, lambda m: m[1] + copy + m[3], html, flags=re.S)
            if count:
                used_blocks.add(key)
        # The original French quotation is credited as a translation.
        html = html.replace('Aujourd’hui le Maroc · 2016 ↗', 'Aujourd’hui le Maroc · 2016 · Translated from French ↗')
        (OUTPUT / (name + '.html')).write_text(html)
    for name in ('script', 'a-propos', 'filmographie', 'galerie', 'presse', 'contact'):
        (OUTPUT / (name + '.js')).write_text(english_script(name))
    # Typeset the translated tagline as a vector, keeping its original footprint.
    for filename, colour in [('signature.svg', '#38342d'), ('signature-light.svg', '#e4dcd0')]:
        (OUTPUT / filename).write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" width="224" height="78" viewBox="0 0 224 78" role="img" aria-label="Stories that bring us together">
  <g fill="{colour}" font-family="Noteworthy, Segoe Print, cursive" font-size="20" font-style="italic" transform="rotate(-5 112 39)">
    <text x="6" y="32">Stories that bring</text><text x="62" y="61">us together</text>
  </g>
</svg>\n''')
    if MISSING:
        raise SystemExit('Missing English translations:\n' + '\n'.join(sorted(MISSING)))
    if unused := BLOCKS.keys() - used_blocks:
        raise SystemExit('English editorial blocks no longer found: ' + ', '.join(sorted(unused)))
    print('Generated all six English pages and their scripts; shared design and images preserved.')


if __name__ == '__main__':
    build()
