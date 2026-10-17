// Graphics benchmark hook for tools/gfx-bench.mjs (dev-only): picks a preset in Settings → Graphics,
// starts the Daily Chime and plays it through the visible HUD action buttons (move between rooms, do
// tasks, report, vote) at a human cadence, pressing Retry at the results — pawns walk, the camera follows,
// gears spin, lamps shimmer, motes drift and the post chain runs.
export const presets = ['low', 'balanced', 'high', 'ultra'];
export const levels = { low: 0, balanced: 4, high: 10, ultra: 17 };

export async function setPreset(page, preset) {
  await page.getByRole('button', { name: '▶ Play' }).waitFor({ state: 'visible', timeout: 20000 });
  await page.getByRole('button', { name: '⚙ Settings' }).click();
  await page.getByRole('heading', { name: 'Settings' }).waitFor();
  await page.locator('#hc-gfx-preset').scrollIntoViewIfNeeded();
  await page.locator('#hc-gfx-preset').selectOption(preset);
  await page.waitForFunction((p) => document.body.dataset.gfxPreset === p, preset);
  await page.getByRole('button', { name: '← Back' }).click();
  await page.getByRole('button', { name: '▶ Play' }).waitFor({ state: 'visible' });
}

const act = (page, name) => page.locator('.hc-actions').getByRole('button', { name, exact: true }).click({ timeout: 1500 });

async function step(page, n) {
  if (await page.getByRole('button', { name: '↻ Retry' }).filter({ visible: true }).count()) {
    return page.getByRole('button', { name: '↻ Retry' }).click({ timeout: 3000 });
  }
  const buttons = (await page.locator('.hc-actions button:visible').allTextContents()).map((t) => t.trim());
  const pick = (pre) => buttons.filter((b) => b.startsWith(pre));
  if (buttons.includes('⚠ Report incident')) return act(page, '⚠ Report incident');
  if (pick('Vote:').length) return act(page, buttons.includes('Vote: skip') ? 'Vote: skip' : pick('Vote:')[0]);
  if (pick('Do:').length) return act(page, pick('Do:')[0]);
  if (pick('Eliminate ').length) return act(page, pick('Eliminate ')[0]);
  const go = pick('Go:');
  if (go.length) return act(page, go[n % go.length]);
}

export async function start(page) {
  await page.getByRole('button', { name: 'Daily Chime' }).click();
  await page.waitForFunction(() => window.__hiddenCouncil?.phase === 'active', null, { timeout: 15000 });
  let open = true, n = 0;
  page.once('close', () => { open = false; });
  (async () => {
    while (open) {
      try { await step(page, n++); } catch (e) { if (!open) return; if (process.env.BENCH_DEBUG) console.error(e.message); }
      // Human cadence: every command re-arms the AI turn timer, so faster clicks would starve the AI.
      await page.waitForTimeout(700).catch(() => {});
    }
  })();
  await page.waitForTimeout(1500);
}
