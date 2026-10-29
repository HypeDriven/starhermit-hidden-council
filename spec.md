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
| Platforms | A StarHermit engine script game: natively in the StarHermit client, in browsers by the engine's web runtime; desktop and phones, portrait and landscape |
| Engine | StarHermit engine 1.26.1 (`engine.version=1.26.1`, `engine.minor=28`, capabilities `platform,storage,clipboard`) |
| Rendering | `starhermit:scene` procedural station (three.js-like) under a `starhermit:ui` immediate-mode interface; post effects are the renderer's (AO, bloom, grade, anti-aliasing) |
| Build | None: the engine imports the TypeScript entry (`native/main.ts`) and the shared ES modules in `src/` directly; `npm run package` writes the web loader `index.html` and `starhermit-files.json` |

### File map

| Path | Responsibility |
|---|---|
| `starhermit.txt` | Manifest: name, owner, `server=server.js`, cover, `launch=index.html`, `engine.*` (entry, version, minor, capabilities), `control.*` keys and `engine.gamepad.*` pads, action groups. |
| `index.html`, `starhermit-files.json` | The engine's web loader and file index, written by `npm run package` (`starhermit package --web .`); never edited by hand. |
| `native/main.ts` | Entry: lifecycle (start, suspend/resume, quit), action routing (keys, pads), taps and clicks on the station, the fixed-step clock, the graphics look per frame. |
| `native/app.ts` | Controller: screen state machine, sessions (countdown, active ↔ paused, results), tutorial gating, hints, undo, move-target browsing, results and score posting, hosted lobby and rounds. Timers run on the game clock. |
| `native/screens.ts` | Every screen, dialog and the HUD (rails, drawers, phone status panel and tray) with `starhermit:ui`. |
| `native/render.ts` | The station on `starhermit:scene`: deck, pads, corridors, lamps, gears, pipes, pawns, selection and target rings, dust motes, camera fit and glides, picking. |
| `native/quality.ts` | The four looks (Low/Balanced/High/Ultra) and their budgets, keyed by the runtime's graphics tier and level. |
| `native/audio.ts` | Authored clips per event, rendered machinery bed and pad loops, captions. |
| `native/platform.ts` | Save (device + cloud, foreign-save migration, merges), the game's options and legacy-settings migration, player, invite link, platform clock, score posting + board, the rooms adapter for hosted play. |
| `native/style.ts`, `native/i18n.ts` | UI styles/theme from `assets/ui-style.json`; the runtime's language → the game's locale. |
| `src/rules.js` | Pure deterministic rules engine — state, legal actions, resolution, AI, scoring, replay. |
| `src/content.js` | Versioned content (`CONTENT_VERSION = 3`): 5 themes, 3 tutorials, 40 journey stages, daily/practice/challenge builders, offline stage validator. |
| `src/session.js` | `SoloSession` (solo loop, AI scheduling on injectable timers, undo stack, achievements, replay export) and the save/option shapes (`defaultSave`, `wrapSave`/`unwrapSave`, `mergeSaves`, `SETTING_DEFAULTS`). |
| `src/hosted.js` | `CouncilClient`: the hosted lobby on a realtime room and the round on the room-bound session's game socket. |
| `src/labels.js` | Localized names and lines: rooms, stage titles, end reasons, score parts, rejections, hints, the station log. |
| `src/i18n.js`, `src/strings.js`, `src/platform-i18n.js` | `T`/`L`, locale matching; the translation tables; the account strings. |
| `src/util.js` | Seeded RNG (mulberry32), FNV-1a hash, helpers. |
| `server.js` | The game's server script: hosted-council referee (room-bound sessions) and high-score posting. Its `RULES` block is `src/util.js` + `src/rules.js`, written by `tools/build-server.mjs`. |
| `leaderboards.json` | The boards `server.js` declares (for the owner's board tooling; a test checks they agree). |
| `assets/` | `title-keyart.webp`, `council-chamber.webp`, `ui-style.json`. |
| `sfx/` | 16 authored Opus one-shots + `manifest.txt` (canonical), `manifest.json`, `manifest.md`. |
| `tools/` | `build-server.mjs`, `package-web.mjs`, `css.mjs` + `ui-style.css`, `gen-plays.mjs` (plans scripted rounds), `browser-play.mjs` (GPU Chrome check). |
| `tests/` | node unit tests, the server and hosted tests over a fake platform, the Jint sandbox test, i18n coverage, `native.mjs` + `native/*.play`. |

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
4. **Two truthful readings of the same board.** The 3D station and the action rails always
   describe the identical legal-action set; the station is a view, never the only control.
   *Rules in:* every station tap has a labelled button twin. *Rules out:* information that exists only in the render (hover-only
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
| Hosted Play | StarHermit realtime rooms + the server script (signed in only; hidden for guests) | create room, quick-join, addable automata, start; `server.js` referees the round | No | Optional |

**Difficulty curve.** Journey stage *i* raises player count every 6 stages, tasks every 3, adds a
second saboteur on stages where `i % 3 === 0` from stage 10 (and always from stage 29), shortens the elimination cooldown by band,
and layers goal limits: a tick limit on stages ≥17 where `i % 4 === 1`, a move limit on stages ≥25
where `i % 4 === 3`. Mechanics unlock in three tiers — `move, task` → `+report, vote` (stage 5) →
`+call, pressure` (stage 13). Every stage's limits are written into *both* `goals` and `config`, so
the rules engine actually enforces what the setup sheet promises.

**Daily content.** `seed = hash('hidden-council-daily') ^ (utcDayKey × 2654435761)`, so the day is
identical for every player and every client, and the theme rotates with the day key. Daily seeds
are immutable once published.

**Persistence and unlocks.** The save document (`src/session.js`; the game's save on the runtime, §12)
holds profile name, per-journey best score/won, sessions, wins, streak, best streak, the set of
action types ever used, achievements and tutorial completion. Five achievements:
*First Winding*, *Full Council* (5 distinct action types), *Steady Hands* (3-win streak),
*Grand Chime* (win a difficulty-5 stage), *Keeper of Hours* (25 sessions). Unlocks are idempotent
(`unlockAchievements`) and `mergeSaves` unions two snapshots without losing progress.

---

## 6. Controls and interaction

Actions are the manifest's (`control.*`, rebindable in the runtime's Options › Controls; the
labels in the HUD and Help show the current binding):

| Action | Keys | Gamepad | Touch / pointer | Result |
|---|---|---|---|---|
| Any legal action | — | D-pad to focus, South to press | Click / tap its button in the action rail | Issues the command; `ack` cue |
| Move by the station | — | — | Click / tap a room in the 3D station | `move` if legal, else `reject` cue and "not a legal target" caption |
| Vote / eliminate by pawn | — | — | Click / tap a pawn | `vote` in a council, `eliminate` when legal, else reject |
| `prev_target` / `next_target` | ←/↑, →/↓ | LB / RB | — | Cycle legal move targets; the camera follows; caption "Target: <room>"; Shift + → moves at once |
| `commit` | Enter, Numpad Enter | RT | — | Move to the focused target (when no button has focus) |
| `wait` | Space | Select | "Wait" button | Passes a tick (when no button has focus) |
| `undo` | U | West | "↩ Undo (U)" button (practice and tutorials) | Pops the snapshot; `undo` cue |
| `hint` | H | North | "💡 Hint (H)" button | Caption + announcement; `hint` cue |
| `camera` | C | Right stick press | — | Re-frames the focused room |
| `pause` | Escape | Start | "⏸ Pause" button | Pause dialog; Escape again resumes |
| Map | — | — | "🗺️ Map" button | Whole-station overview ↔ room view |

The action names `prev_target`/`next_target` are lower case (the engine requires it), so the
browser build's account bindings for `prevTarget`/`nextTarget` are not carried over. F1 is the
runtime's Options menu.

Input locking: commands are accepted only while the session is active (`humanAct` returns early
otherwise), so the countdown, pause, results and menus are safe. A press over a widget is the
widget's; on the station a press that moves 12 px or lasts 500 ms commits nothing. Arrow keys clear
the UI focus before browsing targets. Suspending the window (minimised, backgrounded tab) pauses a
solo session and stops the sound beds; a hosted seat keeps running. Every input produces at least
one of: a rail change, a caption, a screen-reader announcement, or an audio cue.

---

## 7. Screens and UI flow

`title → mode select → (tutorial list | journey grid | practice | challenges | hosted lobby) →
setup sheet → countdown → active ↔ paused → results → (retry | next stage | title)`, driven by
`app.screen`, `app.modal` and `app.phase` in `native/app.ts`.

Menus are a centred card (560 px content, 92 % of the width at most) over the dim backdrop, the
title card over the darkened key art, scrolling when taller than the window: **Title** (▶ Play;
Daily Chime, Journey, Hosted Play (signed in), Help; the profile — a free-text name for guests, the
StarHermit name and cloud-save badge when signed in — with sessions and streak; ⚙ Settings; Sign in
with StarHermit / Invite a friend), **Mode select** (each mode with one sentence), **Setup sheet**
(rules, expected length, players, par, difficulty stars, ranked, the Assists checkbox, Begin),
**Tutorial list** (✓ for finished lessons), **Journey grid** (40 cells: number, ◆ mastery, ✓ won or
·best score; the stage name as the cell's accessible name and tooltip), **Practice**,
**Challenges**, **Hosted lobby**, **Settings**, **Help** (five cards). Pause, Help (from Pause) and
the Results are dialogs over the station.

HUD layouts (logical pixels, after the runtime's UI scale): **wide** (≥ 1024): the top bar (Pause,
Map, the caption line) and both rails — left 240 px objective, progress, the lesson's step and the
last 7 log lines; right 260 px whose move and the action buttons (220 px each when the window is
500 px tall or less) — scrolling inside. **Compact** (narrower, not an upright phone): the rails
are drawers toggled by "☰ Log" and "Actions ▸" in the top bar (one open at a time). **Upright
phone** (≤ 700 px wide): the status panel under the top bar (24 % of the height, the last 4 log
lines, kept scrolled to the newest) and the action tray in the thumb zone (at most 38 %), its
buttons two up. Left-handed controls swap the rails. Long labels wrap inside their buttons; long
titles wrap. The camera fit widens the frame by the rails' share of the width.

Results: the verdict ("The Station Turns Again" / "The Gears Fall Silent"), the council chamber
illustration (hidden below 520 px of height), the headline (side — reason · your role), the six
score rows and the total, new achievements, the leaderboard line and top ten (signed in), the
council's seats with their roles and totals (hosted), and Retry, Next Stage, Copy Replay Hash
(solo) and ← Title.

---

## 8. Art direction

**Palette.** UI (`tools/ui-style.css` → `assets/ui-style.json`): background `#0d0f16`, panels `#171a26` / `#1e2233`, borders
`#2c3048` / `#3a4060`, text `#e8e4da`, muted `#9a96a8`, accent brass `#ffb54d`, danger `#ff6b6b`,
focus cyan `#6bd5ff`. The runtime's high-contrast option replaces the UI colours (white text and
outlines on black, yellow accent and focus) and drops the title's key art. Scene themes (`THEMES` in `content.js`) each define sky/key/fill/floor/
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
suppresses idle animation in the renderer (lamp shimmer and drifting motes also stop under the
OS `prefers-reduced-motion` preference).

**Graphics.** ACES filmic tone mapping; a warm key directional light (shadow box fitted to
the deck slab and gear ring), a hemisphere fill and an accent rim light (three.js r185 intensities); a radial sky-glow background with distance fog in the theme's sky colour; nothing is
drawn behind the menus. Surfaces: riveted deck plates, turned-brass pad dials and slatted
corridor gratings are procedural canvas textures (colour + bump) on Balanced and up; pawns are
clear-coated `MeshPhysicalMaterial` on High/Ultra, plain PBR on Balanced, Lambert on Low; each
room's lamp bulb blooms. The runtime owns the Graphics options (Auto and the level 0–9, render
scale, adaptive resolution, frame-rate limit and readout); `native/quality.ts` maps its tier
(`frame().quality`) to the browser build's presets:

| Look | Low | Balanced | High | Ultra |
|---|---|---|---|---|
| Shadows (map, held to the level) | off | 1024 | 2048 | 4096 |
| Ambient occlusion | off | off | on | high |
| Bloom (threshold 0.9) / colour grade + vignette | off | on | on | on |
| Anti-aliasing | MSAA | FXAA | SMAA | MSAA |
| Reflections (RoomEnvironment IBL) | off | on | on | on |
| Station surfaces / pawn shells | Lambert / Lambert | Standard / Standard | Standard / clear-coat | same |
| Deck texture (pads ≤ 512², gratings ¼); surface detail | — plain | 256² | 512² | 1024² |
| Decorative gears (plain detail shows ≤ 8) | 6 | 10 | 14 | 20 |
| Round-geometry segments | ×0.5 | ×0.75 | ×1 | ×1.5 |
| Dust motes (Balanced draws a third; ×1.64 per level above the tier's floor, ≤ 4×) | off | 480 | 520 | 800 |
| Frosted rails and dialog backdrop | no | no | yes | yes |
| AO / bloom resolution | ½ | ½ | ½ | full |

**Visual assets**: the title key art and the results' council chamber are box backgrounds,
darkened behind their content, decorative.

---

## 9. Audio direction

**Mix philosophy.** The station is quiet: a low filtered noise bed at 320 Hz stands in for steam
and distant machinery, a sparse pentatonic pad marks time, and everything a player *did* is a
short dry transient with no reverb tail. Nothing masks the log.

**Buses.** The runtime's Options › Audio own the volumes and mute: effects and voice cues play on
`effects`, the acknowledgement tick on `interface`, the bed and pad on `music`; the browser
build's default levels (music 0.6, effects 0.8, ambience 0.5) are folded into each sound's gain.

**Music and ambience** are synthesised once into looping clips (`createClip`): the seeded noise
loop through the 320 Hz low-pass, and 32 steps of the 1.4 s pentatonic pad (an octave-down
triangle every fourth step). Clips load once the mixer runs (in a browser after the first press),
one at a time; a cue whose clip is still loading is silent (its caption still shows) — the browser
build's synthesized stand-ins are not ported, because a live synthesis graph breaks clip loading
on the web runtime.

**SFX event table** (source of truth for `sfx/manifest.txt`; event ids are the `kind` argument to
`audio.event()` in `native/audio.ts`):

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

Meaningful cues also print a caption (`native/audio.ts` CAPTIONS → the top bar's caption line) so the audio layer is never the only
carrier of information.

---

## 10. Localization

Nine locales ship: **en-US, en-GB, es-419, es-ES, de-DE, fr-FR, fr-CA, pt-BR, it-IT**. Every
player-facing string — HUD, actions, screens, setup sheet, lobby, results, help, captions, toasts,
hints, rejection reasons, the station log, sound captions and the content names (stages, themes,
rooms, tasks, tutorial titles and steps, achievements) — is an English key in `src/strings.js`
with es-419, de-DE, fr-FR, pt-BR and it-IT translations; en-GB, es-ES and fr-CA carry only their
differences and otherwise inherit en-US, es-419 and fr-FR. The account strings (sign-in, invite,
toasts, the leaderboard line) are in `src/platform-i18n.js`. Station-log lines are generated by the
rules engine in English (they are part of the hashed state) and rendered per known shape
(`src/labels.js logText`). "Hidden Council", "StarHermit", player and automaton names are not
translated; numbers stay plain digits.

The language is the runtime's (Options › Language, else the device's), mapped to the nearest
shipped locale (`es-MX → es-419`, `en-AU → en-GB`, `pt-PT → pt-BR`); a change shows on the next
frame, the session and any room untouched. The browser build's own Language selector, `?lang=`
override and preferred-language lookup are the runtime's now.

---

## 11. Accessibility

* **Keyboard / gamepad**: every screen is reachable with Tab/arrows/Enter (D-pad/South); dialogs
  take focus; in play arrows browse legal move targets, Enter commits, Space waits, U undoes, H
  hints, C re-frames, Esc pauses. No action requires the station view: every target has a
  labelled button.
* **Screen readers**: the UI builds an accessibility tree; announcements (`ui.announce`) cover
  session start, tutorial steps, hints, rejections, meetings, ejections, incidents, pause and the
  verdict (assertive).
* **Captions**: every audio cue that carries meaning also writes a 2.5 s caption in the top bar.
* **Runtime options**: larger text (text size), high contrast, reduced motion (camera snaps, no
  idle animation, a 250 ms countdown and a 200 ms automaton delay), UI scale.
* **Colour**: role and legality are conveyed by text and position, never colour alone; the
  colour-vision-safe palette switches the pawns to Okabe-Ito.
* **Targets**: buttons are ≥ 44 × 44 px with a 3 px focus ring; the phone tray sits in the thumb zone.
* **Other**: left-handed controls swap the rails; "Hold to confirm" is stored and synced but has
  no effect (as in the browser build; Known limitations).

---

## 12. StarHermit integration

`starhermit.txt`: `name`, `description`, `owner`, `server=server.js`, `version=1.1.0`,
`cover=cover.jpg`, `launch=index.html`, `engine.api=1`, `engine.entry=native/main.ts`,
`engine.version=1.26.1`, `engine.minor=28`, `engine.capabilities=platform,storage,clipboard`, the
eight `control.*` actions with `engine.gamepad.*` defaults and two Options groups.

* *Player* — signed in (the StarHermit client's player, or the page's launch in browsers) or a
  guest. The title shows the platform name and a cloud-save badge (synced / saving… / offline),
  or for guests the free-text profile name, **Sign in with StarHermit** (`requestSignIn`). A
  session that ends (signed out, expired) shows a toast; play continues on the device.
* *Save* — the save document is the game's save (`starhermit:storage saves`, schema 1) on the
  device and, signed in, in the account's slot; a conflict between devices merges with
  `mergeSaves` (best score per stage, larger session/win/streak counts, unions of achievements,
  lessons and actions). The browser build's cloud save (the JS SDK's `game:<slug>` slot, a
  `{v: 1, data, sum}` envelope) shows as foreign: it is checksum-checked, merged in, and replaced
  once (`replaceForeign`). Guests' old browser localStorage progress does not migrate.
* *Options* — the game's own options (theme, colour-vision palette, left-handed, hold to confirm,
  hints) are `settings` (synced with the account); the browser build's account settings are
  migrated where the option still exists and every legacy key is removed. Volumes, graphics,
  frame rate, language, controls, text size, high contrast and reduced motion are the runtime's
  Options (Settings and Pause link to them).
