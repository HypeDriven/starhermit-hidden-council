'use strict';
// Audio module: WebAudio-synthesized original transients, quiet ambience,
// adaptive music stem. Seeded variants; independent buses; muted when hidden.
// Authored one-shot samples (sfx/*.opus, see sfx/manifest.json) are preferred
// for named events; synthesis remains as fallback while loading or on failure.

import { rand01 } from './util.js';

// Event -> authored sample basenames (sfx/<name>.opus). Multiple names per
// event are variants chosen deterministically by the event seed.
const EVENT_SAMPLES = {
  ack: ['ui-ack'],
  reject: ['ui-reject'],
  move: ['footstep', 'footstep-alt'],
  task: ['task-complete'],
  meeting: ['council-bell'],
  eject: ['eject-whoosh'],
  eliminate: ['eliminate-thud'],
  win: ['victory-fanfare'],
  lose: ['defeat-drone'],
  vote: ['vote-token'],
  tick: ['clock-tick'],
};

export class AudioEngine {
  constructor(settings) {
    this.settings = settings;
    this.ctx = null;
    this.buses = {};
    this.musicNodes = null;
    this.ambNodes = null;
    this.caption = null; // callback for visual captions of meaningful sounds
    this.muted = false;
    this.samples = new Map(); // name -> { buffer } | { failed: true } while/after loading
  }

  ensure() {
    if (this.ctx) return true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      this.ctx = new AC();
      const master = this.ctx.createGain();
      master.connect(this.ctx.destination);
      this.master = master;
      for (const bus of ['music', 'effects', 'ambience', 'voice']) {
        const g = this.ctx.createGain();
        g.gain.value = this.settings[bus] != null ? this.settings[bus] : 0.7;
        g.connect(master);
        this.buses[bus] = g;
      }
      this.startAmbience();
      this.startMusic();
      return true;
    } catch (e) { return false; }
  }

  setVolume(bus, v) {
    if (this.buses[bus]) this.buses[bus].gain.setTargetAtTime(Math.max(0, Math.min(1, v)), this.ctx.currentTime, 0.05);
  }

  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 1, this.ctx.currentTime, 0.05);
  }

  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); }

  // ---- synth primitives -------------------------------------------------

  blip(bus, freq, dur, type, gain, when) {
    if (!this.ctx || this.muted) return;
    const t = when || this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain || 0.2, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.buses[bus] || this.master);
    o.start(t); o.stop(t + dur + 0.02);
  }

  chime(bus, freqs, step, dur, gain) {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime;
    freqs.forEach((f, i) => this.blip(bus, f, dur || 0.5, 'triangle', gain || 0.16, t0 + i * step));
  }

  // Try to play an authored sample for this event through the effects bus.
  // Returns true when a decoded sample was played; false while it is still
  // loading or after a fetch/decode failure, so callers fall back to synth.
  playSample(kind, seed) {
    if (!this.ctx || this.muted) return true; // muted: silence, like the synths
    const names = EVENT_SAMPLES[kind];
    if (!names || !names.length) return false;
    const name = names[Math.floor(rand01(seed || 1, 7) * names.length)];
    const entry = this.samples.get(name);
    if (entry && entry.buffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = entry.buffer;
      src.connect(this.buses.effects);
      src.start();
      return true;
    }
    if (!entry) {
      this.samples.set(name, {}); // mark loading to avoid duplicate fetches
      fetch('sfx/' + name + '.opus')
        .then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.arrayBuffer(); })
        .then((ab) => this.ctx ? this.ctx.decodeAudioData(ab) : Promise.reject(new Error('no ctx')))
        .then((buf) => { this.samples.set(name, { buffer: buf }); })
        .catch(() => { this.samples.set(name, { failed: true }); });
    }
    return false;
  }

  // Event tiers: ack < move < goal < round. Seed gives deterministic variants.
  event(kind, seed) {
    if (!this.ensure()) return;
    this.resume();
    const sampled = this.playSample(kind, seed);
    const v = rand01(seed || 1, Date.now() & 0xffff) * 0.06 - 0.03;
    switch (kind) {
      case 'ack': if (!sampled) this.blip('effects', 620 * (1 + v), 0.07, 'square', 0.08); break;
      case 'reject': if (!sampled) this.blip('effects', 180, 0.12, 'sawtooth', 0.1); this.say('Not allowed'); break;
      case 'move': if (!sampled) { this.blip('effects', 330 * (1 + v), 0.14, 'triangle', 0.14); this.blip('effects', 495, 0.1, 'sine', 0.08); } break;
      case 'task': if (!sampled) this.chime('effects', [523, 659, 784], 0.05, 0.3, 0.12); this.say('Task complete'); break;
      case 'meeting': if (!sampled) this.chime('voice', [880, 660, 880, 660], 0.12, 0.5, 0.15); this.say('Council convened'); break;
      case 'eject': if (!sampled) this.chime('voice', [440, 330, 220], 0.15, 0.6, 0.15); this.say('Someone was ejected'); break;
      case 'eliminate': if (!sampled) this.blip('effects', 90, 0.4, 'sawtooth', 0.16); this.say('An incident occurred'); break;
      case 'win': if (!sampled) this.chime('music', [523, 659, 784, 1047], 0.12, 0.8, 0.16); this.say('Victory'); break;
      case 'lose': if (!sampled) this.chime('music', [392, 330, 262, 196], 0.16, 0.9, 0.16); this.say('Defeat'); break;
      case 'vote': if (!sampled) this.blip('voice', 700 * (1 + v), 0.1, 'sine', 0.12); break;
      case 'tick': if (!sampled) this.blip('effects', 1200, 0.03, 'square', 0.04); break;
    }
  }

  say(text) { if (this.caption) this.caption(text); }

  startAmbience() {
    if (!this.ctx || this.ambNodes) return;
    const len = this.ctx.sampleRate * 2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    let seed = 7;
    for (let i = 0; i < len; i++) { seed = (seed * 16807) % 2147483647; d[i] = ((seed / 2147483647) * 2 - 1) * 0.25; }
    const src = this.ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'lowpass'; filt.frequency.value = 320;
    const g = this.ctx.createGain(); g.gain.value = 0.5;
    src.connect(filt); filt.connect(g); g.connect(this.buses.ambience);
    src.start();
    this.ambNodes = { src, g };
  }

  // Adaptive music stem: slow pentatonic pad loop; intensity raises tempo gain.
  startMusic() {
    if (!this.ctx || this.musicNodes) return;
    const scale = [261.6, 293.7, 329.6, 392, 440, 523.3];
    const g = this.ctx.createGain(); g.gain.value = 0.5; g.connect(this.buses.music);
    let step = 0;
    const tick = () => {
      if (!this.ctx || this.muted) return;
      const f = scale[Math.floor(rand01(99, step) * scale.length)];
      this.blip('music', f, 1.4, 'sine', 0.05);
      if (step % 4 === 0) this.blip('music', f / 2, 1.8, 'triangle', 0.04);
      step++;
    };
    this.musicNodes = { g, interval: setInterval(tick, 1400) };
    tick();
  }

  dispose() {
    if (this.musicNodes) clearInterval(this.musicNodes.interval);
    if (this.ctx) this.ctx.close().catch(() => {});
    this.ctx = null;
    this.buses = {};
    this.musicNodes = null;
    this.ambNodes = null;
  }
}
