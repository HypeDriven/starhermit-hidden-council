// Sound, as the browser build's src/audio.js: the authored one-shots
// (sfx/<name>.opus, sfx/manifest.txt) per game event, the quiet machinery bed
// (noise low-passed at 320 Hz) and the sparse pentatonic pad, with a caption
// for each meaningful cue so no cue is audio-only.
//
// The browser build's four buses become the runtime's (Options › Audio owns
// the volumes and the mute): effects and voice → "effects", the
// acknowledgement tick → "interface", music and ambience → "music"; the old
// default bus levels (music 0.6, effects 0.8, ambience 0.5, voice 0.7) are
// folded into each sound's gain. The bed and the pad are rendered once into
// looping clips (createClip) with the old oscillators, filter and envelopes,
// because a live synthesis graph makes clip loads fail on the engine's web
// runtime (the arrow-exodus port's finding); for the same reason the
// synthesized stand-ins the browser build played while a clip decoded are not
// ported, so a clip still loading is silent (its caption still shows). Clips
// load once the mixer runs (natively at once, in a browser after the first
// press), one at a time.
import { context, createClip, loadClip, play as playClip, type AudioClip, type Bus, type Sound } from "starhermit:audio";
import { rand01 } from "../src/util.js";

export type Cue =
  | "ack" | "reject" | "move" | "task" | "meeting" | "eject" | "eliminate" | "win" | "lose"
  | "vote" | "tick" | "start" | "undo" | "hint" | "achievement";
const SAMPLES: Record<Cue, string[]> = {
  ack: ["ui-ack"], reject: ["ui-reject"], move: ["footstep", "footstep-alt"], task: ["task-complete"],
  meeting: ["council-bell"], eject: ["eject-whoosh"], eliminate: ["eliminate-thud"], win: ["victory-fanfare"],
  lose: ["defeat-drone"], vote: ["vote-token"], tick: ["clock-tick"], start: ["session-start"],
  undo: ["undo-rewind"], hint: ["hint-whisper"], achievement: ["achievement-chime"],
};
/** The cues the browser build captioned (translation keys). */
export const CAPTIONS: Partial<Record<Cue, string>> = {
  reject: "Not allowed", task: "Task complete", meeting: "Council convened", eject: "Someone was ejected",
  eliminate: "An incident occurred", win: "Victory", lose: "Defeat", start: "Session begins", achievement: "Achievement unlocked",
};
const BUS: Record<Cue, Bus> = {
  ack: "interface", reject: "effects", move: "effects", task: "effects", meeting: "effects", eject: "effects",
  eliminate: "effects", win: "effects", lose: "effects", vote: "effects", tick: "effects", start: "effects",
  undo: "effects", hint: "effects", achievement: "effects",
};
const EFFECTS = 0.8, MUSIC = 0.6, AMBIENCE = 0.5;

const clips = new Map<string, AudioClip>();
const queue: string[] = [];
let loading = false;
let wantClips = false;
let suspended = false;
let captionHook: ((key: string) => void) | null = null;
/** fn(key) for each cue's caption (a translation key). */
export function onCaption(fn: (key: string) => void): void { captionHook = fn; }

function load(name: string): void { if (!queue.includes(name) && !clips.has(name)) queue.push(name); }
function pump(): void {
  if (loading || !queue.length) return;
  const name = queue.shift()!;
  loading = true;
  loadClip(`sfx/${name}.opus`).then((c) => { clips.set(name, c); loading = false; }, (e: unknown) => { console.warn(`sfx ${name}: ${String(e)}`); loading = false; });
}
/** Asks for the clips and the beds; they start once the mixer runs (see update). */
export function loadSfx(): void { wantClips = true; }

/** Plays a cue (a variant chosen from the seed, as the browser build did) and shows its caption. */
export function event(kind: Cue, seed = 1): void {
  const cap = CAPTIONS[kind];
  if (cap) captionHook?.(cap);
  const names = SAMPLES[kind];
  const file = names[Math.floor(rand01(seed || 1, 7) * names.length)]!;
  const clip = clips.get(file);
  if (!clip || suspended) return;
  try { playClip(clip, { bus: BUS[kind], gain: EFFECTS }); }
  catch { clips.delete(file); load(file); } // a clip the mixer lost: load it again
}

