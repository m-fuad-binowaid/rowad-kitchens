import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const runs = [];
for (let i = 0; i < 3; i++) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 85,
    downloadThroughput: (9 * 1024 * 1024) / 8,
    uploadThroughput: (1024 * 1024) / 8,
    connectionType: 'cellular4g',
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0, interactions: [] };
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__metrics.lcp = e.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (!e.hadRecentInput) window.__metrics.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (e.interactionId) window.__metrics.interactions.push(e.duration);
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
  });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'فتح القائمة' }).click();
  await page.getByRole('button', { name: 'إغلاق القائمة' }).click();
  await page.waitForTimeout(200);
  const result = await page.evaluate(() => ({
    lcpMs: Math.round(window.__metrics.lcp),
    cls: Number(window.__metrics.cls.toFixed(4)),
    maxObservedInteractionMs: Math.max(0, ...window.__metrics.interactions),
    resources: performance
      .getEntriesByType('resource')
      .map((r) => ({ name: new URL(r.name).pathname, bytes: r.transferSize })),
  }));
  runs.push(result);
  await context.close();
}
await browser.close();
const output = {
  conditions:
    'Chromium; 390×844; cold cache; 9 Mbps down / 1 Mbps up; 85 ms latency; 4× CPU slowdown; local Vite production preview. Three independent runs.',
  note: 'Lab LCP and cumulative layout shifts during the observed session. Interaction timings are two menu clicks, NOT field INP. Zero means no event exceeded the 16 ms reporting threshold. Real-device and field measurements remain necessary.',
  runs,
};
await mkdir('test-results', { recursive: true });
await writeFile('test-results/performance.json', JSON.stringify(output, null, 2));
console.log(
  JSON.stringify(
    {
      ...output,
      runs: runs.map(({ resources, ...r }) => ({
        ...r,
        transferBytes: resources.reduce((s, x) => s + x.bytes, 0),
      })),
    },
    null,
    2,
  ),
);
