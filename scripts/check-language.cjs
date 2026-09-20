// Exercise real generated headers and the shared language script without a browser.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'language.js'), 'utf8');
const pages = ['index', 'a-propos', 'filmographie', 'galerie', 'presse', 'contact'];

function visit(url, base, storage = new Map(), blocked = false) {
  let current = new URL(url);
  const relative = current.pathname.slice(new URL(base).pathname.length);
  const file = relative.endsWith('/') || !relative ? relative + 'index.html' : relative;
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const language = html.match(/<html lang="(fr|en)"/)[1];
  const tags = html.match(/<a\b[^>]*data-language="(?:fr|en)"[^>]*>/g);
  assert.equal(tags.length, 2, `${file}: two language links`);
  const links = tags.map(tag => ({
    href: new URL(tag.match(/href="([^"]+)"/)[1], current).href,
    dataset: { language: tag.match(/data-language="(fr|en)"/)[1] },
    active: tag.includes('aria-current="true"')
  }));
  assert.deepEqual(links.filter(link => link.active).map(link => link.dataset.language), [language]);
  for (const link of links) {
    const target = new URL(link.href);
    const expected = new URL(`${link.dataset.language === 'en' ? 'en/' : ''}${file.split('/').pop()}`, base);
    assert.equal(target.pathname, expected.pathname, `${file}: static fallback target`);
    assert.equal(target.searchParams.get('lang'), link.dataset.language);
  }
  const scriptTag = html.match(/<script src="([^"]*language\.js[^\"]*)"><\/script>/);
  assert.ok(scriptTag && html.indexOf(scriptTag[0]) < html.indexOf('<body'), 'preference applied before rendering');
  assert.equal(new URL(scriptTag[1], current).pathname, new URL('language.js', base).pathname);
  const callbacks = {};
  const listen = (name, fn) => { callbacks[name] = fn; };
  let redirect = null;
  const location = {
    get href() { return current.href; },
    get search() { return current.search; },
    get hash() { return current.hash; },
    replace(url) { redirect = url; }
  };
  vm.runInNewContext(source, {
    URL,
    document: {
      currentScript: { src: new URL(scriptTag[1], current).href },
      documentElement: { lang: language },
      querySelectorAll: () => links,
      addEventListener: listen
    },
    window: {
      location,
      localStorage: {
        getItem(key) { if (blocked) throw new Error('Storage denied'); return storage.get(key); },
        setItem(key, value) { if (blocked) throw new Error('Storage denied'); storage.set(key, value); }
      },
      history: { state: null, replaceState(_state, _title, url) { current = new URL(url); } },
      addEventListener: listen
    }
  });
  callbacks.DOMContentLoaded?.();
  return { links, redirect, language, url: current.href,
    changeHash(hash) { current.hash = hash; callbacks.hashchange(); }
  };
}

let scenarios = 0;
for (const base of ['https://example.com/', 'https://example.com/ff-website/']) {
  for (const name of pages) {
    const storage = new Map();
    const french = visit(new URL(`${name}.html?v=preview&subject=press#contenu`, base), base, storage);
    assert.equal(french.redirect, null);
    const english = visit(french.links[1].href, base, storage);
    assert.equal(english.language, 'en');
    assert.equal(english.redirect, null);
    assert.equal(new URL(english.url).searchParams.get('subject'), 'press');
    assert.equal(new URL(english.url).searchParams.get('v'), 'preview');
    assert.equal(new URL(english.url).hash, '#contenu');
    assert.equal(new URL(english.url).searchParams.has('lang'), false);
    assert.equal(visit(new URL(name + '.html', base), base, storage).redirect,
      new URL(`en/${name}.html?lang=en`, base).href);
    english.changeHash('#contact-form-title');
    const frenchAgain = visit(english.links[0].href, base, storage);
    assert.equal(frenchAgain.language, 'fr');
    assert.equal(frenchAgain.redirect, null);
    assert.equal(new URL(frenchAgain.url).hash, '#contact-form-title');
    assert.equal(visit(new URL(name + '.html', base), base, storage).redirect, null);
    // Explicit switches still work when the browser denies all storage operations.
    assert.equal(visit(french.links[1].href, base, storage, true).redirect, null);
    assert.equal(visit(english.links[0].href, base, storage, true).redirect, null);
    scenarios++;
  }
  const storage = new Map();
  const first = visit(base, base, storage);
  visit(first.links[1].href, base, storage);
  const returning = visit(base, base, storage);
  assert.equal(returning.redirect, new URL('en/index.html?lang=en', base).href);
  assert.equal(visit(returning.redirect, base, storage).redirect, null, 'no redirect loop');
  const override = visit(new URL('?lang=fr', base), base, storage);
  assert.equal(override.redirect, null, 'explicit French overrides saved English');
  assert.equal(visit(new URL('en/', base), base, new Map()).language, 'en', 'first direct English visit');
}
console.log(`Language navigation verified: ${scenarios} page/hosting combinations, preferences, anchors, parameters, static links and blocked storage.`);
