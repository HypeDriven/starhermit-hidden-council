# Hidden Council — Running Game Design Document

Status: **running spec**. It describes the game as it ships today (present tense). Deliberate
design that is not yet in the code is confined to the final "Design intent not yet implemented"
list. Any change to observable behaviour updates this document in the same commit.

---

## 1. Overview

**Pitch.** A social-deduction council on a clockwork research station, played solo against
deterministic automata or hosted with other people: walk the brass corridors, finish the
station's tasks, and work out which of you is winding the machine backwards.

| | |
|---|---|
| Genre | Turn-based (tick-based) social deduction / hidden-role puzzle |
| Players | 1 human seat + 3–11 automata solo; up to 12 seats in hosted rooms |
| Session length | ~2–8 minutes (par is 30–100 ticks depending on stage) |
| Platforms | Desktop and mobile browsers, portrait and landscape |
| Rendering | Three.js (r185) procedural station scene over a complete semantic DOM UI; the DOM UI alone is fully playable |
| Build | `esbuild` IIFE bundle — `./build.sh` writes `bundle.js` + copies `src/styles.css` to `bundle.css` |

### File map

| Path | Responsibility |
|---|---|
| `index.html` | Entry point: `#app`, `bundle.css`, deferred `bundle.js`, `favicon.svg`, viewport-fit=cover. |
| `src/rules.js` | Pure deterministic rules engine — state, legal actions, resolution, AI, scoring, replay. No DOM, no THREE. |
| `src/content.js` | Versioned content (`CONTENT_VERSION = 3`): 5 themes, 3 tutorials, 40 journey stages, daily/practice/challenge builders, offline stage validator. |
| `src/session.js` | Session driver: solo loop, AI scheduling, undo stack, save/settings persistence, achievements, server-time sync, replay export. |
| `src/ui.js` | Semantic DOM shell: HUD rails, screens, settings, live regions, results table. Issues commands only through the session. |
| `src/render.js` | Three.js station: procedural rooms, pawns, gears, camera framing, quality tiers, picking, context-loss recovery. |
| `src/audio.js` | WebAudio engine: 4 buses, authored Opus one-shots with synth fallback, ambience bed, generative music stem, captions. |
| `src/main.js` | App state machine, input binding, hosted WebSocket client, settings application. |
| `src/util.js` | Seeded RNG (mulberry32), FNV-1a string hash, formatting helpers. |
| `server.js` | Zero-dependency authoritative server: static files, `/api/v1/*`, hand-rolled RFC 6455 WebSocket rooms. |
| `tests/run.js` | 35 unit/integration tests (`npm test`), including real server + raw WebSocket handshakes. |
| `tests/e2e.mjs` | Playwright-core playthrough of the real UI at 1280×800 and 390×844. |
| `tests/hosted-browser.mjs` | Two-browser hosted-lobby smoke driver. |
| `sfx/` | 16 authored Opus one-shots + `manifest.txt` (canonical), `manifest.json` (regeneration), `manifest.md`. |
| `assets/` | `title-keyart.webp`, `council-chamber.webp`. |
| `coverart.png`, `icon.png`, `favicon.svg` | Platform art referenced by `starhermit.txt` and `index.html`. |
| `scores.json` | Server-side leaderboard persistence (override with `HC_SCORES_FILE`). |

---

## 2. Vision and design pillars

1. **Deduction from a public record, not from chat.** Everything a player can reason from is
   printed in the station log: who moved where, that *something went quiet* in a named room, who
   reported, who voted. *Rules in:* an anonymised public event log, a suspicion counter that only
   counts who was physically present at a reported incident. *Rules out:* free-text chat, private
   whispers, and any log line that names the saboteur (`applyCommand`'s `eliminate` case logs the
   room, never the actor).
2. **A machine you can audit.** Every session is a seed plus a command list; the same seed and
   commands always produce the same state hash. *Rules in:* seeded role assignment, deterministic
   AI, exported replays, a hash shown on the results screen. *Rules out:* wall-clock randomness in
   rules, hidden difficulty rubber-banding, server-side re-rolls of a published daily seed.
3. **Ticks, not timers.** The station advances one tick per command — including rejected ones —
   so pressure is a budget you spend, never a reflex test. *Rules in:* tick/move limits as stage
   goals, an undo stack in unranked modes. *Rules out:* real-time chases, twitch inputs,
   any action that must be performed within a real-time window.
4. **Two truthful readings of the same board.** The 3D station and the DOM rails always describe
   the identical legal-action set; the canvas is a view, never the only control. *Rules in:*
   every canvas tap has a labelled button twin; WebGL failure downgrades to a stated
   "2D controls" mode. *Rules out:* information that exists only in the render (hover-only
   tooltips, colour-only role coding).
