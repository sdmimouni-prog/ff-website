"""Render the FF vector monogram and browser/iOS exports (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
BACKGROUND = '#141310'
IVORY = '#f1ece5'
CHAMPAGNE = '#d0bda5'
LETTER = [
    (10, 15), (30, 15), (30, 24), (28.5, 24), (27.5, 17.5),
    (18, 17.5), (18, 30), (25.5, 30), (26.5, 26), (28, 26),
    (28, 36.5), (26.5, 36.5), (25.5, 32.5), (18, 32.5),
    (18, 46.5), (22, 47.5), (22, 49), (10, 49), (10, 47.5),
    (13.5, 46.5), (13.5, 17.5), (10, 16.5),
]
points = ' '.join(f'{x:g},{y:g}' for x, y in LETTER)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <title>FF — Farah El Fassi</title>
  <rect width="64" height="64" rx="12" fill="{BACKGROUND}"/>
  <polygon points="{points}" fill="{IVORY}"/>
  <polygon points="{points}" transform="translate(24 0)" fill="{CHAMPAGNE}"/>
</svg>
'''
(ASSETS / 'favicon.svg').write_text(svg)

# Draw the same vectors at high resolution, then downsample for small sizes.
SCALE = 16
canvas = Image.new('RGBA', (64 * SCALE, 64 * SCALE), (0, 0, 0, 0))
draw = ImageDraw.Draw(canvas)
draw.rounded_rectangle((0, 0, 64 * SCALE - 1, 64 * SCALE - 1), radius=12 * SCALE, fill=BACKGROUND)
for offset, color in ((0, IVORY), (24, CHAMPAGNE)):
    draw.polygon([((x + offset) * SCALE, y * SCALE) for x, y in LETTER], fill=color)
for size in (16, 32, 48):
    canvas.resize((size, size), Image.Resampling.LANCZOS).save(ASSETS / f'favicon-{size}.png')
canvas.save(ROOT / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

# iOS applies its own corner mask; use an opaque square for the home-screen icon.
touch = Image.new('RGBA', canvas.size, BACKGROUND)
touch.alpha_composite(canvas)
touch.convert('RGB').resize((180, 180), Image.Resampling.LANCZOS).save(ASSETS / 'apple-touch-icon.png')