* *Platform time* — the Daily Chime's UTC day comes from `serverNow()` when the platform answered,
  else the device clock.
* *Invite* — **Invite a friend** (signed in) copies the invite link.
* *Leaderboard* — signed in, every finished solo Journey, Daily Chime or Challenge round posts its
  total on a practice session to `server.js`, which range-checks it (integer 0–100,000) and returns
  it to the `high-score` board (higher is better); the results show "Leaderboard rank: #N" (or
  posted / not posted) and the board's top ten (own row marked). Tutorial and Practice post
  nothing; guests post nothing.
* *Hosted councils* — signed in only. The host creates a realtime room (one team, 12 seats, no AI
  backfill) and opens it; guests quick-join. The lobby lists the humans from the room's roster and
  the host's automata (a count in the room's metadata, announced to guests as a lobby event);
  the host starts once there are at least 4 seats. Starting binds a session to the room and
  `server.js` referees the round (§13): every client opens the session's game socket, sends
  `{type: 'act', action}` and draws its own view. The script returns the result (winner, reason,
  every seat's role and total), which the platform records and which closes the room; hosted
  rounds do not post to the leaderboard or advance the save. A room that starts without a bound
  session, closes, or stops is unavailable: a toast and the title.
* *Achievements* stay local in the save (five, §5); platform achievements, chat, voice, matchmaking
  queues and replays are not used.

---

## 13. Technical architecture

**Layering.** `rules.js` (pure) ← `content.js` ← `session.js` / `hosted.js` ← `native/app.ts` →
`native/screens.ts` / `render.ts` / `audio.ts` (presentation). Presentation never mutates rules
state: solo play goes through `SoloSession.act()`, hosted play through the script.

**Clock.** The runtime's fixed steps (60 Hz) advance the game clock; the automata's think delay
(450 ms, 200 ms with reduced motion), the countdown, captions, toasts and the achievement chime are
timers on it (`setSessionTimers`), so play pauses while suspended and is deterministic in checks.

**Determinism and replay.** State is JSON-serializable; `applyCommand` deep-copies and never
throws. `exportReplay()` emits seed, config, commands and hashes; the results offer the final hash.

**Server script (`server.js`).** One classic script for the platform's Jint sandbox (no imports,
`ctx.now`/`ctx.random` only), `tickRateHz: 4`. A room-bound session builds the seats from the
frozen roster plus the metadata's automata (padded to 4, at most 12; 2 saboteurs from 9 seats),
creates the state from its own seed, deals the roles again from a second secret seed, and keeps
the log (40 entries) and seen ids small. Commands are bound to the sender's seat (`ctx.message.from`);
fields are whitelisted per action type; an illegal but well-formed command costs its tick and is
answered to the sender (`rejected`). Each tick the automata act about every 450 ms (≤ 3 steps a
tick), choosing actors as `SoloSession.stepAi` does; seats whose player left (`presence.left`) or
has been offline 30 s are played by the AI; humans who have not voted 60 s into a council vote
`skip`. Every change is sent to each human seat as its own view: its own role, the dead seats',
fellow saboteurs' for a saboteur, its own cooldown and votes, no seed. When the rules end the round
— or every human left (`abandoned`) — it returns `result`. Practice sessions without a room take
`{type: 'result', scores}` and return range-checked `scores`.

