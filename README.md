# Play to Understand

A calm one-page home for short interactive educational games.

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
npm run preview
```

## GitHub Pages

This site is fully static.

- If deploying under a repo path (e.g. `https://user.github.io/repo/`), the GitHub Action sets `BASE_PATH="/repo/"`.
- If deploying under a custom domain at root (e.g. `playtounderstand.com`), commit `public/CNAME` and the Action will set `BASE_PATH="/"`.

