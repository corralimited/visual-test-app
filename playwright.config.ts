import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the SnapDiff visual-test-app.
 *
 * Two reporters:
 *   - `list` — normal Playwright console output
 *   - `@snapdiff/playwright/reporter` — uploads each captured snapshot, creates
 *     a SnapDiff build, and gates the run on visual changes
 *
 * Tests target SITE_URL (the deployed GitHub Pages URL). Set SNAPDIFF_API_KEY
 * via env / GitHub secret. Auto-detected CI metadata covers the rest.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // sequential keeps reporter logs readable
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1, // one browser at a time — no parallel helps determinism
  reporter: [
    ['list'],
    [
      '@snapdiff/playwright/reporter',
      {
        project: 'visual-test-app',
        apiUrl: 'https://snapdiff-production.up.railway.app',
        // apiKey defaults to SNAPDIFF_API_KEY env var
      },
    ],
  ],
  use: {
    baseURL: process.env.SITE_URL ?? 'https://corralimited.github.io/visual-test-app',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
