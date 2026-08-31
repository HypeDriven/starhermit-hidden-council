'use strict';
// Render module: Three.js clockwork research station. Procedural geometry,
// PBR materials, authored camera, render layers, quality tiers, deterministic
// visual seed, reduced-motion support, WebGL context-loss recovery.

import * as THREE from 'three';
import { STATION_ROOMS } from './rules.js';
import { THEMES } from './content.js';
import { rand01, smoothstep, clamp } from './util.js';

// Render layers.
export const LAYER_ENV = 0;
export const LAYER_GAME = 1;
export const LAYER_SELECT = 2;
export const LAYER_FX = 3;

// Room anchor positions on the station deck (authored layout).
export const ROOM_POS = {
  core: [0, 0], workshop: [-4.2, 0], observatory: [4.2, 0],
  foundry: [-6.4, 4.2], gallery: [-1.5, 4.2], aviary: [5.6, 4.2],
  cistern: [-4.2, 8.4], greenhouse: [1.8, 8.4],
};

const PAWN_COLORS = [0xff6b6b, 0x6bd5ff, 0xffd166, 0x9d6bff, 0x6bffb8, 0xff9de2, 0xc0ff6b, 0xffa26b, 0x8f9dff, 0x6bffe3, 0xe2ff6b, 0xbfbfbf];
// Color-vision-safe palette (Okabe-Ito).
const PAWN_COLORS_CVD = [0xe69f00, 0x56b4e9, 0x009e73, 0xf0e442, 0x0072b2, 0xd55e00, 0xcc79a7, 0x999999, 0x66cc99, 0xaa4499, 0xddcc77, 0x882255];

const QUALITY = {
  low: { shadows: false, particles: 0, pixelRatio: 1, renderScale: 0.75, gears: 4 },
  medium: { shadows: true, particles: 200, pixelRatio: 1.5, renderScale: 1, gears: 8 },
  high: { shadows: true, particles: 800, pixelRatio: 2, renderScale: 1, gears: 14 },
};

const CAM_FRAME = { dist: 14, height: 12, lookY: 0, fov: 42 };

