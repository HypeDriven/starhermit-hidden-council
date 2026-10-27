// The save document and the game's options as the engine client keeps them
// (native/platform.ts): the browser build's cloud envelope ({v: 1, data, sum},
// the JS SDK's save.json, shown as the foreign save) is checked and merged;
// two devices' copies merge as the browser build merged them; the game's own
// options are checked by type. Run: node --test tests/save.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaultSave, mergeSaves, normalizeSave, saveChecksum, unwrapSave, wrapSave, checkSetting, SETTING_DEFAULTS, SoloSession } from '../src/session.js';
import { JOURNEY } from '../src/content.js';

test('the browser build\'s envelope unwraps when its checksum holds, else not', () => {
  const data = { ...defaultSave('Ada'), sessions: 7, wins: 3, journey: { 'journey-1': { score: 210, won: true } } };
  const text = JSON.stringify(wrapSave(data));
  assert.deepEqual(unwrapSave(JSON.parse(text)), normalizeSave(data));
  const bad = JSON.parse(text); bad.data.sessions = 99;
  assert.equal(unwrapSave(bad), null);
  assert.equal(unwrapSave({ v: 2, data, sum: saveChecksum(data) }), null);
  assert.equal(unwrapSave(null), null);
});

test('normalizeSave fills missing fields and drops wrong types', () => {
  const n = normalizeSave({ sessions: 'x', wins: 2, actionsUsed: 'move' });
  assert.equal(n.sessions, 0);
  assert.equal(n.wins, 2);
  assert.deepEqual(n.actionsUsed, []);
  assert.deepEqual(Object.keys(n).sort(), Object.keys(defaultSave()).sort());
});

test('two devices merge: best score per stage, larger counts, unions', () => {
  const a = { ...defaultSave('A'), sessions: 5, wins: 2, streak: 1, journey: { 'journey-1': { score: 100, won: true } }, achievements: { first_completion: 1 }, actionsUsed: ['move'] };
  const b = { ...defaultSave('B'), sessions: 3, wins: 3, bestStreak: 4, journey: { 'journey-1': { score: 150, won: true }, 'journey-2': { score: 80, won: false } }, achievements: { long_haul: 2 }, actionsUsed: ['task'], tutorialDone: { 'tut-move': true } };
  const m = mergeSaves(a, b);
  assert.equal(m.sessions, 5);
  assert.equal(m.wins, 3);
  assert.equal(m.bestStreak, 4);
  assert.equal(m.journey['journey-1'].score, 150);
  assert.ok(m.journey['journey-2']);
  assert.deepEqual(Object.keys(m.achievements).sort(), ['first_completion', 'long_haul']);
  assert.deepEqual(m.actionsUsed.sort(), ['move', 'task']);
  assert.equal(m.tutorialDone['tut-move'], true);
  assert.equal(m.profile.name, 'A');
});

test('a finished round records into the save (journey best, streak, achievements)', () => {
  const save = defaultSave('Ada');
  const s = new SoloSession(JOURNEY[1], {});
  s.skipToEnd();
  const fresh = s.recordCompletion(save);
  assert.equal(save.sessions, 1);
  assert.ok(fresh.includes('first_completion'));
  assert.ok(save.journey['journey-2']);
});

test('the game\'s options are checked by type; unknown keys are not options', () => {
  assert.deepEqual(Object.keys(SETTING_DEFAULTS).sort(), ['cvdPalette', 'hints', 'holdToConfirm', 'leftHanded', 'theme']);
  assert.equal(checkSetting('theme', 'verdigris'), 'verdigris');
  assert.equal(checkSetting('theme', 4), undefined);
  assert.equal(checkSetting('hints', false), false);
  assert.equal(checkSetting('hints', 'no'), undefined);
  assert.equal(checkSetting('music', 0.5), undefined);
});
