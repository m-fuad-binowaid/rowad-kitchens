import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = [
  '/',
  '/about',
  '/kitchens',
  '/projects',
  '/projects/quiet-contrast',
  '/projects/classic-light',
  '/process',
  '/showrooms',
  '/contact',
  '/catalog',
];
for (const width of [320, 375, 390, 430, 768, 1440]) {
  test(`all localized routes render without overflow or runtime errors at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    await page.setViewportSize({ width, height: 900 });
    for (const prefix of ['', '/en'])
      for (const route of routes) {
        const path = prefix + (route === '/' ? '' : route) || '/';
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('html')).toHaveAttribute('dir', prefix ? 'ltr' : 'rtl');
        await expect(page.locator('html')).toHaveAttribute('lang', prefix ? 'en' : 'ar');
        const overflow = await page.evaluate(() => ({
          width: innerWidth,
          document: document.documentElement.scrollWidth,
        }));
        expect(overflow.document, `${path} overflows at ${width}`).toBeLessThanOrEqual(
          overflow.width + 1,
        );
        const broken = await page
          .locator('img')
          .evaluateAll((imgs) =>
            imgs
              .filter((i) => i.loading !== 'lazy' && (!i.complete || i.naturalWidth === 0))
              .map((i) => i.src),
          );
        expect(broken, `broken images on ${path}`).toEqual([]);
      }
    expect(errors).toEqual([]);
  });
}
test('gallery filters, image viewer, keyboard navigation, and focus restoration', async ({
  page,
}) => {
  await page.goto('/en/kitchens');
  await page
    .getByRole('group', { name: 'Filter by style' })
    .getByRole('button', { name: 'Contemporary 5', exact: true })
    .click();
  await expect(page.locator('.kitchen-card')).toHaveCount(5);
  await expect(page.getByRole('status')).toHaveText('5 designs');
  const trigger = page.getByRole('button', { name: 'View photograph: Quiet contrast' });
  await trigger.click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal.getByRole('heading')).toHaveText('Quiet contrast');
  await page.keyboard.press('ArrowRight');
  await expect(modal.getByRole('heading')).toHaveText('Considered simplicity');
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page
    .getByRole('group', { name: 'Filter by style' })
    .getByRole('button', { name: 'Classic 7', exact: true })
    .click();
  await expect(page.locator('.kitchen-card')).toHaveCount(7);
});
test('mobile menu traps focus, closes, and navigates between languages', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'فتح القائمة' });
  await opener.click();
  const menu = page.getByRole('dialog', { name: 'القائمة الرئيسية' });
  await expect(menu).toBeVisible();
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab');
    expect(await menu.evaluate((el) => el.contains(document.activeElement))).toBeTruthy();
  }
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await menu.getByRole('link', { name: 'مطابخنا' }).click();
  await expect(page).toHaveURL(/\/kitchens$/);
  await expect(menu).not.toBeVisible();
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await expect(page).toHaveURL(/\/en\/kitchens$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});
test('inquiry validates input and generates a truthful downloadable summary without sending data', async ({
  page,
  context,
}) => {
  await page.goto('/en/contact?purpose=catalog');
  await expect(page.locator('select[name=purpose]')).toHaveValue('catalog');
  await page.getByLabel('Name *', { exact: true }).fill('Test Visitor');
  await page.getByLabel('Phone or email *').fill('invalid');
  await page
    .getByLabel('What do you have in mind? *')
    .fill('A calm kitchen with a practical island.');
  await page.getByRole('button', { name: 'Prepare my inquiry' }).click();
  await expect(page.locator('.inquiry-result')).toHaveCount(0);
  await page.getByLabel('Phone or email *').fill('visitor@example.com');
  const sent: string[] = [];
  page.on('request', (r) => {
    if (r.method() === 'POST') sent.push(r.url());
  });
  await page.getByRole('button', { name: 'Prepare my inquiry' }).click();
  await expect(page.getByLabel('Inquiry summary')).toContainText('Catalog request');
  await expect(page.getByText('Your inquiry has not been sent.', { exact: false })).toBeVisible();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy summary' }).click();
  await expect(page.getByRole('status')).toContainText('Summary copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    await page.getByLabel('Inquiry summary').inputValue(),
  );
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download text' }).click();
  expect((await download).suggestedFilename()).toBe('rowad-inquiry.txt');
  await expect(page.getByRole('status')).toContainText('has not been sent');
  expect(sent).toEqual([]);
});
test('scroll-linked image expansion and process progression work; reduced motion is respected', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const target = page.locator('.cinematic');
  await target.scrollIntoViewIfNeeded();
  await page.evaluate(() => scrollBy(0, -500));
  await page.waitForTimeout(150);
  const before = await page
    .locator('.cinematic-image')
    .evaluate((el) => getComputedStyle(el).clipPath);
  await page.evaluate(() => scrollBy(0, 500));
  await page.waitForTimeout(150);
  const after = await page
    .locator('.cinematic-image')
    .evaluate((el) => getComputedStyle(el).clipPath);
  expect(before).not.toBe(after);
  await page.goto('/process');
  await page.locator('.process-step').last().scrollIntoViewIfNeeded();
  await expect(page.locator('.kitchen-drawing')).toHaveClass(/stage-3/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.cinematic-image')).toHaveCSS('clip-path', 'none');
});
for (const route of ['/', '/en', '/kitchens', '/en/contact', '/process', '/showrooms'])
  test(`accessibility audit ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    ).toEqual([]);
  });
test('static HTML includes localized content and production URL is withheld', async ({
  request,
  page,
}) => {
  for (const path of ['/about/', '/en/about/', '/projects/quiet-contrast/']) {
    const response = await request.get(path);
    const html = await response.text();
    expect(html).toContain('<h1>');
    expect(html.match(/name="description"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html).toContain('noindex,nofollow');
    expect(html).not.toContain('rel="canonical"');
  }
  await page.goto('/this-route-does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('غير موجودة');
});