export class StationRenderer {
  constructor(canvas, opts) {
    this.opts = opts || {};
    this.canvas = canvas;
    this.visualSeed = (opts && opts.seed) || 1;
    this.reducedMotion = !!(opts && opts.reducedMotion);
    this.cvd = !!(opts && opts.cvd);
    this.disposed = false;
    this.pawns = new Map();
    this.roomMeshes = new Map();
    this.markers = [];
    this.gears = [];
    this.time = 0;
    this.camAnim = null;
    this.focusRoom = 'core';
    this.hidden = false;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      this.failed = true;
      return;
    }
    this.renderer = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this.contextLost = true; }, false);
    canvas.addEventListener('webglcontextrestored', () => { this.contextLost = false; this.rebuild(); }, false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(CAM_FRAME.fov, 1, 0.1, 200);
    this.raycaster = new THREE.Raycaster();
    this.raycaster.layers.set(LAYER_GAME);

    this.setTheme((opts && opts.theme) || 'brass-dawn');
    this.buildEnvironment();
    this.buildSelectionAids();
    this.setQuality((opts && opts.tier) || 'medium');
    this.placeCamera('core', true);
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    this.raf = requestAnimationFrame(this.animate);
  }

  // ---- construction ------------------------------------------------------

  setTheme(themeId) {
    const t = THEMES.find((x) => x.id === themeId) || THEMES[0];
    this.theme = t;
    this.scene.background = new THREE.Color(t.sky);
    if (this.lights) for (const l of this.lights) this.scene.remove(l);
    const key = new THREE.DirectionalLight(t.key, 2.4);
    key.position.set(6, 10, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -14; key.shadow.camera.right = 14;
    key.shadow.camera.top = 14; key.shadow.camera.bottom = -14;
    const fill = new THREE.HemisphereLight(t.fill, t.sky, 0.9);
    const rim = new THREE.DirectionalLight(t.accent, 0.5);
    rim.position.set(-5, 6, -8);
    this.lights = [key, fill, rim];
    for (const l of this.lights) { l.layers.enableAll(); this.scene.add(l); }
  }

  buildEnvironment() {
    const t = this.theme;
    const envGroup = new THREE.Group();
    envGroup.layers.set(LAYER_ENV);

    // Deck slab.
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.4, 18),
      new THREE.MeshStandardMaterial({ color: t.floor, roughness: 0.85, metalness: 0.35 })
    );
    deck.position.set(0, -0.2, 4);
    deck.receiveShadow = true;
    envGroup.add(deck);

    // Rooms: octagonal pads with rim + name anchor.
    for (const room of STATION_ROOMS) {
      const [x, z] = ROOM_POS[room.id];
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.9, 0.35, 8),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(t.floor).offsetHSL(0, 0.05, 0.09), roughness: 0.6, metalness: 0.5 })
      );
      pad.position.set(x, 0.18, z);
      pad.receiveShadow = true; pad.castShadow = true;
      pad.userData.roomId = room.id;
      pad.layers.enable(LAYER_GAME);
      envGroup.add(pad);
      this.roomMeshes.set(room.id, pad);

      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(1.75, 0.07, 8, 24),
        new THREE.MeshStandardMaterial({ color: t.accent, roughness: 0.4, metalness: 0.8, emissive: t.accent, emissiveIntensity: 0.15 })
      );
      rim.rotation.x = Math.PI / 2;
      rim.position.set(x, 0.36, z);
      envGroup.add(rim);
    }

    // Corridors between linked rooms.
    const seen = new Set();
    for (const room of STATION_ROOMS) {
      const [x1, z1] = ROOM_POS[room.id];
      for (const link of room.links) {
        const k = [room.id, link].sort().join('|');
        if (seen.has(k)) continue;
        seen.add(k);
        const [x2, z2] = ROOM_POS[link];
        const dx = x2 - x1, dz = z2 - z1;
        const len = Math.hypot(dx, dz) - 3.0;
        const cor = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.14, len),
          new THREE.MeshStandardMaterial({ color: t.accent, roughness: 0.5, metalness: 0.7 })
        );
        cor.position.set((x1 + x2) / 2, 0.12, (z1 + z2) / 2);
        cor.rotation.y = Math.atan2(dx, dz);
        envGroup.add(cor);
      }
    }

    // Decorative gears (deterministic placement from visual seed).
    const gearMat = new THREE.MeshStandardMaterial({ color: 0x8a6a3a, roughness: 0.35, metalness: 0.9 });
    const gearCount = 14;
    for (let i = 0; i < gearCount; i++) {
      const teeth = 8 + Math.floor(rand01(this.visualSeed, i) * 6);
      const r = 0.4 + rand01(this.visualSeed, 50 + i) * 0.7;
      const gear = this.makeGear(r, teeth, 0.12, gearMat);
      const edge = i % 4;
      const gx = edge === 0 ? -10 : edge === 1 ? 10 : (rand01(this.visualSeed, 100 + i) * 20 - 10);
      const gz = edge < 2 ? rand01(this.visualSeed, 200 + i) * 16 - 4 : (edge === 2 ? -3 : 12);
      gear.position.set(gx, 0.6 + rand01(this.visualSeed, 300 + i) * 1.6, gz);
      gear.rotation.x = Math.PI / 2;
      gear.userData.spin = (rand01(this.visualSeed, 400 + i) - 0.5) * 1.6;
      gear.userData.maxTier = i < 4 ? 'low' : i < 8 ? 'medium' : 'high';
      this.gears.push(gear);
      envGroup.add(gear);
    }

    // Pipes around the rim.
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x6a5a4a, roughness: 0.5, metalness: 0.8 });
    for (let i = 0; i < 6; i++) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 16, 10), pipeMat);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(0, 0.3 + i * 0.28, -4.2 - (i % 2) * 0.3);
      envGroup.add(pipe);
    }

    this.envGroup = envGroup;
    this.scene.add(envGroup);
  }

  makeGear(radius, teeth, thick, mat) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thick, 24), mat);
    group.add(body);
    for (let i = 0; i < teeth; i++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(radius * 0.28, thick, radius * 0.24), mat);
      const a = (i / teeth) * Math.PI * 2;
      tooth.position.set(Math.cos(a) * radius * 1.08, 0, Math.sin(a) * radius * 1.08);
      tooth.rotation.y = -a;
      group.add(tooth);
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.25, radius * 0.25, thick * 1.6, 12), mat);
    group.add(hub);
    return group;
  }

  buildSelectionAids() {
    // Ground marker ring (selection feedback, layer SELECT).
    this.marker = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.06, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })
    );
    this.marker.rotation.x = Math.PI / 2;
    this.marker.layers.set(LAYER_SELECT);
    this.marker.visible = false;
    this.scene.add(this.marker);

    // Legal-target previews.
    this.previews = new THREE.Group();
    this.previews.layers.set(LAYER_SELECT);
    this.scene.add(this.previews);
  }

  // ---- pawns --------------------------------------------------------------

  pawnColor(i) { return (this.cvd ? PAWN_COLORS_CVD : PAWN_COLORS)[i % PAWN_COLORS.length]; }

  syncState(state) {
    const seen = new Set();
    state.players.forEach((p, i) => {
      seen.add(p.id);
      let pawn = this.pawns.get(p.id);
      if (!pawn) {
        pawn = this.makePawn(i, p.id);
        this.pawns.set(p.id, pawn);
        this.scene.add(pawn.group);
      }
      const [x, z] = ROOM_POS[p.room];
      const slot = state.players.filter((q) => q.alive && q.room === p.room).indexOf(p);
      const a = (slot / 7) * Math.PI * 2;
      const tx = x + Math.cos(a) * 0.8, tz = z + Math.sin(a) * 0.8;
      pawn.target.set(tx, p.alive ? 0.4 : 0.12, tz);
      pawn.group.visible = true;
      pawn.body.material.opacity = p.alive ? 1 : 0.35;
      pawn.body.rotation.z = p.alive ? 0 : Math.PI / 2;
    });
    for (const [id, pawn] of this.pawns) {
      if (!seen.has(id)) { this.scene.remove(pawn.group); this.pawns.delete(id); }
    }
  }

  makePawn(index, id) {
    const group = new THREE.Group();
    const color = this.pawnColor(index);
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.22, 0.4, 6, 14),
      new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.25, transparent: true })
    );
    body.castShadow = true;
    body.layers.enable(LAYER_GAME);
    body.userData.playerId = id;
    group.add(body);
    // Key on the head — clockwork winding key.
    const keyMat = new THREE.MeshStandardMaterial({ color: 0xd9c27a, roughness: 0.3, metalness: 0.9 });
    const key = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 6, 12), keyMat);
    key.position.y = 0.62;
    group.add(key);
    group.userData.playerId = id;
    const target = new THREE.Vector3();
    return { group, body, key, target, id };
  }

  // ---- selection / previews -------------------------------------------------

  select(playerId) {
    const pawn = this.pawns.get(playerId);
    if (!pawn) { this.marker.visible = false; this.selected = null; return; }
    this.selected = playerId;
    this.marker.visible = true;
  }

  showLegalTargets(rooms) {
    while (this.previews.children.length) this.previews.remove(this.previews.children[0]);
    for (const roomId of rooms) {
      const [x, z] = ROOM_POS[roomId];
      const g = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.05, 8, 20),
        new THREE.MeshBasicMaterial({ color: this.theme.accent, transparent: true, opacity: 0.75 })
      );
      g.rotation.x = Math.PI / 2;
      g.position.set(x, 0.42, z);
      g.layers.set(LAYER_SELECT);
      this.previews.add(g);
    }
  }

  // ---- picking ---------------------------------------------------------------

  // Returns {kind:'pawn'|'room', id} or null. Raycasts interaction layers only.
  pick(ndcX, ndcY) {
    if (this.failed || this.contextLost) return null;
    this.raycaster.setFromCamera({ x: ndcX, y: ndcY }, this.camera);
    this.raycaster.layers.set(LAYER_GAME);
    const hits = this.raycaster.intersectObjects(this.scene.children, true);
    for (const h of hits) {
      let o = h.object;
      if (o.userData.playerId) return { kind: 'pawn', id: o.userData.playerId };
      if (o.userData.roomId) return { kind: 'room', id: o.userData.roomId };
    }
    return null;
  }

  roomScreenPos(roomId) {
    const [x, z] = ROOM_POS[roomId];
    const v = new THREE.Vector3(x, 0.6, z).project(this.camera);
    return { x: (v.x * 0.5 + 0.5) * this.canvas.clientWidth, y: (-v.y * 0.5 + 0.5) * this.canvas.clientHeight };
  }

  // ---- camera -----------------------------------------------------------------

  placeCamera(roomId, snap) {
    const [x, z] = ROOM_POS[roomId] || [0, 0];
    this.focusRoom = roomId;
    const look = new THREE.Vector3(x * 0.55, CAM_FRAME.lookY, z * 0.55 + 2.5);
    const pos = new THREE.Vector3(look.x, CAM_FRAME.height, look.z + CAM_FRAME.dist * 0.55);
    if (snap || this.reducedMotion) {
      this.camera.position.copy(pos);
      this.camera.lookAt(look);
      this.camAnim = null;
      this.camLook = look.clone();
    } else {
      this.camAnim = { from: this.camera.position.clone(), to: pos, fromLook: (this.camLook || look).clone(), toLook: look, t: 0, dur: 0.7 };
    }
  }

  resetCamera() { this.placeCamera(this.focusRoom || 'core', false); }

  // ---- quality ------------------------------------------------------------------

  setQuality(tier) {
    const q = QUALITY[tier] || QUALITY.medium;
    this.tier = tier;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.pixelRatio));
    this.renderer.shadowMap.enabled = q.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderScale = q.renderScale;
    for (const g of this.gears) {
      const order = { low: 0, medium: 1, high: 2 };
      g.visible = order[g.userData.maxTier] <= order[tier];
    }
    this.resize();
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    const s = this.renderScale || 1;
    this.renderer.setSize(Math.floor(w * s), Math.floor(h * s), false);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  rebuild() {
    // Context restored: GPU resources are rebuilt lazily by three; re-apply sizing.
    this.resize();
  }

  setHidden(h) { this.hidden = h; }

  // ---- loop -----------------------------------------------------------------

  animate() {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.animate);
    if (this.hidden || this.failed || this.contextLost) return; // zero-render heartbeat while hidden
    const dt = Math.min(this.clock.getDelta(), 0.1);
    this.time += dt;

    // Camera transition (interruptible, eased — not cumulative lerp).
    if (this.camAnim) {
      this.camAnim.t += dt / this.camAnim.dur;
      const k = smoothstep(clamp(this.camAnim.t, 0, 1));
      this.camera.position.lerpVectors(this.camAnim.from, this.camAnim.to, k);
      this.camLook = this.camAnim.fromLook.clone().lerp(this.camAnim.toLook, k);
      this.camera.lookAt(this.camLook);
      if (this.camAnim.t >= 1) this.camAnim = null;
    }

    // Pawn motion: lift on selection, ease toward targets.
    for (const pawn of this.pawns.values()) {
      pawn.group.position.lerp(pawn.target, this.reducedMotion ? 1 : Math.min(1, dt * 6));
      const lift = this.selected === pawn.id ? 0.22 : 0;
      pawn.body.position.y += ((lift + (this.reducedMotion ? 0 : Math.sin(this.time * 2 + pawn.group.id) * 0.02)) - pawn.body.position.y) * 0.2;
      if (!this.reducedMotion) pawn.key.rotation.y += dt * 2;
    }
    const pawn = this.selected && this.pawns.get(this.selected);
    if (pawn) {
      this.marker.position.set(pawn.group.position.x, 0.05, pawn.group.position.z);
      this.marker.material.opacity = 0.6 + (this.reducedMotion ? 0.2 : Math.sin(this.time * 4) * 0.25);
    }

    // Decorative gears.
    if (!this.reducedMotion) {
      for (const g of this.gears) if (g.visible) g.rotation.z += g.userData.spin * dt;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    if (this.renderer) this.renderer.dispose();
  }
}
