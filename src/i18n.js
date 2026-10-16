'use strict';
// Hidden Council — localization runtime.
//
// Nine locales: en-US, en-GB, es-419, es-ES, de-DE, fr-FR, fr-CA, pt-BR, it-IT.
// English source strings are the keys; ./strings.js holds the tables (en-GB,
// es-ES and fr-CA carry only their differences from en-US, es-419 and fr-FR).
// The locale comes from the game's Language setting through sh-language.js
// (window.StarHermitLanguage, loaded before bundle.js): explicit choice →
// StarHermit account preference → navigator.languages → en-US. ?lang= forces a
// locale for the page load (QA links) and hides the selector.
//
// T(key, vars) translates now. L(key, vars) is a deferred message (a function):
// UI nodes built with one (ui.el / ui.button / bindText) re-render in place when
// the language changes, so a switch never rebuilds a screen, restarts a session
// or touches the room socket. `hc-language` fires on document after a change.

import { TABLES } from './strings.js';

export const LOCALES = ['en-US', 'en-GB', 'es-419', 'es-ES', 'de-DE', 'fr-FR', 'fr-CA', 'pt-BR', 'it-IT'];
const PARENT = { 'en-GB': 'en-US', 'es-ES': 'es-419', 'fr-CA': 'fr-FR' };
const hasOwn = Object.prototype.hasOwnProperty;
let lang = 'en-US';

function lookup(key) {
  for (let l = lang; l; l = PARENT[l]) {
    const t = TABLES[l];
    if (t && hasOwn.call(t, key)) return t[key];
  }
  return key;
}

/** Text of a string or deferred message. */
export function text(x) { return x == null ? '' : typeof x === 'function' ? text(x()) : String(x); }

/** Translate an English source string; {name} placeholders come from vars (messages render too). */
export function T(key, vars) {
  let s = lookup(String(key));
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (hasOwn.call(vars, k) ? text(vars[k]) : m));
  return s;
}

/** A deferred message: renders in the current language whenever it is shown. */
export function L(key, vars) { return () => T(key, vars); }

export function currentLang() { return lang; }

function paint(node, slot, fn) {
  const v = text(fn);
  if (slot === 'text') { if (node.textContent !== v) node.textContent = v; }
  else if (node.getAttribute(slot) !== v) node.setAttribute(slot, v);
}
/** Bind a node's text (slot 'text') or an attribute to a message; plain strings unbind. */
export function bindText(node, x, slot = 'text') {
  if (typeof x === 'function') {
    if (!node.__hcI18n) { node.__hcI18n = {}; node.setAttribute('data-hc-i18n', ''); }
    node.__hcI18n[slot] = x;
  } else if (node.__hcI18n) delete node.__hcI18n[slot];
  paint(node, slot, x);
}
/** Re-render every bound node in the document. */
export function relabel() {
  if (typeof document === 'undefined') return;
  for (const n of document.querySelectorAll('[data-hc-i18n]')) {
    const map = n.__hcI18n;
    if (map) for (const slot of Object.keys(map)) paint(n, slot, map[slot]);
  }
}

function setLocale(next) {
  lang = LOCALES.includes(next) ? next : 'en-US';
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
  relabel();
  document.dispatchEvent(new CustomEvent('hc-language', { detail: { lang } }));
}

let forced = null;
try { forced = new URLSearchParams(window.location.search).get('lang'); } catch (e) { /* no window / opaque origin */ }
const SL = typeof window !== 'undefined' ? window.StarHermitLanguage : null;
const forcedLocale = forced && SL ? SL.match(forced, LOCALES) : null;
export const language = SL ? SL.create({
  game: 'hidden-council', supported: LOCALES, panel: !forcedLocale,
  apply: (locale) => setLocale(forcedLocale || locale),
}) : null;
if (!language) setLocale('en-US');
