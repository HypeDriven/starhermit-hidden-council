'use strict';
// Player-facing names and lines built from rules and content data, in the
// current language (./i18n.js): rooms, players, tasks, stage titles, end
// reasons, score parts, mechanics, achievements, rejection reasons and the
// station log. Pure (no engine, no DOM): the engine client draws them and the
// node tests check them.

import { TUTORIALS } from './content.js';
import { T, L } from './i18n.js';

const ROOM_NAMES = {
  core: 'Pendulum Core', workshop: 'Gearwright Workshop', observatory: 'Starlens Observatory',
  foundry: 'Brass Foundry', gallery: 'Chronicle Gallery', aviary: 'Windup Aviary',
  cistern: 'Mainspring Cistern', greenhouse: 'Copper Greenhouse',
};

/** Localized room name (the English names are translation keys). */
export function roomName(id) {
  return ROOM_NAMES[id] ? T(ROOM_NAMES[id]) : id;
}

export function playerName(state, id) {
  const p = state.players.find((x) => x.id === id);
  return p ? p.name : id;
}

export function taskLabel(state, id) {
  const t = state.tasks.find((x) => x.id === id);
  return t ? T(t.label) : id;
}

export function reasonText(r) {
  switch (r) {
    case 'tasks_complete': return T('all tasks complete');
    case 'saboteurs_ejected': return T('saboteurs voted out');
    case 'parity': return T('the council was overrun');
    case 'time_limit': return T('the clock ran out');
    case 'move_limit': return T('too many moves spent');
    case 'abandoned': return T('the council emptied');
    default: return r || T('session ended');
  }
}

export const SCORE_PARTS = {
  tasks: L('Tasks'), votes: L('Votes'), eliminations: L('Eliminations'),
  survival: L('Survival'), time: L('Time'), winBonus: L('Win bonus'),
};
export function scorePartName(k) { return SCORE_PARTS[k] ? SCORE_PARTS[k]() : k; }

const MECHANICS = {
  move: L('move'), task: L('task'), report: L('report'), vote: L('vote'), call: L('call'), pressure: L('pressure'),
};
export function mechanicName(m) { return MECHANICS[m] ? MECHANICS[m]() : m; }

const ACHIEVEMENT_NAMES = {
  first_completion: L('First Winding'), mechanic_mastery: L('Full Council'), streak_three: L('Steady Hands'),
  hard_milestone: L('Grand Chime'), long_haul: L('Keeper of Hours'),
};
export function achievementName(key) { return ACHIEVEMENT_NAMES[key] ? ACHIEVEMENT_NAMES[key]() : key.replace(/_/g, ' '); }

const CHALLENGE_NAMES = { 'clock-tower': L('Beat the Clock'), 'short-fuse': L('Short Fuse'), 'sure-footed': L('Sure-Footed') };

/** Localized title of a stage (journey/daily/practice/challenge/tutorial/hosted). */
export function stageTitle(stage) {
  const id = stage.id || '';
  if (id.startsWith('daily-')) return T('Daily Chime {date}', { date: String(stage.name || '').slice(-10) });
  if (id.startsWith('practice-')) return T('Practice (Difficulty {d})', { d: stage.difficulty });
  if (id.startsWith('challenge-')) {
    const n = CHALLENGE_NAMES[id.slice('challenge-'.length)];
    return T('Challenge: {name}', { name: n ? n() : T('Challenge') });
  }
  if (id.startsWith('tut-')) {
    const tut = TUTORIALS.find((t) => t.id === id);
    return T('Tutorial: {title}', { title: tut ? T(tut.title) : '' });
  }
  if (id === 'hosted') return T('Hosted Council');
  return stage.name ? T(stage.name) : 'Hidden Council';
}

