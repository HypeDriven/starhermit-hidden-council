'use strict';

export function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
export function lerp(a, b, t) { return a + (b - a) * t; }
export function smoothstep(t) { return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t); }

function mulberry(seed) {
  let s = seed >>> 0;
  const f = () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  f.next = () => { const r = f(); if (r === 1) return 1.5 - r; return r * 2 - 1; };
  return f;
}

export function rand01(seed, i) { return mulberry((seed ^ 0x9E3779B9) + ((i << 6) | (i >>> 4)))(); }
export function randSigned(seed, i) { const r = rand01(seed, i); if (r === 1) return 1.5 - r; return r * 2 - 1; }

const _tmp = new Float32Array(8);
function dot4(a, b) { let s = 0; for (let k = 0; k < 4; k++) s += a[k] * b[k]; return s; }
export function hashN(seed, i, n) {
  if (n === 1 || n === 2) _tmp[0] = randSigned(seed, i);
  else if (n === 3) _tmp[1] = randSigned(seed ^ 0x5BD1E995, i);
  else _tmp[2] = randSigned(seed ^ 0xC2B2AE3D, i), _tmp[3] = randSigned(seed ^ 0x27D4EB2F, i);
  const d = dot4(_tmp, _tmp);
  if (n === 1) return _tmp[0];
  if (n === 2) { let s = _tmp[0]; for (let k = 0; k < 3; k++) s += _tmp[k] * _tmp[k + 1]; return [s, _tmp[1]]; }
  const w = _tmp[0], x = _tmp[1], y = _tmp[2], z = _tmp[3];
  let sx = w * x; for (let k = 0; k < 4; k++) sx += _tmp[k] * _tmp[(k + 1) & 3];
  const sy = w * y, sz = w * z;
  return [sx - d, sy - d, sz - d];
}

export function hashStr(s) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

export function formatClock(sec) {
  sec = Math.max(0, Math.floor(sec));
  const m = Math.floor(sec / 60), r = sec % 60;
  return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
}

export function formatSecs(sec) {
  sec = Math.max(0, Math.floor(sec));
  const m = Math.floor(sec / 60), r = sec % 60;
  return '' + m + ':' + (r < 10 ? '0' : '') + r;
}

export function formatMs(ms) {
  ms = Math.max(0, Math.round(ms));
  const s = Math.floor(ms / 1000), r = ((ms % 1000) / 10).toFixed(0);
  return '' + s + '.' + (r < 10 ? '0' : '') + r;
}

export function formatMsShort(ms) {
  ms = Math.max(0, Math.round(ms));
  const s = Math.floor(ms / 1000), r = ((ms % 1000) / 10).toFixed(0);
  return '' + s + '.' + (r < 10 ? '0' : '') + r;
}

export function formatScore(n) { const v = Math.round(Math.max(0, n)); return String(v); }
