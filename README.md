# Internship Task 2 – Strict Tech Stack Implementation

## Chosen Stack
- Templating Engine: **Nunjucks**
- Bundler / Task Runner: **Gulp**

## Project Structure
```
src/
  templates/
    layouts/
      base.njk
    pages/
      index.njk
  assets/
    css/
      main.scss
    js/
    images/
  static/
dist/ (generated)
```

## Prerequisites
- Node.js 18+

## Setup
```bash
npm install
```

## Development
- Start dev server with live-reload:
```bash
npm run dev
```
This builds to `dist/` and serves it locally.

## Build
```bash
npm run build
```
Outputs compiled HTML/CSS/JS into `dist/`.

## Notes
- Edit templates in `src/templates/` (`.njk`).
- Styles live in `src/assets/css/main.scss`.
- Static files (favicons, robots.txt, etc.) go in `src/static/`.
- The compiled HTML for the recreated Internship Task Document is at `dist/index.html`.

## Hosting Guidance (per requirements)
- Do not club tasks. Create a separate repository and separate live link for each task.
- For this Task 2, you can deploy the `dist/` folder to any static host (GitHub Pages, Netlify, Vercel). Ensure it is a separate repo and URL from Task 1.
