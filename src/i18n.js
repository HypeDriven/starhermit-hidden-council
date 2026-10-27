'use strict';
// Hidden Council — localization runtime.
//
// Nine locales: en-US, en-GB, es-419, es-ES, de-DE, fr-FR, fr-CA, pt-BR, it-IT.
// English source strings are the keys; ./strings.js holds the tables (en-GB,
// es-ES and fr-CA carry only their differences from en-US, es-419 and fr-FR).
// The locale is the runtime's interface language (Options › Language, else the
// device's), mapped to the nearest shipped locale by matchLocale; the engine
// client calls setLocale whenever it changes. The UI is immediate mode, so a
// change shows on the next frame.
//
// T(key, vars) translates now. L(key, vars) is a deferred message (a function)
// for tables built once at load (score parts, mechanic names).

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

/** The shipped locale nearest a BCP 47 tag (es-MX → es-419, en-AU → en-GB, pt-PT → pt-BR). */
export function matchLocale(tag) {
  const t = String(tag || '').replace('_', '-');
  const exact = LOCALES.find((l) => l.toLowerCase() === t.toLowerCase());
  if (exact) return exact;
  const [base, region = ''] = t.toLowerCase().split('-');
  if (base === 'en') return ['gb', 'au', 'nz', 'ie', 'za', 'in'].includes(region) ? 'en-GB' : 'en-US';
  if (base === 'es') return region === 'es' ? 'es-ES' : 'es-419';
  if (base === 'fr') return region === 'ca' ? 'fr-CA' : 'fr-FR';
  if (base === 'de') return 'de-DE';
  if (base === 'pt') return 'pt-BR';
  if (base === 'it') return 'it-IT';
  return 'en-US';
}

/** Switches the language (any tag; the nearest shipped locale); returns the locale. */
export function setLocale(tag) {
  lang = matchLocale(tag);
  return lang;
}
