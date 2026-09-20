"""Validate and package only public static website files."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import runpy
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '_site'

# Keep translated pages in sync with the approved layout before packaging.
runpy.run_path(str(ROOT / 'scripts/build-english.py'), run_name='__main__')


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.refs = [], []
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        for key in ('src', 'href', 'data-image'):
            if attrs.get(key):
                self.refs.append(attrs[key])


public_dirs = (ROOT, ROOT / 'en')
pages = {path.relative_to(ROOT).as_posix(): Page(path)
         for directory in public_dirs for path in directory.glob('*.html')}
errors = []
for name, page in pages.items():
    errors.extend(f'{name}: duplicate ID {value}' for value, count in Counter(page.ids).items() if count > 1)
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        target = ((ROOT / name).parent / unquote(url.path)).resolve() if url.path else ROOT / name
        path = target.relative_to(ROOT).as_posix()
        if not (ROOT / path).is_file():
            errors.append(f'{name}: missing file {ref}')
        if url.fragment and path in pages and unquote(url.fragment) not in pages[path].ids:
            errors.append(f'{name}: missing anchor {ref}')

public_code = sorted(path for directory in public_dirs for path in directory.iterdir()
                     if path.suffix in ('.html', '.css', '.js', '.svg'))
for path in public_code:
    content = path.read_text()
    if re.search(r'(?:/Users/|file:///|https?://(?:localhost|127\.0\.0\.1))', content):
        errors.append(f'{path.name}: local-only reference')
    for ref in re.findall(r'assets/[\w./-]+\.(?:webp|png|jpe?g|svg|woff2?|json|mp4)', content):
        if not (ROOT / ref).is_file():
            errors.append(f'{path.name}: missing resource {ref}')
if errors:
    raise SystemExit('\n'.join(errors))

if OUTPUT.exists():
    shutil.rmtree(OUTPUT)
OUTPUT.mkdir()
for path in public_code:
    destination = OUTPUT / path.relative_to(ROOT)
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, destination)
shutil.copytree(ROOT / 'assets', OUTPUT / 'assets')
shutil.copy2(ROOT / 'favicon.ico', OUTPUT / 'favicon.ico')
(OUTPUT / '.nojekyll').touch()
print(f'Validated {len(pages)} pages; packaged {len(list(OUTPUT.rglob("*")))} entries in _site.')