5. **You may be the saboteur.** The human seat is dealt by the same seeded shuffle as everyone
   else, and victory is judged against *your* allegiance. *Rules in:* eliminate actions and a
   witness rule in the player's own action list, scoring that rewards eliminations. *Rules out:*
   a "you are always crew" assumption anywhere in scoring, results copy, or achievements.

---

## 3. Player experience

**Target player.** Someone who enjoys Werewolf/Among-Us-style deduction but wants to play it
alone, at their own pace, on a phone, without a voice channel or a lobby of strangers.

**First 60 seconds.** The title screen states the fantasy in one line ("A clockwork station. A
hidden hand. A council of gears."), and the primary button is `▶ Play`. Mode select puts
**Tutorial** first and describes each mode in one sentence. The three tutorials teach exactly one
rule each and will not advance until the player performs it: *Getting Around* (two moves, no
saboteurs), *Work of the Crew* (one task), *The Council Convenes* (one vote, one saboteur). Every
step text is spoken into the live region and repeated on each state change until satisfied. A
player who skips the tutorial still gets: a stage setup sheet (rules, expected length, player
count, par, difficulty, ranked flag), a 3-2-1 countdown, an action rail whose buttons are the
literal legal actions ("Go: Brass Foundry", "Do: Wind the mainspring"), the `💡 Hint` button, and
a Help screen with five cards covering movement, tasks, incidents, voting and keys.

**Typical session.** Move toward the nearest room with unfinished work, complete tasks, notice
that the log has gone quiet in a room you can name, walk in, find a body, report — the bell
rings, the rails become a vote list, and the log tells you who was standing where. Vote or skip;
the council resolves; play resumes. Repeat until every task is done, every saboteur is ejected,
or the saboteurs reach parity.

**The emotional beat.** The pause between reading "Something went quiet in the Copper Greenhouse"
and deciding whether the two names that moved through it are worth a vote — a decision made from
a public record you could have read more carefully.

---

## 4. Core loop and rules contract

Everything in this section is implemented in `src/rules.js` unless another file is named.

### Board and entities

* **Rooms** — 8 fixed rooms (`STATION_ROOMS`), an undirected connected graph:
  Pendulum Core ↔ {Gearwright Workshop, Starlens Observatory}; Workshop ↔ {Foundry, Chronicle
  Gallery}; Observatory ↔ Windup Aviary; Foundry ↔ Mainspring Cistern; Gallery ↔ Copper
  Greenhouse; Aviary ↔ Greenhouse; Cistern ↔ Greenhouse. `shortestPath` is a BFS with ties broken
  by declaration order, so pathing is deterministic.
* **Players** — `{id, name, role: 'crew'|'saboteur', ai, alive, room}`. Seat `p0` is the human.
  Roles come from a seeded Fisher–Yates shuffle (`rand01(seed, 1000 + i)`); starting rooms are
  `STATION_ROOMS[i % 8]`.
* **Tasks** — `{id, room, label, done, doneBy}`, room and label drawn from `rand01(seed, 2000+i)`
  / `rand01(seed, 3000+i)` over 12 flavour labels.
* **Bodies** — pushed on elimination and on ejection; `{id, player, room, reported}`.
* **Budgets** — `meetingsLeft[playerId]` (emergency chimes), `cooldowns[saboteurId]`
  (`elimCooldown`, 5–11 ticks by stage), optional `goals.timeLimit` / `goals.moveLimit`.

### Legal actions (`legalActions`)

| Phase | Action | Precondition |
|---|---|---|
| play | `move{room}` | Room is linked to the actor's room. |
| play | `task{task}` | Actor is crew, task undone and in the actor's room. |
| play | `eliminate{target}` | Actor is a saboteur, cooldown expired, target is living crew in the same room, **and that target is the only living crew present** (`witnesses.length === 1`). |
| play | `report{body}` | An unreported body lies in the actor's room (first only). |
| play | `call` | `meetingsLeft[actor] > 0`. |
| play | `wait` | Always. |
| meeting | `vote{choice}` | Actor has not voted; choice is a living player id or `skip`. |
| over | — | Empty list. |

### Resolution order (`applyCommand`)

1. Shape validation (object, `id` 1–64 chars, `type`/`player` strings) → `malformed_command`,
   `bad_command_id`, `missing_type`, `missing_player`. These reject **without** consuming a tick.
2. Duplicate `id` in `state.seen` → `duplicate_command` (idempotency for the hosted transport).
3. Unknown player / `phase === 'over'` / dead actor → rejected, no tick.
4. **Tick charge**: `tick += 1`, `id` recorded, and in the play phase `elapsedTicks += 1`. Every
   accepted-shape command costs a tick whether or not it is legal.
5. Phase dispatch. Illegal commands increment `invalidTotal` and `invalidBy[player]` and return
   the *ticked* state, so wasted motions are real and are a tie-break input.
6. `checkTerminal` runs after every command.

Meetings: the last living voter triggers `resolveMeeting`. A candidate is ejected only with a
**strict majority of votes cast, no tie, and not `skip`** (`bestN > total/2`); otherwise "No one
was ejected." Ties are enumerated over `Object.keys(tally).sort()` so the tie flag is
seed-independent. Ejection pushes a pre-reported body and, when the ejected player was a
saboteur, credits `stats.correctVotes` to every crew member who voted for them.

### Terminal states (`checkTerminal`, in order)

1. `elapsedTicks > goals.timeLimit` → saboteurs, `time_limit`.
2. Total moves > `goals.moveLimit` → saboteurs, `move_limit`.
3. `tasksRemaining() === 0` → crew, `tasks_complete`.
4. Saboteurs existed at setup and none are alive → crew, `saboteurs_ejected`.
5. `aliveSaboteurs >= aliveCrew` → saboteurs, `parity`.

A tutorial configured with `saboteurCount: 0` is therefore won by finishing tasks, not
immediately at tick 0 — that is the reason for the "had saboteurs" guard.

### Scoring (`scoreBreakdown`) and a worked example

```
tasks        = tasksBy[me]        × 10
votes        = correctVotes[me]   × 25
eliminations = eliminations[me]   × 30
survival     = 50 if alive at a decided end, else 0
time         = max(0, par×2 − elapsedTicks)
winBonus     = 100 if state.winner matches my allegiance
total        = sum of the six parts (integer)
```

*Worked example* — Daily Chime (par 90), human plays crew, finishes 3 tasks, casts 1 vote that
ejects a saboteur, survives, crew win at `elapsedTicks = 64`:
`30 + 25 + 0 + 50 + (180 − 64 = 116) + 100 = **321**`. The results table prints all six rows plus
the total; nothing is rolled into an unexplained number.

**Victory is per-seat.** `playerWon(state, id)` compares `state.winner` against that seat's role,
so a saboteur seat that reaches parity sees "The Station Turns Again".

**Tie-breaks** (`compareResults`): objective completion → fewer invalid actions → lower
`elapsedTicks` → lexicographic `sessionId`.

**RNG and seeding.** All randomness is `rand01(seed, index)` (mulberry32 over a
seed/index mix) in `src/util.js`. Nothing in the rules reads `Math.random` or the clock.
`stateHash` = FNV-1a over a key-sorted stable stringify; `replay(config, commands)` re-derives
the whole hash chain and reports the first divergence.

**Undo and hints.** `SoloSession.undo()` pops a 40-deep snapshot stack and is refused with
`undo_not_allowed` outside practice/tutorial stages. `App.hint()` reads the same
`legalActions` list the UI is drawn from and names the highest-priority action
(report > task > vote > first legal); it never reveals roles.

### Deterministic AI (`aiCommand`)

Automata are pure functions of `(state, playerId)` seeded by `state.seed ^ hash(playerId)` and the
current tick. Crew report any body in the room, complete a task if one is present, else BFS toward
the nearest unfinished task. Saboteurs report bodies too (cover), eliminate when legal with
probability ~0.45, else BFS toward the nearest living crew with a 20% wander. In council,
saboteurs vote for a random living crew member; crew vote for the highest public-suspicion
candidate 75% of the time and otherwise skip. `simulate(config, limit)` runs a whole headless
game and is what the content validator uses.

---

## 5. Modes and progression

| Mode | Source | Shape | Ranked | Assists |
|---|---|---|---|---|
| Tutorial | `TUTORIALS` | 3 lessons, 4 players, 2–6 tasks, one rule each, step gated on the player performing it | No | Undo + hints |
| Journey | `JOURNEY` (40 stages) | 4→9 players, 5→18 tasks, 1–2 saboteurs, `elimCooldown` 9→5, difficulty bands 1–5, a mastery stage every 10th | No | Optional |
| Daily Chime | `dailyStage(date)` | 7 players, 2 saboteurs, 10 tasks, one immutable seed per UTC day, par 90 | **Yes** | Optional |
| Practice | `practiceStage(d)` | Difficulty 1–5, 5–9 players, 6–14 tasks, undo enabled, score never submitted | No | Undo + hints |
| Challenge | `challengeStage(kind)` | *Beat the Clock* 55 ticks · *Short Fuse* 40 ticks · *Sure-Footed* 46 moves, all 6 players / 8 tasks | Optional | Optional |
| Hosted Play | `server.js` rooms | 6-character room code, quick-join, addable automata, ready/start, authoritative state | No | Optional |

**Difficulty curve.** Journey stage *i* raises player count every 6 stages, tasks every 3, adds a
second saboteur on stages where `i % 3 === 0` from stage 10 (and always from stage 29), shortens the elimination cooldown by band,
and layers goal limits: a tick limit on stages ≥17 where `i % 4 === 1`, a move limit on stages ≥25
where `i % 4 === 3`. Mechanics unlock in three tiers — `move, task` → `+report, vote` (stage 5) →
`+call, pressure` (stage 13). Every stage's limits are written into *both* `goals` and `config`, so
the rules engine actually enforces what the setup sheet promises.

**Daily content.** `seed = hash('hidden-council-daily') ^ (utcDayKey × 2654435761)`, so the day is
identical for every player and every client, and the theme rotates with the day key. Daily seeds
are immutable once published.

**Persistence and unlocks.** `save` (localStorage `hidden-council-save`, versioned + checksummed)
holds profile name, per-journey best score/won, sessions, wins, streak, best streak, the set of
action types ever used, achievements and tutorial completion. Five achievements:
*First Winding*, *Full Council* (5 distinct action types), *Steady Hands* (3-win streak),
*Grand Chime* (win a difficulty-5 stage), *Keeper of Hours* (25 sessions). Unlocks are idempotent
(`unlockAchievements`) and `mergeSaves` unions two snapshots without losing progress.

---

## 6. Controls and interaction

| Input | Desktop | Mobile | Result |
|---|---|---|---|
| Primary action | Click an action-rail button | Tap the same button | Issues the command; `ack` cue + rail refresh |
| Room select | Click a room in the 3D deck | Tap the room | `move` if legal, else `reject` cue and "not a legal target" caption |
| Pawn select | Click a pawn | Tap the pawn | `vote` during a council, `eliminate` when legal, else reject |
| Browse targets | ←/→/↑/↓ cycles legal move targets, camera follows | — | Caption "Target: <room>"; `ack` cue |
| Commit move | `Enter` (or `Shift+↓`) | — | Moves to the focused target |
| Wait | `Space` | "Wait" button | Passes a tick |
| Undo | `U` | "↩ Undo (U)" button (practice only) | Pops the snapshot; `undo` cue |
| Hint | `H` | "💡 Hint (H)" button | Caption + live-region hint; `hint` cue |
| Camera reset | `C` | Drag to orbit; drag > 12 px never commits | Re-frames the focused room |
| Pause | `Esc` | "⏸ Pause" button | Pause screen; `Esc` again resumes |

Input locking: commands are accepted only while `phase === 'active'` (`humanAct` returns early
otherwise), so the countdown, pause, results and screen overlays are all safe. Pointer gestures
distinguish tap from drag by 12 px / 500 ms; a drag is a camera gesture and commits nothing.
Backgrounding the tab pauses a solo session and mutes the master bus. Every input produces at
least one of: a rail change, a caption, a live-region announcement, or an audio cue — usually all
four.

---

## 7. Screens and UI flow

`boot → title → mode-select → (tutorial | setup) → preparing → countdown → active ↔ paused →
resolving → results → progression`, driven by `App.phase` in `src/main.js`.

Screens are modal `role="dialog"` sections in `.hc-screens`, one at a time, focus moved to the
first focusable child on open and restored to the remembered element on close: **Title**
(play, daily, journey, hosted, help, name field, settings), **Mode select**, **Setup sheet**,
**Tutorial list**, **Journey grid** (40 cells with per-stage score/won marks), **Practice**,
**Challenge**, **Hosted lobby**, **Settings**, **Pause**, **Help**, **Results**, and the
**Compatibility notice** shown when WebGL is unavailable.

Layout: the canvas fills the viewport; the HUD is an overlay with `pointer-events: none` and
interactive children re-enabled. Desktop ≥1024 px shows both rails open (left 240 px objective +
progress + last 7 log lines, right 260 px actor + action buttons). Between 700 and 1023 px the
rails collapse to 42 px tabs that slide open on hover/focus-within. Portrait ≤700 px moves the
left rail to a 24 vh status panel below the top bar and the right rail to a bottom tray
(max 38 vh) whose action buttons flow two-up in the thumb zone. Landscape ≤500 px tall narrows
the rails to 180 px and shrinks screen padding. `env(safe-area-inset-*)` offsets every edge-
anchored element, and `hc-left-handed` mirrors the two rails.

Never cut off: the pause button, the caption line, the action list (its rail scrolls), the score
breakdown table (the screen scrolls to `max-height: 88vh`) and the primary button on any screen.

---

## 8. Art direction

**Palette.** UI (`src/styles.css`): background `#0d0f16`, panels `#171a26` / `#1e2233`, borders
`#2c3048` / `#3a4060`, text `#e8e4da`, muted `#9a96a8`, accent brass `#ffb54d`, danger `#ff6b6b`,
focus cyan `#6bd5ff`. High-contrast mode swaps to pure black panels, `#fff` text, `#ffd900`
accent, `#00e5ff` focus. Scene themes (`THEMES` in `content.js`) each define sky/key/fill/floor/
accent: *Brass Dawn* (`#1a1420`/`#ffd9a0`/`#4a5a8a`/`#3a2f28`/`#ffb54d`), *Verdigris Night*
(`#0c1a1a`…`#5ee0b8`), *Furnace Embers* (`#1c0e0a`…`#ff7a3d`), *Moonlit Escapement*
(`#0d1220`…`#8fb4ff`), *Porcelain Hour* (`#20242c`…`#f2e3c6`). Pawns use a 12-colour set with an
Okabe-Ito colour-vision-safe alternative behind the "Color-vision-safe palette" toggle; role is
never encoded by colour alone.

**Shape language.** Rounded brass cylinders and discs: circular room platforms with raised rims,
capsule pawns with a keyhole crown, toothed gear rings and pipe runs between rooms. The station
reads top-down-ish from a fixed 42° FOV camera at distance 14 / height 12, framed on the focused
room. Nothing in the scene is text.

**Typography.** System UI stack (`system-ui, -apple-system, "Segoe UI", Roboto`), 1.8 rem brass
screen titles with 0.04 em tracking, 1 rem body, 0.82 rem log lines, tabular numerals in the score
table. "Larger text" scales the whole root to 120%.

**Hero of the screen.** In play, the lit focused room and its pawns. On the title screen, the
key-art backdrop behind the panel. On results, the empty council chamber illustration above the
score table.

**Motion.** Camera moves are smoothstepped glides to the focused room; gears turn slowly;
selection is a pulsing ring on its own render layer. Reduced motion shortens the countdown to
250 ms steps, drops the AI think delay from 450 ms to 200 ms, removes button transitions, and
suppresses idle animation in the renderer. Quality tiers gate cost: `low` (no shadows, no
particles, 0.75 render scale, 4 gears), `medium` (shadows, 200 particles, 8 gears),
`high` (2× pixel ratio, 800 particles, 14 gears).

**Visual assets the design calls for**: a title/menu key-art backdrop of the station interior; a
results illustration of the council chamber after a verdict; platform cover art and icons. Both
in-game images are darkened behind their panel content so text contrast never depends on the
artwork, and both are decorative (`alt=""`, removed on load error).

---

## 9. Audio direction

**Mix philosophy.** The station is quiet: a low filtered noise bed at 320 Hz stands in for steam
and distant machinery, a sparse pentatonic pad marks time, and everything a player *did* is a
short dry transient with no reverb tail. Nothing masks the log.

**Buses** (`AudioEngine`): `music` (0.6), `effects` (0.8), `ambience` (0.5), `voice` (0.7), each a
gain node into a master gain that ducks to zero when the tab is hidden. Sliders in Settings write
straight to the bus with a 50 ms time constant.

**Music and ambience** are synthesised, not streamed: a looping seeded noise buffer through a
low-pass for ambience, and a 1.4 s pentatonic pad step for music. Authored one-shots are fetched
lazily on first use, decoded once, and cached; while a clip is loading — or if it 404s or fails to
decode — the matching synth voice plays instead, so the cue is never silent.

**SFX event table** (source of truth for `sfx/manifest.txt`; event ids are the `kind` argument to
`AudioEngine.event()`):

| event | file | description | usage context |
|---|---|---|---|
| `ack` | `ui-ack.opus` | Muted plastic tap with a high tick | Every accepted command, arrow-key target cycling, tutorial step satisfied |
| `reject` | `ui-reject.opus` | Dull wooden knock into a short buzz | Illegal/rejected command; captions "Not allowed" |
| `move` | `footstep.opus`, `footstep-alt.opus` | Soft stone footsteps, two takes | Any move between rooms; variant chosen from the event seed |
| `task` | `task-complete.opus` | Metal latch shutting, warm wooden tick | A crew task completes; captions "Task complete" |
| `meeting` | `council-bell.opus` | Brass hand bell rung twice | Council convened by report or emergency chime |
| `vote` | `vote-token.opus` | Clay token into a wooden bowl | Each vote cast |
| `eject` | `eject-whoosh.opus` | Sliding door whoosh into fading air | A council ejects someone |
| `eliminate` | `eliminate-thud.opus` | Muffled body thud and low rumble | A saboteur eliminates crew; captions "An incident occurred" |
| `tick` | `clock-tick.opus` | Escapement snap | 3-2-1 pre-session countdown |
| `start` | `session-start.opus` | Winding ratchet into a brass chime and gears engaging | The countdown reaches zero and play begins |
| `win` | `victory-fanfare.opus` | Rising brass fanfare | Results, the seat's faction won |
| `lose` | `defeat-drone.opus` | Descending cello/horn drone | Results, the seat's faction lost |
| `achievement` | `achievement-chime.opus` | Two rising glockenspiel notes with a sparkle tail | 700 ms after the results stinger when something unlocked |
| `undo` | `undo-rewind.opus` | Spring unwinding backwards with soft ticks | Successful undo in practice/tutorial |
| `hint` | `hint-whisper.opus` | Steam breath through a brass pipe | The Hint action |

Meaningful cues also print a caption (`say()` → `UI.caption`) so the audio layer is never the only
carrier of information.

---

## 10. Localization

The product requires en-US, en-GB, es-419, es-ES, de-DE, fr-FR, fr-CA, pt-BR and it-IT. **Today the
game ships one locale: en-US.** Every user-facing string is a literal in `src/ui.js`,
`src/main.js` (captions, hints, tutorial steps) and `src/content.js` (stage, theme, task and
character names); `index.html` declares `lang="en"`. There is no locale file, no string table and
no language selector, and nothing in the code reads `navigator.language`. The intended design —
a `src/strings.js` keyed table, locale chosen from the platform profile then `navigator.languages`
with an `en-US` fallback, and layout allowances of +35% string length for de-DE and +25% for
the romance locales (the rails already wrap and scroll, the action buttons already flow) — is
listed as unimplemented intent in §16. All formatting already goes through helpers in
`src/util.js`, which is where locale-aware number/time formatting will attach.

---

## 11. Accessibility

* **Keyboard-only path**: every screen is reachable and completable with Tab/Enter; screens move
  focus to their first control and restore it on close. In play, arrows browse legal move targets,
  Enter commits, Space waits, U undoes, H hints, C re-frames, Esc pauses. No action requires the
  canvas.
* **Screen readers**: `.sr-only` `aria-live="polite"` `role="status"` region announces session
  start, tutorial steps, hints, rejections, meetings, ejections, incidents and the end of the
  session; the results screen is `aria-live="assertive"`. The canvas carries an `aria-label`, the
  rails are labelled `aside`s, the actor line is its own live region, and buttons expose
  `aria-keyshortcuts`.
* **Captions**: every audio cue that carries meaning also writes a 2.5 s caption in the top bar.
* **Contrast and colour**: default text `#e8e4da` on `#171a26` (≈12:1); the high-contrast toggle
  raises everything to black/white/`#ffd900` and drops the title backdrop image. Role and legality
  are conveyed by text and position, never colour alone; the CVD toggle switches the pawn set to
  Okabe-Ito.
* **Motion**: "Reduced motion" shortens the countdown, drops transitions and calms the scene.
* **Targets**: all buttons and checkboxes are ≥44×44 px with visible 3 px focus rings; the mobile
  action tray sits in the thumb zone above the safe-area inset.
* **Other**: larger-text and left-handed toggles, four independent volume sliders, and an
  explicit "Hold to confirm" preference.

---

## 12. StarHermit integration

`starhermit.txt` declares `name`, `launch=index.html`, `owner`, `server=server.js`,
`version=1.1.0`, `cover=coverart.png` per the conventions at https://wiki.starhermit.com/.

**Used**
* *Server script* — `server.js` is the platform-launched game server: static hosting plus the
  game's own REST and WebSocket surface.
* *Platform time* — `GET /api/v1/time` is sampled at boot (`syncServerTime`) and the round-trip
  midpoint offset decides which UTC day the Daily Chime belongs to, so a skewed client clock
  cannot shift the daily seed.
* *Leaderboards* — `POST /api/v1/scores` (validated: name ≤24 chars, integer score ≤5000, integer
  seed, matching `RULES_VERSION`, sane `contentVersion`, duration 1 s–6 h) and
  `GET /api/v1/leaderboard?scope=global|daily`, persisted to `scores.json`. Practice stages never
  submit; ranked submissions carry the `daily` flag and an `assists` flag.
* *Achievements* — `POST /api/v1/achievements` records the five keys idempotently per profile
  alongside the local save.
* *Sessions / multiplayer* — hosted rooms over `/ws` (hand-rolled RFC 6455): create, join by code,
  quick-join, add automaton, ready, start, command, plus `snapshot` reconnect with an
  "while you were away" summary. The server owns the authoritative state and rejects commands
  whose `player` does not match the requesting seat (`identity_mismatch`).
* *Identity* — a local display name (≤24 chars) is attached to scores and lobby seats.

**Not used**: platform presence/friends feeds, chat or moderation services, entitlements,
purchases, cloud saves (progress is local plus server-side leaderboard rows), and party
invitations outside the room-code flow.

---

## 13. Technical architecture

**Layering.** `rules.js` (pure) ← `content.js` (data + validator) ← `session.js` (driver,
persistence) ← `main.js` (app) → `ui.js` / `render.js` / `audio.js` (presentation). Presentation
never mutates state; it calls `session.act()` and re-renders from the state it is handed.
`server.js` dynamically imports the *same* `src/rules.js`, so hosted and solo play cannot diverge.

**Determinism and replay.** State is JSON-serializable; `applyCommand` deep-copies before mutating
and never throws (a caught internal error returns `internal_error`). `serialize`/`deserialize`
carry `RULES_VERSION = 1` with a v0→v1 migration path. `exportReplay()` emits
`{schema, rulesVersion, contentVersion, seed, config, initialHash, commands, finalHash}` and
`replay()` verifies the whole hash chain. The results screen surfaces the final hash for copying.

**Persistence.** `hidden-council-save` (v1 envelope with an FNV-1a checksum; a bad checksum falls
back to a fresh save rather than crashing) and `hidden-council-settings`. Both writes are
try/caught for private-mode/quota failures.

**Resilience.** WebGL absence is detected before the renderer is built and routes to a
Compatibility screen that keeps the DOM game fully playable; `webglcontextlost` is prevented and
`webglcontextrestored` rebuilds the scene; renderer construction failure sets `failed` and the app
continues without a canvas. Fetches to `/api/v1/*` degrade to offline behaviour. Missing SFX fall
back to synthesis; missing images are removed from the DOM.

**Performance budgets.** One `requestAnimationFrame` loop, paused when the document is hidden.
Tier caps: pixel ratio 1/1.5/2, render scale 0.75/1/1, particles 0/200/800, gears 4/8/14, shadows
off on `low`. Geometry and materials are disposed on teardown. The bundle is ~579 KB minified
(Three.js dominates); `bundle.css` is 8 KB; the 16 Opus clips total ~350 KB and load lazily; the
two WebP images total ~102 KB.

**How the e2e drives the real UI.** `tests/e2e.mjs` starts a minimal static server with
`/api/v1/time` and score stubs, launches headless Chrome via `playwright-core`, and clicks only
visible buttons: title → mode select → each menu screen → Daily Chime → countdown → up to ~120
HUD actions chosen from the actually-rendered "Go:", "Do:", "⚠ Report", "Vote:" and "Wait"
buttons (using a BFS mirror of the room graph purely to pick which visible move button to press)
→ pause/settings/resume → results (asserting ≥6 score rows and a headline) → localStorage
progression check → retry → Esc → leave. It runs the whole flow twice, at 1280×800 and at
390×844 with touch, and fails on any console error or page error.

---

## 14. Testing and acceptance criteria

`npm test` (`tests/run.js`, 35 tests, zero dependencies) covers: initial-state shape and
serializability; legal-action sets per role and phase; move legality (`not_linked`, `bad_room`);
task rules (`wrong_room`, `task_done`, `not_crew`); the elimination witness rule and cooldown;
report/meeting flow; vote tallying, majority, ties and skip; every terminal condition and its
reason; the parity and no-saboteur guards; scoring parts and `compareResults` ordering;
serialization round-trip and v0→v1 migration; replay hash equality for identical seed+commands;
a bounded full simulation; a malformed-command fuzz pass that must never throw or produce NaN;
"AI commands are always legal"; content shape for all 40 journey stages; that stage goal limits
reach the rules config; theme/tutorial/daily determinism; the validator passing every journey
stage and seven days of dailies and rejecting defective stages; and live `server.js` checks —
`/api/v1/time`, static `index.html`, structured 404s, score submit/leaderboard, rejection of
impossible/stale scores, idempotent achievements, a raw WebSocket lobby create/join/ready/start,
and that a second human seat maps to its own player id.

`npm run test:e2e` must finish both viewport passes with zero console errors.

QA bar (`agents/qa.md`) as checkable statements:

- [x] A first-time player is taught: tutorials gate on performing each rule; Help and the setup
      sheet are one click from the title; hints are always available.
- [x] Every implemented feature is reachable in the browser: all six modes, settings, hosted
      lobby, undo, hints, replay-hash copy, achievements.
- [x] No console errors or warnings in either e2e viewport pass.
- [x] Text and controls are visible and uncut at 1280×800 and 390×844; rails scroll rather than
      clip; safe-area insets applied.
- [x] Automation reaches results by clicking only what a player sees.
- [x] Platform features that fit are used: server script, platform time, leaderboards,
      achievements, hosted sessions.
- [ ] Localization: only en-US ships today (see §10 and §16).

---

## 15. Asset inventory

| Path | Purpose | Source | Status |
|---|---|---|---|
| `assets/title-keyart.webp` | Title/menu backdrop, darkened behind the panel | FLUX.2 klein, 1280×720, seed 71041, 30 steps → WebP q80 (63 KB) | generated in this pass, wired (`.hc-screen-title`) |
| `assets/council-chamber.webp` | Results-screen illustration | FLUX.2 klein, 1024×576, seed 82117, 30 steps → WebP q80 (37 KB) | generated in this pass, wired (`UI.resultsScreen`) |
| `coverart.png` | Platform cover art (`cover=` in `starhermit.txt`) | FLUX.2 klein (earlier pass) | shipped |
| `icon.png`, `favicon.svg` | Platform icon and browser favicon | authored | shipped |
| `sfx/ui-ack.opus` | `ack` cue | MOSS-SFX v2.0 | shipped |
| `sfx/ui-reject.opus` | `reject` cue | MOSS-SFX v2.0 | shipped |
| `sfx/footstep.opus`, `sfx/footstep-alt.opus` | `move` variants | MOSS-SFX v2.0 | shipped |
| `sfx/task-complete.opus` | `task` cue | MOSS-SFX v2.0 | shipped |
| `sfx/council-bell.opus` | `meeting` cue | MOSS-SFX v2.0 | shipped |
| `sfx/vote-token.opus` | `vote` cue | MOSS-SFX v2.0 | shipped |
| `sfx/eject-whoosh.opus` | `eject` cue | MOSS-SFX v2.0 | shipped |
| `sfx/eliminate-thud.opus` | `eliminate` cue | MOSS-SFX v2.0 | shipped |
| `sfx/clock-tick.opus` | `tick` countdown cue | MOSS-SFX v2.0 | shipped |
| `sfx/victory-fanfare.opus` | `win` stinger | MOSS-SFX v2.0 | shipped |
| `sfx/defeat-drone.opus` | `lose` stinger | MOSS-SFX v2.0 | shipped |
| `sfx/session-start.opus` | `start` cue | MOSS-SFX v2.0, 100 steps | generated in this pass, wired |
| `sfx/achievement-chime.opus` | `achievement` cue | MOSS-SFX v2.0, 100 steps | generated in this pass, wired |
| `sfx/undo-rewind.opus` | `undo` cue | MOSS-SFX v2.0, 100 steps | generated in this pass, wired |
| `sfx/hint-whisper.opus` | `hint` cue | MOSS-SFX v2.0, 100 steps | generated in this pass, wired |
| station geometry, pawns, gears, pipes | Playfield | procedural Three.js (`src/render.js`) | shipped (no mesh files) |
| ambience bed, music stem | Background audio | WebAudio synthesis (`src/audio.js`) | shipped (no streamed audio) |

All music and ambience are generated at runtime; the game ships no character animation and no
`.glb` models, because the station is procedural and the pawns are abstract capsules.

---

## 16. Known limitations

* **One locale.** Only en-US strings exist; there is no string table or language selector (§10).
* **No chat in hosted play.** Deduction is limited to the public log and votes, by design, but it
  makes hosted rooms sparser than a voice-chat deduction game.
* **Suspicion is coarse.** `state.suspicion` counts only presence at a reported incident and is
  visible to the AI, not surfaced to the player as a number; crew AI voting can therefore look
  arbitrary from the player's side of the log.
* **Emergency chime has no distinct cue.** `call` logs a `meeting` event, so it shares the council
  bell with a reported incident.
* **Hosted results are thin.** The hosted path skips `recordCompletion`, so hosted sessions do not
  advance streaks, achievements or journey records.
* **Leaderboard trust.** Scores are validated for plausibility but not replayed server-side; the
  replay machinery exists but no endpoint verifies a submitted command list.
* **Undo is snapshot-based** (40 deep) and disabled outside practice/tutorial; it also cannot undo
  an AI turn independently of the player's own.

## Design intent not yet implemented

1. Nine-locale support: `src/strings.js` string table, locale from platform profile →
   `navigator.languages` → `en-US`, a Settings language selector, and locale-aware formatting in
   `src/util.js`.
2. A distinct `chime` event and clip for a player-called emergency meeting, separate from `meeting`.
3. Server-side replay verification of submitted scores using the existing `replay()` chain.
4. Hosted sessions feeding the same progression, achievements and leaderboard path as solo play.
5. A surfaced suspicion readout in the council screen (who was seen where, per player) so crew AI
   voting is legible to the player.
