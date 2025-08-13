# SHAGWORM — Gold Bug 2025 Write-up

Static site for our DEF CON Gold Bug 2025 write-up, styled with a BBS/ANSI vibe (retro ANSI banner, terminal-like layout). Built with Vite + React + TypeScript and deployed to GitHub Pages.

Live (after merge to main):
- https://cdenicola.github.io/shagworm-goldbug-2025/

## Local development

Prereqs:
- Node.js 20+ (CI uses Node 22)
- npm 9+
- Git

Install dependencies:
```bash
npm ci
```

Run the dev server:
```bash
npm run dev
```
Open the URL Vite prints (typically http://localhost:5173).

Build a production bundle:
```bash
npm run build
```
Outputs the production build to `dist/`.

Preview the production build locally:
```bash
npm run preview
```
Serves the `dist` build (typically http://localhost:4173).

Lint the project:
```bash
npm run lint
```

From package.json (for reference):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## GitHub Pages deployment

- Project Pages URL: https://cdenicola.github.io/shagworm-goldbug-2025/
- Vite is configured with `base: "/shagworm-goldbug-2025/"` in `vite.config.ts` so assets resolve correctly under the Pages subpath.
- Deployment is handled by the GitHub Actions workflow at `.github/workflows/pages.yml`, which:
  - Checks out the repo
  - Uses Node 22 with npm cache
  - Runs `npm ci` and `npm run build`
  - Uploads `dist` and deploys via `actions/deploy-pages`

Deployments occur on pushes to `main`.

## Notes

- ANSI/BBS “SHAGWORM” banner and retro styling are included.
- Each puzzle section includes placeholders for write-up content and `DifficultyStars` for difficulty.
- If you change the repository name or hosting path, update `base` in `vite.config.ts` accordingly.

## Troubleshooting

- 404s for CSS/JS on GitHub Pages:
  - Ensure `base` in `vite.config.ts` is `"/shagworm-goldbug-2025/"`.
  - Confirm the Pages workflow succeeded (Actions tab).
- Dev server won’t start:
  - Use Node 20+ (or match the CI Node 22).
  - Delete `node_modules` and run `npm ci` again.
- Preview differs from dev:
  - Use `npm run build && npm run preview` to test the exact production output.
