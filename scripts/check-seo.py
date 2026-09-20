"""Check indexable metadata and language pairs in the static HTML, without JS."""
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NAMES = ('index', 'a-propos', 'filmographie', 'galerie', 'presse', 'contact')


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.meta = defaultdict(list)
        self.links = defaultdict(list)
        self.images = []
        self.titles = []
        self.head = self.in_title = False
        self.feed(path.read_text())

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == 'html':
            self.lang = attrs['lang']
        if tag == 'head':
            self.head = True
        if tag == 'title' and self.head:
            self.in_title = True
            self.titles.append('')
        if tag == 'meta' and self.head:
            self.meta[attrs.get('property', attrs.get('name'))].append(attrs.get('content'))
        if tag == 'link' and self.head:
            self.links[attrs.get('rel')].append(attrs)
        if tag == 'img':
            self.images.append(attrs)

    def handle_endtag(self, tag):
        if tag == 'head':
            self.head = False
        if tag == 'title':
            self.in_title = False

    def handle_data(self, text):
        if self.in_title:
            self.titles[-1] += text

    @property
    def canonical(self):
        assert len(self.links['canonical']) == 1, 'Exactly one canonical URL is required'
        return self.links['canonical'][0]['href']


pages = {(locale, name): Page(ROOT / ('en' if locale == 'en' else '') / (name + '.html'))
         for locale in ('fr', 'en') for name in NAMES}
base = pages['fr', 'index'].canonical
assert base.startswith('https://') and base.endswith('/')
english_titles, english_descriptions = set(), set()
image_count = 0
for (locale, name), page in pages.items():
    label = f'{locale}/{name}'
    suffix = '' if name == 'index' else name + '.html'
    expected = base + ('en/' if locale == 'en' else '') + suffix
    assert page.lang == locale, label
    assert page.canonical == expected, label + ': wrong canonical language/path'
    assert len(page.titles) == 1 and page.titles[0].strip(), label + ': missing or duplicate title'
    alternates = page.links['alternate']
    assert len(alternates) == 3, label + ': missing/duplicate language alternate'
    assert {a.get('hreflang'): a['href'] for a in alternates} == {
        'fr': pages['fr', name].canonical,
        'en': pages['en', name].canonical,
        'x-default': pages['fr', name].canonical
    }, label + ': alternate links must match in both languages'
    required = ('description', 'og:type', 'og:site_name', 'og:title', 'og:description',
                'og:url', 'og:locale', 'og:locale:alternate', 'og:image', 'og:image:secure_url',
                'og:image:width', 'og:image:height', 'og:image:type', 'og:image:alt',
                'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt')
    for key in required:
        assert len(page.meta[key]) == 1 and page.meta[key][0], f'{label}: missing/duplicate {key}'
    m = {key: page.meta[key][0] for key in required}
    assert m['og:url'] == page.canonical, label + ': sharing URL must retain language'
    assert m['og:title'] == m['twitter:title'] == page.titles[0], label + ': inconsistent titles'
    assert m['og:description'] == m['twitter:description'] == m['description'], label
    assert m['og:locale'] == ('en_GB' if locale == 'en' else 'fr_FR'), label
    assert m['og:locale:alternate'] == ('fr_FR' if locale == 'en' else 'en_GB'), label
    assert m['og:image'] == m['og:image:secure_url'] == m['twitter:image'], label
    assert m['og:image:alt'] == m['twitter:image:alt'], label
    assert m['og:image'].startswith(base), label + ': absolute HTTPS share image required'
    assert (ROOT / m['og:image'][len(base):]).is_file(), label + ': missing share image'
    assert m['og:image:type'] in ('image/jpeg', 'image/png'), label
    assert int(m['og:image:width']) >= 200 and int(m['og:image:height']) >= 200, label
    for image in page.images:
        assert 'alt' in image, label + ': missing image alternative'
        if locale == 'en':
            assert not any(text in image['alt'] for text in ('Affiche de ', 'Portrait de ', 'Photo de ', 'Des histoires qui')), label
            image_count += 1
    if locale == 'en':
        english_titles.add(page.titles[0])
        english_descriptions.add(m['description'])
        assert page.titles[0] != pages['fr', name].titles[0], label + ': untranslated title'
        assert m['description'] != pages['fr', name].meta['description'][0], label
        assert m['og:image:alt'] != pages['fr', name].meta['og:image:alt'][0], label

assert len(english_titles) == len(english_descriptions) == 6, 'Each English page needs its own metadata'
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
locations = ET.parse(ROOT / 'sitemap.xml').findall('s:url/s:loc', ns)
assert len(locations) == 12 and {loc.text for loc in locations} == {p.canonical for p in pages.values()}
robots = (ROOT / 'robots.txt').read_text()
assert 'Sitemap: ' + base + 'sitemap.xml' in robots and 'Disallow:' not in robots
print(f'SEO verified: 12 canonical pages, reciprocal language links, English sharing metadata, {image_count} image alternatives and sitemap.')