/** Player-facing text for a rules rejection reason (stable snake_case ids). */
export function rejectText(reason) {
  const map = {
    not_a_legal_target: L('not a legal target'), phase_locked: L('only votes count during a council'),
    no_meeting: L('no council is in session'), already_voted: L('you already voted'),
    bad_vote_target: L('that vote is not possible'), already_reported: L('that incident was already reported'),
    bad_body: L('there is nothing to report here'), bad_room: L('that room does not exist'),
    bad_target: L('that target is not possible'), bad_task: L('that task is not here'),
    cooldown: L('still on cooldown'), no_meetings_left: L('no emergency chimes left'),
    not_crew: L('only the crew can do that'), not_linked: L('that room is not connected'),
    not_saboteur: L('only a saboteur can do that'), task_done: L('that task is already done'),
    unknown_type: L('unknown action'), witnessed: L('someone would see it'), wrong_room: L('you are in the wrong room'),
    game_over: L('the session is over'), player_dead: L('you are out of the session'),
    not_active: L('the session is not running'), undo_not_allowed: L('undo is only available in practice'),
    nothing_to_undo: L('nothing to undo'), duplicate_command: L('that action was already sent'),
    not_seated: L('you have no seat at this council'), not_connected: L('not connected to the council'),
  };
  return map[reason] ? map[reason]() : String(reason || '').replace(/_/g, ' ');
}

/** The hint for the highest-priority legal action (report > task > vote > first). */
export function hintText(acts) {
  const pri = acts.find((a) => a.type === 'report') || acts.find((a) => a.type === 'task') || acts.find((a) => a.type === 'vote') || acts[0];
  if (!pri) return null;
  const text = {
    move: T('Try moving toward a room with unfinished work.'),
    task: T('A task is ready here — complete it.'),
    report: T('Report the incident to convene the council.'),
    vote: T('Weigh the log and cast your vote.'),
    eliminate: T('An opportunity…'),
    call: T('You can ring the emergency chime.'),
    wait: T('Waiting lets the station tick forward.'),
  }[pri.type];
  return T('Hint: {text}', { text });
}

// Station log lines come from the rules engine in English (they travel in the
// shared state); render the known shapes in the current language.
const ROOM_BY_NAME = Object.fromEntries(Object.entries(ROOM_NAMES).map(([id, n]) => [n, id]));
export const LOG_FIXED = [
  'The station clock ran out. The saboteurs prevail.', 'Too many wasted motions. The saboteurs prevail.',
  'Every task is complete. The crew restores the station.', 'All saboteurs have been voted out. The crew prevails.',
  'The saboteurs hold the council. The station falls silent.', 'No one was ejected.',
  'The session begins.',
];
const LOG_PATTERNS = [
  [/^(.+) moved to (.+)\.$/, (m) => T('{name} moved to {room}.', { name: m[1], room: ROOM_BY_NAME[m[2]] ? T(m[2]) : m[2] })],
  [/^(.+) completed: (.+)\.$/, (m) => T('{name} completed: {task}.', { name: m[1], task: T(m[2]) })],
  [/^Something went quiet in the (.+)\.$/, (m) => T('Something went quiet in the {room}.', { room: ROOM_BY_NAME[m[1]] ? T(m[1]) : m[1] })],
  [/^An incident was reported by (.+)\.$/, (m) => T('An incident was reported by {name}.', { name: m[1] })],
  [/^An emergency chime was rung by (.+)\.$/, (m) => T('An emergency chime was rung by {name}.', { name: m[1] })],
  [/^(.+) was ejected from the station\. A saboteur is unmasked\.$/, (m) => T('{name} was ejected from the station. A saboteur is unmasked.', { name: m[1] })],
  [/^(.+) was ejected from the station\. They were loyal crew\.$/, (m) => T('{name} was ejected from the station. They were loyal crew.', { name: m[1] })],
  [/^(.+) voted\.$/, (m) => T('{name} voted.', { name: m[1] })],
  [/^(.+) waited\.$/, (m) => T('{name} waited.', { name: m[1] })],
];
export function logText(e) {
  const text = String((e && e.text) || '');
  if (LOG_FIXED.includes(text)) return T(text);
  for (const [re, fn] of LOG_PATTERNS) { const m = re.exec(text); if (m) return fn(m); }
  return T(text);
}
