import { test, expect } from '@snapdiff/playwright';

// Page names are suffixed with `-rep` to keep their baselines distinct from
// the URL-mode action's baselines (which use plain names like `homepage`).
// Same project, different capture mode, different baselines — exactly the
// cross-mode story SnapDiff supports.
//
// Note: GitHub Pages serves under a subpath (/visual-test-app/), so we use
// full URLs rather than Playwright's baseURL + leading-slash combo, which
// would resolve `/index.html` against the host root and 404.
//
// Assertions intentionally check *structure*, not copy. A heading text change
// is a visual change we want SnapDiff to flag, not a functional failure.
const SITE_URL =
  process.env.SITE_URL ?? 'https://corralimited.github.io/visual-test-app';

test('homepage renders with hero, nav, and feature cards', async ({ page, snapshot }) => {
  await page.goto(`${SITE_URL}/index.html`);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.card')).toHaveCount(3);
  await snapshot('homepage-rep');
});

test('pricing page renders all three tiers', async ({ page, snapshot }) => {
  await page.goto(`${SITE_URL}/pricing.html`);
  await expect(page.locator('.tier')).toHaveCount(3);
  await snapshot('pricing-rep');
});

test('gallery page renders gradient grid', async ({ page, snapshot }) => {
  await page.goto(`${SITE_URL}/gallery.html`);
  await expect(page.locator('.tile')).toHaveCount(6);
  await snapshot('gallery-rep');
});

test('contact form renders all fields', async ({ page, snapshot }) => {
  await page.goto(`${SITE_URL}/form.html`);
  await expect(page.locator('form')).toBeVisible();
  await snapshot('contact-rep');
});
