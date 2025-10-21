# SHAGWORM — Gold Bug 2025 Write-up

Static site for our DEF CON Gold Bug 2025 write-up, styled with a BBS/ANSI vibe. Built with Vite + React + TypeScript, deployed to GitHub Pages.

Live (after merge to main):

- https://cdenicola.github.io/shagworm-goldbug-2025/

## Writeups

Write ups are written in Markdown in the public/ folder. They can be viewed in GitHub markdown or on the website. Changes to the markdown files will update the website. Custom markdown to HTML/CSS conversion is configured `src/puzzle.tsx`.

## Local development

Prereqs:

Node.js 20+ (Actions use Node 22), npm 9+

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

## CI/CD

- GitHub Pages URL: https://cdenicola.github.io/shagworm-goldbug-2025/
- Vite is configured with base: "/shagworm-goldbug-2025/" in vite.config.ts so assets load from the correct subpath.
- The repo includes a GitHub Actions workflow at .github/workflows/pages.yml that:
  - Checks out the repo
  - Uses Node 22
  - Runs npm ci and npm run build
  - Uploads dist and deploys via actions/deploy-pages

Deploys occur on pushes to main.

## Troubleshooting

- 404s for CSS/JS on GitHub Pages: Ensure base in vite.config.ts is "/shagworm-goldbug-2025/" and that the Pages workflow completed successfully.
