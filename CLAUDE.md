# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio site (jonathantiritilli.com) built with **Astro** (no client framework — Astro emits plain HTML/CSS plus a tiny JS bundle). Output ships to S3 + CloudFront via GitHub Actions on push to `master`.

## Commands

- `npm run dev` — local dev server with HMR
- `npm run build` — produces static site in `dist/`
- `npm run preview` — serve the built `dist/` locally to sanity-check production output

There is no test suite or linter configured. Verify changes by running `npm run build` and previewing.

## Project structure

- `src/pages/` — routes. `index.astro` is home, `404.astro` is the not-found page.
- `src/layouts/Base.astro` — shared `<head>`, global CSS import, and the entry point that imports `src/scripts/main.js` (Astro bundles and hashes it automatically).
- `src/components/` — one `.astro` file per home-page section (`Hero`, `Services`, `About`, `Portfolio`, `Contact`, `Social`, `TopButton`). Component-scoped styles live in `<style>` blocks; global rules and tokens live in `src/styles/`.
- `src/styles/tokens.css` — design tokens (colors, type scale, spacing, motion) as CSS custom properties. Includes a `prefers-color-scheme: dark` override. Add new colors here, not in component styles.
- `src/styles/global.css` — `@font-face` declarations, base reset, typography, utility classes (`.section`, `.container`, `.eyebrow`, `.rule`, `.grid-2`), and the `.btn` system.
- `src/scripts/main.js` — vanilla ES module: top-button visibility, smooth scroll-to-top, `.btn` press effect, footer year.
- `public/assets/` — fonts and images served as-is at `/assets/...`.

## Styling conventions

- Use the design tokens in `tokens.css` rather than literal colors. Section backgrounds: `.section--paper-warm`, `.section--paper-deep`, `.section--ink`.
- Buttons: `.btn` is the base; modifiers are `.btn--primary` (ink), `.btn--accent` (cobalt), `.btn--icon` (round). The `.is-pressed` class is toggled by `main.js` on pointer events; do not animate buttons via background-color shifts on press — keep press feedback tactile (translate + inset shadow).
- Smooth in-page anchor scrolling is handled by CSS `scroll-behavior: smooth` — no JS needed for `<a href="#…">`.
- The site respects `prefers-reduced-motion`; honor it when adding animations.

## Deployment

`.github/workflows/deploy.yml` runs on push to `master`:
1. `npm ci && npm run build`
2. Sync hashed assets to S3 with `max-age=31536000, immutable`
3. Sync HTML/XML/TXT to S3 with `max-age=0, must-revalidate`
4. Invalidate CloudFront `/*`

Required configuration (set in GitHub repo **Variables** unless noted):
- `S3_BUCKET` — target bucket name
- `CLOUDFRONT_DISTRIBUTION_ID` — distribution to invalidate
- `AWS_REGION` (optional, defaults to `us-east-1`)
- `AWS_DEPLOY_ROLE_ARN` (preferred) — IAM role for OIDC auth, **or** secrets `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` as a fallback

The bucket and distribution IDs are currently stubbed (`REPLACE_WITH_*`); the workflow won't deploy successfully until these are set.

## Third-party integrations

- Contact form posts to Formspree endpoint `xjvbwdqn` (hardcoded in `Contact.astro`) with `_next` redirect back to `https://jonathantiritilli.com`. Update both if the production domain changes.
- No analytics is currently wired up; the old GA snippet was removed in the Astro migration.
