// Localization coverage: every English key the engine client (native/*.ts),
// the shared labels (src/labels.js), the sound captions and the content use is
// translated in every locale (en-GB → en-US, es-ES → es-419, fr-CA → fr-FR
// inherit) with its placeholders, no table keeps unused rows, and station-log
// lines from the rules render translated (tables: assets/strings.json).
// Run: node --test tests/i18n.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { codeKeys, audit, LOCALES } from './i18n-common.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), 'utf8');
const TABLES = JSON.parse(read('assets/strings.json'));
const { JOURNEY, THEMES, TUTORIALS } = await import('../src/content.js');
const { STATION_ROOMS, TASK_LABELS } = await import('../src/rules.js');
const { LOG_FIXED, logText } = await import('../src/labels.js');
const I18N = await import('../src/i18n.js');
/** The tables as native/i18n.ts binds them: a locale, then its parent. */
const PARENT = { 'en-GB': 'en-US', 'es-ES': 'es-419', 'fr-CA': 'fr-FR' };
let lang = 'en-US';
const lookup = (k) => { for (let l = lang; l; l = PARENT[l]) if (Object.hasOwn(TABLES[l], k)) return TABLES[l][k]; return null; };
I18N.bindStrings({
  has: (k) => lookup(k) != null,
  t: (k, vars) => lookup(k).replace(/\{(\w+)\}/g, (m, n) => (vars && n in vars ? vars[n] : m)),
});

function usedKeys() {
  const keys = new Set();
  for (const f of readdirSync(new URL('native/', ROOT)).filter((n) => n.endsWith('.ts'))) codeKeys(read('native/' + f)).forEach((k) => keys.add(k));
  codeKeys(read('src/labels.js')).forEach((k) => keys.add(k));
  // Sound captions (native/audio.ts CAPTIONS: translated where they are drawn).
  const caps = /export const CAPTIONS[^{]*\{([^}]*)\}/.exec(read('native/audio.ts'))[1];
  for (const m of caps.matchAll(/\w+: "([^"]+)"/g)) keys.add(m[1]);
  for (const s of JOURNEY) keys.add(s.name);
  for (const t of THEMES) keys.add(t.name);
  for (const t of TUTORIALS) { keys.add(t.title); for (const st of t.steps) keys.add(st.text); }
  for (const r of STATION_ROOMS) keys.add(r.name);
  for (const l of TASK_LABELS) keys.add(l);
  for (const l of LOG_FIXED) keys.add(l);
  return [...keys].filter((k) => /[A-Za-z]/.test(k)).sort();
}

test('every used key is translated in every locale; placeholders intact; no unused rows', () => {
  assert.deepEqual(audit(TABLES, usedKeys()), []);
});

test('switching is live; a deferred message renders in the language it is shown in', () => {
  lang = 'de-DE';
  assert.equal(I18N.T('Settings'), 'Einstellungen');
  const msg = I18N.L('Room {code}', { code: 'AB12' });
  lang = 'fr-CA';
  assert.equal(msg(), 'Salon AB12');
  lang = 'en-US';
});

test('station log shapes from the rules engine are recognised and translated', () => {
  const lines = [
    'Alder moved to Brass Foundry.', 'Blythe completed: Patch the bellows.', 'Something went quiet in the Windup Aviary.',
    'An incident was reported by Corin.', 'An emergency chime was rung by Dessa.', 'Emmet was ejected from the station. A saboteur is unmasked.',
    'Farra was ejected from the station. They were loyal crew.', 'Gosse voted.', 'Hilde waited.', 'No one was ejected.',
  ];
  for (const text of lines) assert.equal(logText({ text }), text);
  lang = 'de-DE';
  try {
    for (const text of lines) assert.notEqual(logText({ text }), text, text);
  } finally { lang = 'en-US'; }
});
