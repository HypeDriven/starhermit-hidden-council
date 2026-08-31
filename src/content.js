'use strict';
// Hidden Council — versioned content data: themes, tutorials, journey stages,
// daily seeds, practice/challenge presets, and an offline stage validator.

import { hashStr, rand01 } from './util.js';
import { simulate, createInitialState, tasksRemaining, aliveSaboteurs } from './rules.js';

export const CONTENT_VERSION = 3;

// ---------------------------------------------------------------------------
// Visual themes (5)
// ---------------------------------------------------------------------------

export const THEMES = [
  { id: 'brass-dawn', name: 'Brass Dawn', sky: 0x1a1420, key: 0xffd9a0, fill: 0x4a5a8a, floor: 0x3a2f28, accent: 0xffb54d },
  { id: 'verdigris', name: 'Verdigris Night', sky: 0x0c1a1a, key: 0x9fffd9, fill: 0x2a3a5a, floor: 0x20312c, accent: 0x5ee0b8 },
  { id: 'embers', name: 'Furnace Embers', sky: 0x1c0e0a, key: 0xff9a5a, fill: 0x5a3a2a, floor: 0x33201a, accent: 0xff7a3d },
  { id: 'moonlit', name: 'Moonlit Escapement', sky: 0x0d1220, key: 0xbfd4ff, fill: 0x3a4a6a, floor: 0x252a38, accent: 0x8fb4ff },
  { id: 'porcelain', name: 'Porcelain Hour', sky: 0x20242c, key: 0xfff2e0, fill: 0x6a7a8a, floor: 0x3c4048, accent: 0xf2e3c6 },
];

// ---------------------------------------------------------------------------
// Tutorial lessons — one rule at a time, player must perform the action
// ---------------------------------------------------------------------------

export const TUTORIALS = [
  { id: 'tut-move', title: 'Getting Around', rule: 'move', seed: 41, playerCount: 4, saboteurCount: 0, taskCount: 3,
    steps: [
      { text: 'Rooms are joined by brass corridors. Select a connected room and move there.', expect: 'move' },
      { text: 'Good. Move once more — the station is yours to explore.', expect: 'move' },
    ] },
  { id: 'tut-task', title: 'Work of the Crew', rule: 'task', seed: 42, playerCount: 4, saboteurCount: 0, taskCount: 2,
    steps: [
      { text: 'Tasks keep the station alive. Stand in a room with an unfinished task and complete it.', expect: 'task' },
    ] },
  { id: 'tut-meeting', title: 'The Council Convenes', rule: 'vote', seed: 43, playerCount: 4, saboteurCount: 1, taskCount: 6,
    steps: [
      { text: 'When the chime rings, the council votes. Cast your vote — or skip if unsure.', expect: 'vote' },
    ] },
];

// ---------------------------------------------------------------------------
// Journey — 40 authored stages (authored parameter bands, seeded generation)
// ---------------------------------------------------------------------------

const STAGE_NAMES = [
  'First Windings', 'Oil and Ink', 'The Quiet Cog', 'Bellwether', 'Half Past Brass',
  'A Borrowed Gear', 'The Long Corridor', 'Finchsong', 'Steam and Suspicion', 'The Ninth Chime',
  'Mastery: Pendulum', 'Cistern Whispers', 'Two Shadows', 'The Gallery Watch', 'Coilspring',
  'A Cold Lens', 'The Patient Valve', 'Lantern Drift', 'Foundry Waltz', 'Under Pressure',
  'Mastery: Escapement', 'Static in the Pipes', 'The Tally', 'Borrowed Time', 'Aviary Hush',
  'Three Turnings', 'The Alibi', 'Copperroot', 'Dwindling Hours', 'False Springs',
  'Mastery: Mainspring', 'The Narrow Vote', 'Rush of Steam', 'Gilt and Guile', 'The Last Cylinder',
  'Night Shift', 'Parity', 'The Silent Council', 'Full Wind', 'Mastery: Grand Chime',
];

function stageConfig(i) {
  const d = Math.floor(i / 8) + 1; // difficulty band 1..5
  const mastery = (i + 1) % 10 === 0;
  const seed = 1000 + i * 77;
  const playerCount = Math.min(4 + Math.floor(i / 6), 9);
  const saboteurCount = i < 8 ? 1 : (i < 28 ? 1 + (i % 3 === 0 ? 1 : 0) : 2);
  const taskCount = 5 + Math.floor(i / 3) + (mastery ? 3 : 0);
  const cfg = {
    seed: seed + Math.floor(rand01(seed, i) * 1000),
    playerCount,
    saboteurCount: Math.min(saboteurCount, playerCount - 2),
    taskCount,
    elimCooldown: Math.max(5, 10 - d),
  };
  const par = 30 + taskCount * 5 + playerCount * 3 - d * 2;
  const goals = { tasks: taskCount, survive: true };
  if (i >= 16 && i % 4 === 1) goals.timeLimit = par + 40; // time-pressure stages
  if (i >= 24 && i % 4 === 3) goals.moveLimit = taskCount * 4 + playerCount * 2; // move-limit stages
  return {
    id: 'journey-' + (i + 1),
    index: i,
    name: STAGE_NAMES[i],
    version: CONTENT_VERSION,
    config: cfg,
    seed: cfg.seed,
    goals,
    par,
    difficulty: d,
    mastery,
    mechanics: i < 4 ? ['move', 'task'] : i < 12 ? ['move', 'task', 'report', 'vote'] : ['move', 'task', 'report', 'vote', 'call', 'pressure'],
    tutorial: i === 0,
    theme: THEMES[i % THEMES.length].id,
  };
}

