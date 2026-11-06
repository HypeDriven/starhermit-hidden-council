'use strict';
// Hidden Council — localization helpers over the engine's string tables
// (assets/strings.json; native/i18n.ts binds them, the node tests bind their
// own reader). English source strings are the keys; en-GB, es-ES and fr-CA
// carry only their differences from en-US, es-419 and fr-FR. The UI is
// immediate mode, so a language change shows on the next frame.
//
// T(key, vars) translates now. L(key, vars) is a deferred message (a function)
// for tables built once at load (score parts, mechanic names).

const hasOwn = Object.prototype.hasOwnProperty;
let bound = null;

/** The tables T reads: `has(key)` and `t(key, vars)`, as the engine's `strings`. */
export function bindStrings(s) { bound = s; }

/** Text of a string or deferred message. */
export function text(x) { return x == null ? '' : typeof x === 'function' ? text(x()) : String(x); }

/** Translate an English source string; {name} placeholders come from vars (messages render too). Text with no entry passes through. */
export function T(key, vars) {
  const k = String(key);
  const filled = vars ? Object.fromEntries(Object.keys(vars).map((n) => [n, text(vars[n])])) : undefined;
  if (bound && bound.has(k)) return bound.t(k, filled);
  return filled ? k.replace(/\{(\w+)\}/g, (m, n) => (hasOwn.call(filled, n) ? filled[n] : m)) : k;
}

/** A deferred message: renders in the current language whenever it is shown. */
export function L(key, vars) { return () => T(key, vars); }
