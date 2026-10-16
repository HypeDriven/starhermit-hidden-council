// Localization coverage: every English key the code and content use is
// translated in every locale (en-GB → en-US, es-ES → es-419, fr-CA → fr-FR
// inherit), placeholders survive, station-log lines from the rules engine
// render translated, and the language follows sh-language.js and switches
// live. Run: node --test tests/i18n.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { codeKeys, audit } from './i18n-common.mjs';

const ROOT = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), 'utf8');
const { TABLES } = await import('../src/strings.js');
const { JOURNEY, THEMES, TUTORIALS } = await import('../src/content.js');
const { STATION_ROOMS, TASK_LABELS } = await import('../src/rules.js');
const { LOG_FIXED, logText } = await import('../src/ui.js');

function usedKeys() {
  const keys = new Set();
  for (const f of ['src/ui.js', 'src/main.js', 'src/net.js', 'src/platform.js']) codeKeys(read(f)).forEach((k) => keys.add(k));
  codeKeys(read('src/audio.js'), ['this.say']).forEach((k) => keys.add(k));
  for (const s of JOURNEY) keys.add(s.name);
  for (const t of THEMES) keys.add(t.name);
  for (const t of TUTORIALS) { keys.add(t.title); for (const st of t.steps) keys.add(st.text); }
  for (const r of STATION_ROOMS) keys.add(r.name);
  for (const l of TASK_LABELS) keys.add(l);
  for (const l of LOG_FIXED) keys.add(l);
  return [...keys].filter((k) => /[A-Za-z]/.test(k)).sort();
}

test('every used key is translated in every locale; placeholders intact', () => {
  assert.deepEqual(audit(TABLES, usedKeys()), []);
});

test('the locale follows sh-language and switches live; log lines render translated', async () => {
  // Fake browser globals before (re)loading the runtime in a fresh module instance.
  const events = [];
  globalThis.document = { documentElement: { lang: 'en' }, querySelectorAll: () => [], dispatchEvent: (e) => events.push(e.detail.lang) };
  globalThis.CustomEvent = class { constructor(t, o) { this.type = t; this.detail = o.detail; } };
  const sandbox = { navigator: { languages: ['de-DE'], language: 'de-DE' }, localStorage: { getItem: () => null, setItem() {} }, document: globalThis.document, location: { search: '' } };
  sandbox.window = sandbox; sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read('sh-language.js'), sandbox);
  globalThis.window = sandbox;
  try {
    const I18N = await import('../src/i18n.js?boot=' + Date.now());
    assert.equal(I18N.currentLang(), 'de-DE');
    assert.equal(globalThis.document.documentElement.lang, 'de-DE');
    assert.equal(I18N.T('Settings'), 'Einstellungen');
    const msg = I18N.L('Room {code}', { code: 'AB12' });
    I18N.language.setChoice('fr-CA');
    assert.equal(I18N.currentLang(), 'fr-CA');
    assert.equal(events.at(-1), 'fr-CA');
    assert.equal(msg(), 'Salon AB12');
    assert.equal(I18N.T('cloud save synced'), 'sauvegarde infonuagique : synchronisée');
  } finally {
    delete globalThis.window; delete globalThis.document; delete globalThis.CustomEvent;
  }
});

test('station log shapes from the rules engine are recognised (English round-trip)', () => {
  const lines = [
    { text: 'Alder moved to Brass Foundry.' }, { text: 'Blythe completed: Patch the bellows.' },
    { text: 'Something went quiet in the Windup Aviary.' }, { text: 'An incident was reported by Corin.' },
    { text: 'An emergency chime was rung by Dessa.' }, { text: 'Emmet was ejected from the station. A saboteur is unmasked.' },
    { text: 'Farra was ejected from the station. They were loyal crew.' }, { text: 'Gosse voted.' }, { text: 'Hilde waited.' },
    { text: 'No one was ejected.' },
  ];
  // English: unchanged round-trip.
  for (const l of lines) assert.equal(logText(l), l.text);
});
