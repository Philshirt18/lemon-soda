import { LANGS, STRINGS } from './content.js';
import { getItem, setItem } from './store.js';

const SUPPORTED = LANGS.map((l) => l.code);
let current = 'en';

export function detectLang() {
  const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  for (const p of prefs) {
    const code = String(p).slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(code)) return code;
  }
  return 'en';
}

export function initLang() {
  const saved = getItem('lang');
  current = SUPPORTED.includes(saved) ? saved : detectLang();
  document.documentElement.lang = current;
  return current;
}

export function getLang() {
  return current;
}

export function setLang(code) {
  if (!SUPPORTED.includes(code)) return;
  current = code;
  setItem('lang', code);
  document.documentElement.lang = code;
  applyTranslations();
}

function lookup(key) {
  return (STRINGS[current] && STRINGS[current][key]) || STRINGS.en[key] || key;
}

function fill(text, vars) {
  return vars ? text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : text;
}

// Text for the chosen language. {name} style placeholders are filled from vars.
export function t(key, vars) {
  const v = lookup(key);
  return fill(Array.isArray(v) ? v[0] : v, vars);
}

// The whole list of variants for a key (empty list if the key is a single text).
export function tList(key) {
  const v = lookup(key);
  return Array.isArray(v) ? v : [];
}

// Same, but when a key holds several variants, pick one at random.
export function tPick(key, vars) {
  const v = lookup(key);
  return fill(Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v, vars);
}

// Fills every element marked with data-i18n (text), data-i18n-placeholder or data-i18n-aria.
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  if (root === document) document.dispatchEvent(new CustomEvent('langchange'));
}
