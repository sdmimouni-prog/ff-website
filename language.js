// Shared by both languages; resolve from this file to support subdirectory hosting.
(() => {
  'use strict';

  const base = new URL('.', document.currentScript.src);
  const current = new URL(window.location.href);
  const path = current.pathname.slice(base.pathname.length);
  const page = path.replace(/^en\//, '') || 'index.html';
  const pages = ['index.html', 'a-propos.html', 'filmographie.html', 'galerie.html', 'presse.html', 'contact.html'];
  if (!current.pathname.startsWith(base.pathname) || !pages.includes(page)) return;

  const language = document.documentElement.lang;
  const storageKey = `farah-language:${base.pathname}`;
  const validLanguage = value => value === 'fr' || value === 'en';
  const explicit = current.searchParams.get('lang');
  let preferred = null;

  // An explicit selector link always wins over a previously saved preference.
  // Storage is optional: the ordinary links still work in private/restricted browsers.
  try {
    preferred = window.localStorage.getItem(storageKey);
    if (validLanguage(explicit)) window.localStorage.setItem(storageKey, explicit);
  } catch { /* Navigation does not depend on storage access. */ }

  function equivalent(nextLanguage) {
    const target = new URL(`${nextLanguage === 'en' ? 'en/' : ''}${page}`, base);
    target.search = window.location.search;
    target.searchParams.delete('lang');
    target.hash = window.location.hash;
    return target;
  }

  const selected = validLanguage(explicit) ? explicit : preferred;
  if (validLanguage(selected) && selected !== language) {
    const target = equivalent(selected);
    // Carry explicit intent to the destination even when storage is unavailable.
    target.searchParams.set('lang', selected);
    window.location.replace(target.href);
    return;
  }

  if (validLanguage(explicit)) {
    current.searchParams.delete('lang');
    try { window.history.replaceState(window.history.state, '', current.href); }
    catch { /* Keeping the explicit language in the URL is a safe fallback. */ }
  }

  function updateLinks() {
    document.querySelectorAll('[data-language]').forEach(link => {
      const target = equivalent(link.dataset.language);
      target.searchParams.set('lang', link.dataset.language);
      link.href = target.href;
    });
  }

  document.addEventListener('DOMContentLoaded', updateLinks, { once: true });
  window.addEventListener('hashchange', updateLinks);
  window.addEventListener('pageshow', updateLinks);
  window.addEventListener('popstate', updateLinks);
})();