// -- the beds, rendered once ---------------------------------------------------------------
const RATE = 8000;
/** RBJ biquad low-pass in place (Web Audio's BiquadFilterNode). */
function lowpass(x: Float32Array, freq: number, q: number): void {
  const w = 2 * Math.PI * freq / RATE, alpha = Math.sin(w) / (2 * q), c = Math.cos(w);
  const a0 = 1 + alpha;
  const b0 = (1 - c) / 2 / a0, b1 = (1 - c) / a0, b2 = b0, a1 = -2 * c / a0, a2 = (1 - alpha) / a0;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) {
    const x0 = x[i]!;
    const y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    x2 = x1; x1 = x0; y2 = y1; y1 = y0;
    x[i] = y0;
  }
}
/** The machinery bed: the old seeded noise loop (2 s) through a 320 Hz low-pass, at its 0.5 gain; seamless. */
function bedClip(): AudioClip {
  const n = 2 * RATE, fade = Math.round(0.25 * RATE);
  const raw = new Float32Array(n + fade);
  let seed = 7;
  for (let i = 0; i < raw.length; i++) { seed = (seed * 16807) % 2147483647; raw[i] = ((seed / 2147483647) * 2 - 1) * 0.25; }
  lowpass(raw, 320, 0.707);
  const out = raw.slice(0, n);
  for (let i = 0; i < fade; i++) { const k = i / fade; out[i] = (raw[n + i]! * (1 - k) + raw[i]! * k) * 0.5; }
  for (let i = fade; i < n; i++) out[i]! *= 0.5;
  return createClip([out], RATE);
}
/** The pad: 32 of the old 1.4 s steps (a sine from the seeded pentatonic scale, a triangle an octave down every 4th), looped. */
function padClip(): AudioClip {
  const scale = [261.6, 293.7, 329.6, 392, 440, 523.3];
  const steps = 32, stepLen = 1.4;
  const n = Math.round(steps * stepLen * RATE);
  const out = new Float32Array(n);
  const voice = (start: number, f: number, dur: number, tri: boolean, gain: number): void => {
    const len = Math.round((dur + 0.02) * RATE);
    for (let i = 0; i < len; i++) {
      const t = i / RATE;
      const env = t < 0.008 ? (t / 0.008) * gain : gain * Math.pow(0.0001 / gain, Math.min(1, (t - 0.008) / (dur - 0.008)));
      const ph = (t * f) % 1;
      const s = tri ? 1 - 4 * Math.abs(ph - 0.5) : Math.sin(2 * Math.PI * ph);
      out[(start + i) % n]! += s * env * 0.5;
    }
  };
  for (let step = 0; step < steps; step++) {
    const f = scale[Math.floor(rand01(99, step) * scale.length)]!;
    const at = Math.round(step * stepLen * RATE);
    voice(at, f, 1.4, false, 0.05);
    if (step % 4 === 0) voice(at, f / 2, 1.8, true, 0.04);
  }
  return createClip([out], RATE);
}
let bed: Sound | null = null;
let pad: Sound | null = null;
let beds: { bed: AudioClip; pad: AudioClip } | null = null;
let bedsFailed = false;

/** A hidden window: the beds stop (the old master duck), cues are silent. */
export function setSuspended(on: boolean): void {
  suspended = on;
  if (on) {
    try { bed?.stop(); pad?.stop(); } catch { /* gone */ }
    bed = null; pad = null;
  }
}

/** Each frame: the clips once the mixer runs (one at a time), then the beds' loops (one a frame). */
export function update(): void {
  if (context.state !== "running") return;
  if (wantClips) {
    wantClips = false;
    for (const names of Object.values(SAMPLES)) for (const n of names) load(n);
    return;
  }
  pump();
  if (suspended || bedsFailed) return;
  try {
    if (!beds) { beds = { bed: bedClip(), pad: padClip() }; return; }
    if (!bed) { bed = playClip(beds.bed, { bus: "music", gain: AMBIENCE, loop: true }); return; }
    if (!pad) pad = playClip(beds.pad, { bus: "music", gain: MUSIC, loop: true });
  } catch (e) { console.warn(`audio beds: ${String(e)}`); bedsFailed = true; }
}
