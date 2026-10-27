// Localization coverage: every English key the engine client (native/*.ts),
// the shared labels (src/labels.js), the sound captions and the content use is
// translated in every locale (en-GB → en-US, es-ES → es-419, fr-CA → fr-FR
// inherit) with its placeholders, no table keeps unused rows, the account
// strings exist in all nine locales, the runtime's language tags map to the
// shipped locales, and station-log lines from the rules render translated.
// Run: node --test tests/i18n.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { codeKeys, audit, LOCALES } from './i18n-common.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), 'utf8');
const { TABLES } = await import('../src/strings.js');
const { JOURNEY, THEMES, TUTORIALS } = await import('../src/content.js');
const { STATION_ROOMS, TASK_LABELS } = await import('../src/rules.js');
const { LOG_FIXED, logText } = await import('../src/labels.js');
const I18N = await import('../src/i18n.js');
const { shStrings } = await import('../src/platform-i18n.js');

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

test('the account strings exist in all nine locales', () => {
  const keys = Object.keys(shStrings('en-US')).sort();
  for (const l of LOCALES) assert.deepEqual(Object.keys(shStrings(l)).sort(), keys, l);
});

test('the runtime\'s language tags map to the shipped locales; switching is live', () => {
  const cases = { 'de-DE': 'de-DE', de: 'de-DE', 'es-MX': 'es-419', 'es-ES': 'es-ES', 'en-AU': 'en-GB', en: 'en-US', 'fr-CA': 'fr-CA', 'fr-BE': 'fr-FR', 'pt-PT': 'pt-BR', it: 'it-IT', ja: 'en-US' };
  for (const [tag, want] of Object.entries(cases)) assert.equal(I18N.matchLocale(tag), want, tag);
  I18N.setLocale('de-DE');
  assert.equal(I18N.T('Settings'), 'Einstellungen');
  const msg = I18N.L('Room {code}', { code: 'AB12' });
  I18N.setLocale('fr-CA');
  assert.equal(msg(), 'Salon AB12');
  I18N.setLocale('en-US');
});

test('station log shapes from the rules engine are recognised and translated', () => {
  const lines = [
    'Alder moved to Brass Foundry.', 'Blythe completed: Patch the bellows.', 'Something went quiet in the Windup Aviary.',
    'An incident was reported by Corin.', 'An emergency chime was rung by Dessa.', 'Emmet was ejected from the station. A saboteur is unmasked.',
    'Farra was ejected from the station. They were loyal crew.', 'Gosse voted.', 'Hilde waited.', 'No one was ejected.',
  ];
  for (const text of lines) assert.equal(logText({ text }), text);
  I18N.setLocale('de-DE');
  try {
    for (const text of lines) assert.notEqual(logText({ text }), text, text);
  } finally { I18N.setLocale('en-US'); }
});
