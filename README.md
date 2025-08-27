# SHAGWORM — Gold Bug 2025 Write-up

Static site for our DEF CON Gold Bug 2025 write-up, styled with a BBS/ANSI vibe. Built with Vite + React + TypeScript, deployed to GitHub Pages.

Live (after merge to main):

- https://cdenicola.github.io/shagworm-goldbug-2025/

## Local development

Prereqs:

- Node.js 20+ (Actions use Node 22), npm 9+
- Git

Install:

```bash
npm ci
```

Run the dev server:

```bash
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173).

Build production assets:

```bash
npm run build
```

This generates a production bundle in dist/.

Preview the production build locally:

```bash
npm run preview
```

Vite will serve the dist build (defaults to http://localhost:4173).

## Project scripts

- dev: Launch Vite dev server
- build: Type-check (tsc -b) and build with Vite
- preview: Serve the built dist folder

From package.json:

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
- Vite is configured with base: "/shagworm-goldbug-2025/" in vite.config.ts so assets load from the correct subpath.
- The repo includes a GitHub Actions workflow at .github/workflows/pages.yml that:
  - Checks out the repo
  - Uses Node 22
  - Runs npm ci and npm run build
  - Uploads dist and deploys via actions/deploy-pages

Deploys occur on pushes to main.

## Troubleshooting

- 404s for CSS/JS on GitHub Pages: Ensure base in vite.config.ts is "/shagworm-goldbug-2025/" and that the Pages workflow completed successfully.
- Dev server won’t start: Check Node version (use Node 20+), remove node_modules and run npm ci again.
- Preview differs from dev: Use npm run build && npm run preview to test the production output exactly as deployed.
