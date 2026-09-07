import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { server, ready } = require('../server.js');
await ready;
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
  const host = await browser.newPage(), guest = await browser.newPage();
  const errors = [];
  for (const page of [host, guest]) {
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForFunction(() => !!window.__hiddenCouncil);
  }
  await host.evaluate(() => {
    const app = window.__hiddenCouncil;
    app.hostedCreate();
    app.ws.addEventListener('message', ev => { const msg = JSON.parse(ev.data); if (msg.type === 'room') window.testRoom = msg; });
  });
  await host.waitForFunction(() => !!window.testRoom);
  const code = await host.evaluate(() => window.testRoom.code);
  await guest.evaluate(code => {
    const app = window.__hiddenCouncil;
    app.hostedJoin(code);
    app.ws.addEventListener('message', ev => { const msg = JSON.parse(ev.data); if (msg.type === 'room') window.testRoom = msg; });
  }, code);
  await guest.waitForFunction(() => !!window.testRoom);
  await host.evaluate(() => { const a = window.__hiddenCouncil; a.hostedAddAi(); a.hostedAddAi(); a.hostedReady(); });
  await guest.evaluate(() => window.__hiddenCouncil.hostedReady());
  await host.waitForFunction(() => window.testRoom.seats.length === 4 && window.testRoom.seats.every(s => s.ready));
  await host.evaluate(() => window.__hiddenCouncil.hostedStart());
  await guest.waitForFunction(() => window.__hiddenCouncil.phase === 'active');
  assert.equal(await guest.evaluate(() => window.__hiddenCouncil.session.humanId), 'p1');
  const target = await guest.evaluate(() => {
    const a = window.__hiddenCouncil;
    const action = a.session.legal().find(c => c.type === 'move');
    a.humanAct(action);
    return action.room;
  });
  await guest.waitForFunction(room => window.__hiddenCouncil.session.state.players.find(p => p.id === 'p1').room === room, target);
  console.log('PASS: guest browser maps its seat and moves through the server');
  // Inject a terminal server message to isolate results presentation from AI outcomes.
  await guest.evaluate(() => {
    const a = window.__hiddenCouncil;
    const state = structuredClone(a.session.state);
    state.phase = 'over'; state.winner = 'crew'; state.winReason = 'tasks_complete';
    a.ws.onmessage({ data: JSON.stringify({ type: 'results', state }) });
  });
  await guest.waitForFunction(() => window.__hiddenCouncil.phase === 'results');
  assert.equal(await guest.locator('table caption').textContent(), 'Score breakdown');
  assert.deepEqual(errors, []);
  console.log('PASS: hosted terminal message opens results with score breakdown');
} finally {
  if (browser) await browser.close();
  server.closeAllConnections?.();
  await new Promise(resolve => server.close(resolve));
}
