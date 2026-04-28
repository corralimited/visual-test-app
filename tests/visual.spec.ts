import { test, expect } from '@playwright/test';
import { snapshot } from '@snapdiff/playwright';

// Page names are suffixed with `-rep` to keep their baselines distinct from
// the URL-mode action's baselines (which use plain names like `homepage`).
// Same project, different capture mode, different baselines — exactly the
// cross-mode story SnapDiff supports.

test('homepage renders with hero, nav, and feature cards', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.locator('h1')).toContainText('Ship');
  await snapshot(page, 'homepage-rep');
});

test('pricing page renders all three tiers', async ({ page }) => {
  await page.goto('/pricing.html');
  await expect(page.locator('.tier')).toHaveCount(3);
  await snapshot(page, 'pricing-rep');
});

test('gallery page renders gradient grid', async ({ page }) => {
  await page.goto('/gallery.html');
  await expect(page.locator('.tile')).toHaveCount(6);
  await snapshot(page, 'gallery-rep');
});

test('contact form renders all fields', async ({ page }) => {
  await page.goto('/form.html');
  await expect(page.locator('form')).toBeVisible();
  await snapshot(page, 'contact-rep');
});
