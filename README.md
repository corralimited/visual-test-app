# Visual Test App

A static site that exists purely to exercise the SnapDiff GitHub Action against a real, deployed site. Hosted via GitHub Pages, snapped on every push.

Pages cover four distinct visual scenarios:

| Page | Tests |
| --- | --- |
| `index.html` | Hero, navigation, card grid, button states |
| `pricing.html` | Multi-column layout, badges, list rendering |
| `gallery.html` | Gradient rendering, layout grid, large color blocks |
| `form.html` | Form inputs, focus states, checkboxes, selects |

## One-time setup

### 1. Create a private repo on GitHub

```bash
cd visual-test-app
git init
git add -A
git commit -m "init visual test app"
git branch -M main

# Create the repo on GitHub first (UI: https://github.com/new), private, no README/license/.gitignore
git remote add origin git@github.com:<your-username>/visual-test-app.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Repo → **Settings → Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main`, folder `/` (root)
4. Save. After ~1 minute the page URL appears at the top: `https://<username>.github.io/visual-test-app/`. Note this URL.

### 3. Create a project in the SnapDiff dashboard

1. Open https://snapdiff-production.up.railway.app/dashboard/projects → **New Project**
2. Name it (e.g. `visual-test-app`). Note the slug from the URL after creation.

### 4. Add repo secrets and variables

Repo → **Settings → Secrets and variables → Actions**.

**Secrets** tab:

- `SNAPDIFF_API_KEY` — the API key you generated from the dashboard

**Variables** tab:

- `SNAPDIFF_PROJECT_SLUG` — the project slug from step 3
- `SITE_URL` — your GitHub Pages URL, **without** trailing slash, e.g.
  `https://<username>.github.io/visual-test-app`

### 5. Trigger the first build

Push any commit to `main` (or hit **Actions → Visual diff → Run workflow**). The action will:

1. Create a SnapDiff build
2. Capture all four pages
3. Mark them as "first capture" (no baseline yet) — first run always succeeds

Open the build URL in the action's notice output. Click **Accept all** to set baselines.

## Test loop

After baselines are accepted, visual diffs become meaningful. To exercise the action:

1. Edit one of the HTML files (e.g. change a heading on `index.html`)
2. Commit + push to `main`
3. Wait for the deploy + workflow run
4. The action fails the check (status: `changes_requested`) and links to the diff in the dashboard
5. Either accept (new baseline) or reject (regression caught)

## Suggested edits to test diff detection

- **Tiny copy change**: change `Ship UI changes with confidence` → `Ship visual changes with confidence`. Should diff `index.html` only.
- **Color tweak**: change `--accent: #8b5cf6` → `#3b82f6` in `styles.css`. Should diff every page.
- **Layout change**: switch `.gallery { grid-template-columns: repeat(3, 1fr); }` to `repeat(4, 1fr)`. Should diff `gallery.html` only.
- **No-op**: push a whitespace-only change to a comment. Should diff zero pages.