**Performance.** One scene graph; the station's assets follow the look's budget and are rebuilt
when it changes (pawns kept in place); canvas textures paint once per budget. Every server
invocation measures a few ms in the platform's own sandbox (budget 250 ms).

---

## 14. Testing and acceptance criteria

`npm test` runs:

* `tests/rules.test.mjs` — rules and content (27 tests): initial state, legal actions per role and
  phase, move/task/eliminate/report/vote/call resolution, the witness rule and cooldown, meetings,
  every terminal condition, scoring and tie-breaks, serialization and v0 migration, replay hashes,
  simulation, a malformed-command fuzz pass, AI legality, the 40 stages, goal limits, dailies, the
  validator.
* `tests/save.test.mjs` — the browser build's envelope (checksum), normalisation, two-device
  merges, recording a finished round, option checks.
* `tests/server.test.mjs` — `server.js` under a fake platform host: declarations and the boards,
  score posting (valid and invalid totals), seats and views (hidden roles, fellow saboteurs,
  private cooldowns, no seed), commands bound to the sender, a whole round to its recorded result,
  leavers and abandonment, the offline takeover and the vote deadline; the RULES block is current.
* `tests/hosted.test.mjs` — `CouncilClient` host and guest over the fake platform from lobby to the
  script's result; quick join without rooms; a room without a session is unavailable.