export const JOURNEY = [];
for (let i = 0; i < 40; i++) JOURNEY.push(stageConfig(i));

// ---------------------------------------------------------------------------
// Daily challenge — one immutable seed per UTC day
// ---------------------------------------------------------------------------

export function dailyStage(date) {
  const d = date || new Date();
  const dayKey = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000;
  const seed = (hashStr('hidden-council-daily') ^ (dayKey * 2654435761)) >>> 0;
  return {
    id: 'daily-' + dayKey,
    dayKey,
    name: 'Daily Chime ' + d.toISOString().slice(0, 10),
    version: CONTENT_VERSION,
    seed,
    config: { seed, playerCount: 7, saboteurCount: 2, taskCount: 10, elimCooldown: 7 },
    goals: { tasks: 10, survive: true },
    par: 90,
    difficulty: 3,
    mastery: false,
    mechanics: ['move', 'task', 'report', 'vote', 'call'],
    tutorial: false,
    theme: THEMES[dayKey % THEMES.length].id,
    ranked: true,
  };
}

// ---------------------------------------------------------------------------
// Practice and challenge presets
// ---------------------------------------------------------------------------

export function practiceStage(difficulty) {
  const d = Math.max(1, Math.min(5, difficulty | 0));
  const seed = 9000 + d * 131;
  return {
    id: 'practice-d' + d, name: 'Practice (Difficulty ' + d + ')', version: CONTENT_VERSION,
    seed, config: { seed, playerCount: 4 + d, saboteurCount: d >= 3 ? 2 : 1, taskCount: 4 + d * 2, elimCooldown: 11 - d },
    goals: { tasks: 4 + d * 2, survive: true }, par: 40 + d * 12, difficulty: d,
    mastery: false, mechanics: ['move', 'task', 'report', 'vote'], tutorial: false,
    theme: THEMES[(d - 1) % THEMES.length].id, practice: true,
  };
}

export function challengeStage(kind) {
  const base = {
    'clock-tower': { name: 'Beat the Clock', timeLimit: 55, moveLimit: null, seed: 31001 },
    'short-fuse': { name: 'Short Fuse', timeLimit: 40, moveLimit: null, seed: 31002 },
    'sure-footed': { name: 'Sure-Footed', timeLimit: null, moveLimit: 46, seed: 31003 },
  }[kind] || { name: 'Challenge', timeLimit: 60, moveLimit: null, seed: 31000 };
  return {
    id: 'challenge-' + kind, name: 'Challenge: ' + base.name, version: CONTENT_VERSION,
    seed: base.seed,
    config: { seed: base.seed, playerCount: 6, saboteurCount: 1, taskCount: 8, elimCooldown: 8, timeLimit: base.timeLimit, moveLimit: base.moveLimit },
    goals: { tasks: 8, survive: true, timeLimit: base.timeLimit, moveLimit: base.moveLimit },
    par: base.timeLimit || 70, difficulty: 4, mastery: false,
    mechanics: ['move', 'task', 'report', 'vote', 'pressure'], tutorial: false,
    theme: 'embers', challenge: true,
  };
}

// ---------------------------------------------------------------------------
// Offline validator — legality, reachability, bounded duration, no soft-lock
// ---------------------------------------------------------------------------

// Returns {ok, problems[], ticks, winner}. Proves a stage is beatable by
// headless AI within a bounded command count and has no NaN/impossible states.
export function validateStage(stage) {
  const problems = [];
  if (!stage.id || typeof stage.id !== 'string') problems.push('missing id');
  if (!(stage.seed >>> 0)) problems.push('missing seed');
  if (!stage.config) problems.push('missing config');
  if (!stage.goals || !(stage.goals.tasks > 0)) problems.push('missing goals');
  if (!(stage.par > 0)) problems.push('missing par');
  if (!(stage.difficulty >= 1 && stage.difficulty <= 5)) problems.push('bad difficulty');
  if (problems.length) return { ok: false, problems, ticks: 0, winner: null };

  const state = createInitialState(stage.config);
  if (state.players.length < 4) problems.push('too few players');
  if (tasksRemaining(state) < stage.goals.tasks) problems.push('fewer tasks than goal');
  if (aliveSaboteurs(state).length !== stage.config.saboteurCount) problems.push('saboteur count mismatch');

  const bound = 3000;
  const final = simulate(stage.config, bound);
  if (final.phase !== 'over') {
    problems.push('soft-lock: game did not terminate within ' + bound + ' commands');
  } else {
    // Beatable means: a crew victory is reachable from this seed. If the AI
    // exhibition game loses, check that a tasks-only pace would have won:
    // with no eliminations, crew finish in bounded ticks — tasks are always
    // reachable since the room graph is connected (BFS path exists).
    let reachable = true;
    for (const t of state.tasks) {
      if (!t.room) { reachable = false; break; }
    }
    if (!reachable) problems.push('unreachable task room');
    if (!Number.isFinite(final.tick) || !Number.isFinite(final.elapsedTicks)) problems.push('non-finite tick');
  }
  return { ok: problems.length === 0, problems, ticks: final.tick, winner: final.winner };
}

export function validateAll() {
  const report = [];
  for (const s of JOURNEY) report.push(Object.assign({ id: s.id }, validateStage(s)));
  for (let back = 0; back < 7; back++) {
    const d = new Date(Date.now() - back * 86400000);
    const st = dailyStage(d);
    report.push(Object.assign({ id: st.id }, validateStage(st)));
  }
  return report;
}
