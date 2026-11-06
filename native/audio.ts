// Sound, as the browser build's src/audio.js: the authored one-shots
// (sfx/<name>.opus, sfx/manifest.txt) per game event, the quiet machinery bed
// (noise low-passed at 320 Hz) and the sparse pentatonic pad, with a caption
// for each meaningful cue so no cue is audio-only.
//
// The browser build's four buses become the runtime's (Options › Audio owns
// the volumes and the mute): effects and voice → "effects", the
// acknowledgement tick → "interface", music and ambience → "music"; the old
// default bus levels (music 0.6, effects 0.8, ambience 0.5, voice 0.7) are
// folded into each sound's gain. The bed and the pad are rendered once offline
// (OfflineAudioContext) into looping clips with the old oscillators, filter and
// envelopes. The synthesized stand-ins the browser build played while a clip
// decoded are not ported, so a clip still loading is silent (its caption still
// shows). The clips load and the beds render at once in onStart; the beds start
// once the mixer runs (in a browser after the first press).
import { context, createClip, loadClip, OfflineAudioContext, play as playClip, type AudioClip, type Bus, type Sound } from "starhermit:audio";
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
let suspended = false;
let captionHook: ((key: string) => void) | null = null;
/** fn(key) for each cue's caption (a translation key). */
export function onCaption(fn: (key: string) => void): void { captionHook = fn; }

/** Loads every clip at once (onStart); a cue whose clip is still loading is skipped. The beds render here and start once the mixer runs (see update). */
export function loadSfx(): void {
  for (const name of new Set(Object.values(SAMPLES).flat())) {
    loadClip(`sfx/${name}.opus`).then((c) => { clips.set(name, c); }, (e: unknown) => console.warn(`sfx ${name}: ${String(e)}`));
  }
  Promise.all([renderBed(), renderPad()]).then(([b, p]) => { beds = { bed: b, pad: p }; }, (e: unknown) => console.warn(`audio beds: ${String(e)}`));
}

/** Plays a cue (a variant chosen from the seed, as the browser build did) and shows its caption. */
export function event(kind: Cue, seed = 1): void {
  const cap = CAPTIONS[kind];
  if (cap) captionHook?.(cap);
  const names = SAMPLES[kind];
  const file = names[Math.floor(rand01(seed || 1, 7) * names.length)]!;
  const clip = clips.get(file);
  if (!clip || suspended) return;
  try { playClip(clip, { bus: BUS[kind], gain: EFFECTS }); }
  catch { /* the mixer is full this frame: skip it */ }
}

// -- the beds, rendered once offline ---------------------------------------------------------------
const RATE = 8000;
const BED_GAIN = 0.125;
/** The machinery bed: a 2 s seeded noise loop through a 320 Hz low-pass (Q 0.707, -3 dB in the engine's units), at its 0.5 gain; filtered periodic noise is periodic once settled, so no crossfade. */
async function renderBed(): Promise<AudioClip> {
  const n = 2 * RATE, settle = Math.round(0.25 * RATE);
  const off = new OfflineAudioContext(1, settle + n, RATE);
  const noise = off.createNoise({ seed: 7, seconds: 2 });
  const lp = off.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 320;
  lp.Q.value = -3.01;
  const g = off.createGain();
  g.gain.value = BED_GAIN;
  noise.connect(lp).connect(g).connect(off.destination);
  noise.start();
  const r = await off.startRendering();
  return createClip([r.getChannelData(0).slice(settle)], RATE);
}
/** The pad: 32 of the old 1.4 s steps (a sine from the seeded pentatonic scale, a triangle an octave down every 4th), looped. */
async function renderPad(): Promise<AudioClip> {
  const scale = [261.6, 293.7, 329.6, 392, 440, 523.3];
  const steps = 32, stepLen = 1.4;
  const off = new OfflineAudioContext(1, Math.round(steps * stepLen * RATE), RATE);
  const voice = (at: number, f: number, dur: number, type: "sine" | "triangle", gain: number): void => {
    const osc = off.createOscillator();
    osc.type = type;
    osc.frequency.value = f;
    const g = off.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(gain * 0.5, at + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001 * 0.5, at + dur);
    osc.connect(g).connect(off.destination);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  };
  for (let step = 0; step < steps; step++) {
    const f = scale[Math.floor(rand01(99, step) * scale.length)]!;
    const at = step * stepLen;
    voice(at, f, 1.4, "sine", 0.05);
    if (step % 4 === 0) voice(at, f / 2, 1.8, "triangle", 0.04);
  }
  const r = await off.startRendering();
  return createClip([r.getChannelData(0)], RATE);
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

/** Each frame: the beds' loops start once they are rendered and the mixer runs. */
export function update(): void {
  if (context.state !== "running" || suspended || bedsFailed || !beds) return;
  try {
    if (!bed) { bed = playClip(beds.bed, { bus: "music", gain: AMBIENCE, loop: true }); return; }
    if (!pad) pad = playClip(beds.pad, { bus: "music", gain: MUSIC, loop: true });
  } catch (e) { console.warn(`audio beds: ${String(e)}`); bedsFailed = true; }
}