* `tests/jint.test.mjs` — `server.js` in the platform's script worker (Jint, default budgets): a
  whole council and a score post (skipped where the worker is not built).
* `tests/i18n.test.mjs` — every key used by `native/*.ts`, `src/labels.js`, captions and content in
  every locale with placeholders, no unused rows, account strings, language matching, log lines.
* `tests/native.mjs` — the web index is current, translations, `tsc` (strict, no skipLibCheck),
  `starhermit check .` with no warnings, and the play scripts as signed-out render checks:
  `journey.play` (Journey stage 2 to its results through a council vote, planned by
  `tools/gen-plays.mjs`, then Retry and leave), `tutorial.play` (two lessons by keys and the action
  drawer to their results), `practice.play` (hint, wait, undo, pause, help, map), `menus.play`
  (help, settings, a challenge, the setup sheet).

`npm run test:browser` (`tools/browser-play.mjs`) loads the packaged game in Chrome on the GPU at a
desktop (1366×768), a phone (390×844, DPR 3) and a phone sideways (844×390): title → modes → Daily
Chime by keys, a hint, a wait, a keyboard move, the map (phone), the pause dialog; it fails on
console errors or warnings or the runtime's error screen.

---

## 15. Asset inventory

| Path | Purpose | Source |
|---|---|---|
| `assets/title-keyart.webp` | Title card backdrop, darkened | FLUX.2 klein, 1280×720 → WebP q80 |
| `assets/council-chamber.webp` | Results illustration | FLUX.2 klein, 1024×576 → WebP q80 |
| `assets/ui-style.json` | UI styles | `npm run css` from `tools/ui-style.css` |
| `cover.jpg`, `coverart.png`, `icon.png` | Platform cover and icon | FLUX.2 klein / authored |
| `sfx/*.opus` (16) | Event cues (§9) | MOSS-SFX v2.0 |
| station geometry, pawns, gears, pipes | Playfield | procedural (`native/render.ts`) |
| machinery bed, pad | Background audio | rendered at start (`native/audio.ts`) |

