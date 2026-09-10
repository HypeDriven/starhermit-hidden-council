/**
 * Hidden Council — end-to-end playthrough test (dev only, not shipped).
 *
 * Drives the real visible UI in headless Chrome via playwright-core:
 *   title → mode select → Daily Chime → countdown → active play (moves /
 *   tasks / reports / votes through the HUD action buttons, chosen from the
 *   actually-visible buttons each tick) → pause (settings toggled inside the
 *   pause screen) → resume → results with score breakdown → retry → leave to
 *   title. Runs twice: desktop 1280x800 and mobile 390x844 (touch).
 *
 * The menu buttons that used to build a screen without showing it (Journey,
 * Tutorial, Practice, Challenge, Hosted, Settings, Help) now go through
 * showScreen(); the "menus reachable" step guards that regression. The played
 * mode is the Daily (solo, offline-capable); Hosted Play requires server.js
 * and is covered by tests/run.js instead.
 *
 * The embedded server is a minimal static file server plus tiny /api/v1
 * stubs (time + score intake) so client fetches succeed without the
 * platform backend. Hosted Play requires server.js and is not covered.
 *
 * Run: npm run test:e2e
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOT = (stage, vp) => `/tmp/hidden-council-e2e-${stage}-${vp}.png`;

// Benign GPU/swiftshader console noise (from tools/production_game_audit.mjs).
const browserNoise = /GL Driver Message|GPU stall due to ReadPixels|Automatic fallback to software WebGL|EnableWebGLDeveloperExtensions/i;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/ogg',
  '.glb': 'model/gltf-binary',
  '.woff2': 'font/woff2',
  '.ts': 'text/plain; charset=utf-8',
};

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    // Minimal API stubs so client fetches succeed offline (no console 404s).
    if (url.pathname === '/api/v1/time') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ now: Date.now() }));
      return;
    }
    if (url.pathname === '/api/v1/scores' && req.method === 'POST') {
      req.resume();
      req.on('end', () => {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      });
      return;
    }
    if (url.pathname.startsWith('/api/')) {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'not_found' }));
      return;
    }
    let rel = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    if (!rel) rel = 'index.html';
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'not_found' }));
        return;
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

// Station layout (mirrors src/rules.js STATION_ROOMS) used only to pick which
// *visible* "Go: <room>" button to click — all actions go through the UI.
const ROOM_LINKS = {
  core: ['workshop', 'observatory'],
  workshop: ['core', 'foundry', 'gallery'],
  observatory: ['core', 'aviary'],
  foundry: ['workshop', 'cistern'],
  gallery: ['workshop', 'greenhouse'],
  aviary: ['observatory', 'greenhouse'],
  cistern: ['foundry', 'greenhouse'],
  greenhouse: ['gallery', 'aviary', 'cistern'],
};
const ROOM_NAMES = {
  core: 'Pendulum Core', workshop: 'Gearwright Workshop', observatory: 'Starlens Observatory',
  foundry: 'Brass Foundry', gallery: 'Chronicle Gallery', aviary: 'Windup Aviary',
  cistern: 'Mainspring Cistern', greenhouse: 'Copper Greenhouse',
};

// BFS next hop from `from` toward `to` (deterministic, ties in room order).
function nextHop(from, to) {
  if (from === to) return from;
  const prev = { [from]: null };
  const queue = [from];
  while (queue.length) {
    const cur = queue.shift();
    for (const nxt of ROOM_LINKS[cur]) {
      if (!(nxt in prev)) {
        prev[nxt] = cur;
        if (nxt === to) {
          let hop = to;
          while (prev[hop] !== from) hop = prev[hop];
          return hop;
        }
        queue.push(nxt);
      }
    }
  }
  return null;
}

async function waitForPhase(page, phase, timeout = 10000) {
  await page.waitForFunction((p) => window.__hiddenCouncil?.phase === p, phase, { timeout });
}

async function clickAction(page, name) {
  await page.locator('.hc-actions').getByRole('button', { name, exact: true }).click({ timeout: 1500 });
}

// Play the active session through the visible HUD action buttons until the
// results screen. window.__hiddenCouncil is read only to decide which
// visible button to press and to detect the terminal state.
//
// Pacing matters: every human command re-arms the AI's turn timer
// (SoloSession.commit -> scheduleAi -> stopAi + setTimeout(aiDelayMs)), so a
// script that clicks faster than aiDelayMs starves the AI forever and the
// game can never end. We therefore act at a human cadence (~0.7s between
// actions) and simply wait when only the "Wait" pass action is available.
async function playUntilResults(page, vp, deadlineMs = 300000) {
  const t0 = Date.now();
  let hintDone = false;
  let acts = 0;
  let humanOut = false; // human seat eliminated/ejected: no legal actions remain
  for (;;) {
    const phase = await page.evaluate(() => window.__hiddenCouncil?.phase);
    if (phase === 'results') return { acts, humanOut };
    if (Date.now() - t0 > deadlineMs) throw new Error(`play timed out (phase=${phase}, actions=${acts})`);
    if (phase !== 'active') {
      await page.waitForTimeout(400);
      continue;
    }

    // Which action buttons are actually on screen right now?
    const buttons = (await page.locator('.hc-actions button:visible').allTextContents()).map((t) => t.trim());

    try {
      if (!hintDone && buttons.some((b) => b.startsWith('💡 Hint'))) {
        hintDone = true;
        await clickAction(page, buttons.find((b) => b.startsWith('💡 Hint')));
        const caption = await page.textContent('.hc-caption');
        if (!caption || !caption.startsWith('Hint:')) throw new Error('hint produced no caption');
        console.log('  hint:', caption);
      } else if (buttons.includes('⚠ Report incident')) {
        await clickAction(page, '⚠ Report incident');
        acts++;
      } else if (buttons.some((b) => b.startsWith('Vote:'))) {
        await clickAction(page, buttons.includes('Vote: skip') ? 'Vote: skip' : buttons.find((b) => b.startsWith('Vote:')));
        acts++;
      } else if (buttons.some((b) => b.startsWith('Do:'))) {
        await clickAction(page, buttons.find((b) => b.startsWith('Do:')));
        acts++;
      } else if (buttons.some((b) => b.startsWith('Eliminate '))) {
        // Some seeds seat the human as saboteur; playing the role ends the game.
        await clickAction(page, buttons.find((b) => b.startsWith('Eliminate ')));
        acts++;
      } else if (buttons.some((b) => b.startsWith('Go:'))) {
        // Head toward the nearest unfinished task, using only visible buttons.
        const info = await page.evaluate(() => {
          const s = window.__hiddenCouncil.session.state;
          return { room: s.players[0].room, tasks: s.tasks.filter((t) => !t.done).map((t) => t.room) };
        });
        let wanted = null;
        for (const tr of info.tasks) {
          const hop = nextHop(info.room, tr);
          if (hop && hop !== info.room) { wanted = `Go: ${ROOM_NAMES[hop]}`; break; }
        }
        const choice = wanted && buttons.includes(wanted) ? wanted : buttons.find((b) => b.startsWith('Go:'));
        await clickAction(page, choice);
        acts++;
      } else {
        // Nothing productive (only "Wait", or eliminated): let the AI take
        // its turns instead of spamming commands that would starve it.
        const me = await page.evaluate(() => {
          const s = window.__hiddenCouncil.session?.state;
          return s ? s.players.find((p) => p.id === window.__hiddenCouncil.session.humanId)?.alive : null;
        });
        if (me === false) humanOut = true;
        await page.waitForTimeout(600);
        continue;
      }
      if (acts === 2) await page.screenshot({ path: SHOT('play', vp) });
    } catch (e) {
      if (e.message.startsWith('hint')) throw e;
      // Stale button (HUD re-rendered mid-click) — re-read and continue.
    }
    // Human cadence: leave room for the AI turn timer (aiDelayMs 200/450).
    await page.waitForTimeout(700);
  }
}

async function runPass(browser, port, vp) {
  const mobile = vp === 'mobile';
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 800 },
    hasTouch: mobile,
    isMobile: mobile,
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    // Warnings count too: a broken GL state (e.g. toggling shadows without a
    // shader recompile) shows up as warnings while the canvas goes blank.
    if ((m.type() === 'error' || m.type() === 'warning') && !browserNoise.test(m.text())) {
      errors.push(`console ${m.type()}: ${m.text()}`);
    }
  });

  const step = async (name, fn) => {
    await fn();
    console.log(`ok - [${vp}] ${name}`);
  };

  try {
    await step('load + title visible', async () => {
      await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load', timeout: 30000 });
      await page.waitForFunction(() => window.__hiddenCouncil?.phase === 'title', null, { timeout: 15000 });
      await page.getByRole('heading', { name: 'Hidden Council' }).waitFor();
      await page.getByRole('button', { name: '▶ Play' }).waitFor({ state: 'visible' });
      await page.screenshot({ path: SHOT('title', vp) });
    });

    await step('mode select opens and returns', async () => {
      await page.getByRole('button', { name: '▶ Play' }).click();
      await page.getByRole('heading', { name: 'Choose Your Session' }).waitFor();
      await page.screenshot({ path: SHOT('mode-select', vp) });
      await page.getByRole('button', { name: '← Back' }).click();
      await page.getByRole('button', { name: '▶ Play' }).waitFor({ state: 'visible' });
    });

    await step('menus reachable from title and mode select', async () => {
      // Title: Journey / Help / Settings must actually open their screens.
      await page.getByRole('button', { name: 'Journey' }).click();
      await page.getByRole('heading', { name: 'Journey' }).waitFor();
      await page.getByRole('button', { name: '← Back' }).click();
      await page.getByRole('heading', { name: 'Choose Your Session' }).waitFor();
      // Mode select: Tutorial / Practice / Challenge.
      for (const [button, heading] of [['Tutorial', 'Tutorial Lessons'], ['Practice', 'Practice'], ['Challenge', 'Challenges']]) {
        await page.getByRole('button', { name: button, exact: true }).click();
        await page.getByRole('heading', { name: heading, exact: true }).waitFor({ timeout: 3000 });
        await page.getByRole('button', { name: '← Back' }).click();
        await page.getByRole('heading', { name: 'Choose Your Session' }).waitFor();
      }
      await page.getByRole('button', { name: '← Back' }).click();
      await page.getByRole('button', { name: 'Help' }).click();
      await page.getByRole('heading', { name: 'How to Play' }).waitFor();
      await page.getByRole('button', { name: '← Back' }).click();
      await page.getByRole('button', { name: '⚙ Settings' }).click();
      await page.getByRole('heading', { name: 'Settings' }).waitFor();
      await page.getByRole('button', { name: '← Back' }).click();
      await page.getByRole('button', { name: '▶ Play' }).waitFor({ state: 'visible' });
    });

    await step('daily chime → countdown → active', async () => {
      await page.getByRole('button', { name: 'Daily Chime' }).click();
      // WebGL path goes straight to countdown; otherwise a compat screen
      // offers 2D controls — take whichever appears.
      const compat = page.getByRole('button', { name: 'Continue (2D controls)' });
      await Promise.race([
        waitForPhase(page, 'countdown'),
        compat.waitFor({ state: 'visible' }).then(() => compat.click()),
      ]);
      await waitForPhase(page, 'countdown');
      await page.screenshot({ path: SHOT('countdown', vp) });
      await waitForPhase(page, 'active', 8000);
      if (await page.locator('.hc-hud').isHidden()) throw new Error('HUD not visible in play');
    });

    await step('pause → settings toggle → resume', async () => {
      await page.getByRole('button', { name: '⏸ Pause' }).click();
      await page.getByRole('heading', { name: 'Paused' }).waitFor();
      await waitForPhase(page, 'paused');
      // Settings live inside the pause screen (standalone Settings screen is
      // unreachable — see header comment). Toggle reduced motion + a slider.
      await page.getByText('Reduced motion').click();
      await page.waitForFunction(() => document.body.classList.contains('hc-reduced-motion'));
      const music = page.getByLabel('Music');
      await music.fill('0.2');
      const tier = page.getByLabel('Graphics tier');
      await tier.selectOption('low');
      const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('hidden-council-settings')));
      if (!stored.reducedMotion || stored.tier !== 'low') throw new Error('settings not persisted');
      await page.screenshot({ path: SHOT('pause-settings', vp) });
      await page.getByRole('button', { name: '▶ Resume' }).click();
      await waitForPhase(page, 'active');
      if (await page.getByRole('heading', { name: 'Paused' }).isVisible().catch(() => false)) {
        throw new Error('pause screen still visible after resume');
      }
    });

    await step('play daily through HUD buttons until results', async () => {
      const { acts, humanOut } = await playUntilResults(page, vp);
      console.log(`  human actions taken: ${acts}`);
      // The AI turn timer free-runs while menus are open, so on some daily
      // seeds the saboteurs silence the idle human seat before the play loop
      // gets a move in; that is a legitimate outcome, not a stuck UI.
      if (acts < 3 && !humanOut) throw new Error('playthrough took suspiciously few actions');
      if (humanOut) console.log('  note: human seat was silenced early; the station played out the session');
      await page.getByRole('button', { name: '↻ Retry' }).waitFor({ state: 'visible', timeout: 10000 });
      const headline = await page.locator('.hc-headline').textContent();
      console.log('  headline:', headline);
      const rows = await page.locator('.hc-score tr').count();
      if (rows < 6) throw new Error(`expected score breakdown rows, got ${rows}`);
      await page.screenshot({ path: SHOT('results', vp) });
    });

    await step('progression persisted', async () => {
      const save = await page.evaluate(() => JSON.parse(localStorage.getItem('hidden-council-save') || 'null'));
      if (!save || !save.data || save.data.sessions < 1) throw new Error('session completion not persisted');
      console.log('  sessions:', save.data.sessions, 'wins:', save.data.wins);
    });

    await step('retry → pause (Esc) → leave to title', async () => {
      await page.getByRole('button', { name: '↻ Retry' }).click();
      await waitForPhase(page, 'active', 10000);
      await page.keyboard.press('Escape');
      await page.getByRole('heading', { name: 'Paused' }).waitFor();
      await page.getByRole('button', { name: 'Leave Session' }).click();
      await waitForPhase(page, 'title');
      await page.getByRole('button', { name: '▶ Play' }).waitFor({ state: 'visible' });
      await page.screenshot({ path: SHOT('back-to-title', vp) });
    });
  } finally {
    await context.close();
  }

  if (errors.length) {
    throw new Error(`[${vp}] page errors:\n${errors.join('\n')}`);
  }
}

let server;
let browser;
try {
  const started = await startServer();
  server = started.server;

  browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
  });

  await runPass(browser, started.port, 'desktop');
  console.log('ok - desktop pass clean (no page errors)');
  await runPass(browser, started.port, 'mobile');
  console.log('ok - mobile pass clean (no page errors)');
  console.log('\nE2E PASS — both viewport passes completed with no page errors');
} catch (e) {
  console.error('E2E FAIL:', e.message || e);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((r) => server.close(r));
}