---

## 16. Known limitations

* **No chat in hosted play.** Deduction is limited to the public log and votes, by design.
* **Suspicion is coarse.** `state.suspicion` counts only presence at a reported incident and is
  not surfaced to the player as a number; crew AI voting can look arbitrary.
* **Emergency chime has no distinct cue** (it shares the council bell).
* **Hosted results are thin.** Hosted rounds are recorded by the script on the room but do not
  advance the save's streaks, achievements or journey records, nor any leaderboard.
* **Hosted client path not live-tested.** Two real clients against the platform could not be run
  headlessly here; the referee and the client are tested against a fake platform and in the Jint
  sandbox.
* **Solo leaderboard trust.** The solo total is the client's, range-checked by the script (no
  server-side replay verification).
* **Undo is snapshot-based** (40 deep), practice and tutorials only, and cannot undo an automaton's
  turn independently of the player's own.
* **"Hold to confirm"** is stored and synced but changes nothing (as in the browser build).
* **No orbit gesture.** A drag on the station commits nothing and does not move the camera (the
  browser build's spec promised orbiting it never implemented).
* **Old bindings.** Account bindings of the browser build's `prevTarget`/`nextTarget` do not carry
  over (the engine's action names are lower case).

## Design intent not yet implemented

1. Locale-aware number/time formatting (strings are localized; numbers are plain digits).
2. A distinct `chime` event and clip for a player-called emergency meeting.
3. Server-side replay verification of submitted solo scores using the existing `replay()` chain.
4. Hosted sessions feeding the same progression, achievements and leaderboard path as solo play.
5. A surfaced suspicion readout in the council screen.
