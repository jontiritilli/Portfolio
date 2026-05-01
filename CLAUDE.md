# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site (jonathantiritilli.com) for Jonathan Tiritilli, Principal Engineer at Domo. Built with **Astro 6** (no client framework — Astro emits HTML/CSS plus a small ES-module bundle). Static site, deployed to S3 + CloudFront via GitHub Actions on push to `master`.

## Owner

Jonathan Tiritilli, Principal Engineer at Domo, working in business intelligence. Day-to-day surface area: leading and contributing to enterprise software, applications and APIs, AI tooling, ETL pipelines, graph databases, and ontology models. ~10 years engineering experience total, ~5 in BI. Background before Domo: CMS platforms and large-scale content migrations on small teams. Pitch technical discussion at the principal-engineer level — substance and tradeoffs, not tutorials.

## Working with the owner

Patterns observed across the rebuild — useful to know on first contact:

- **Decisive on options.** When given 3–6 numbered options, expect a number reply. Don't re-litigate.
- **Action over planning.** Auto mode is normal. Implement, don't pre-clear routine work. Confirmation only for destructive or shared-system changes.
- **Iterative on visuals.** Expect feedback like "too dark / too subtle / too fast / too sticky" as a normal part of the loop. Adjust and reship; don't over-explain.
- **Short responses.** Lead with the change. One-sentence trailing summary at most.
- **Will reject AI-sounding writing on sight** — see "Voice for copy" below. That's a hard rule, not a preference.

## Commands

- `npm run dev` — local dev server with HMR (Vite)
- `npm run build` — produces static site in `dist/`
- `npm run preview` — serve the built `dist/` to sanity-check production output

There is no test suite or linter. Verify changes with `npm run build` and a live look in `npm run dev`.

## Project structure

- `src/pages/` — `index.astro` (home, single-page experience) and `404.astro`
- `src/layouts/Base.astro` — `<head>`, all SEO meta (OG / Twitter / JSON-LD Person schema), favicon, theme-color, sitemap link, and the entry point that imports `src/scripts/main.js`
- `src/components/` — one `.astro` file per home-page section: `Hero`, `Services`, `About`, `Portfolio`, `Contact`, `TopButton`. Each section component defines its own `data-stage` attribute and component-scoped styles in `<style>` blocks.
- `src/styles/tokens.css` — design tokens (color, type scale, motion) as CSS custom properties
- `src/styles/global.css` — base reset, typography, utility classes, the `.btn` system, body color-wash transitions, the section-reveal animation system
- `src/scripts/main.js` — vanilla ES module: stage observer, section reveal, full-page scroll, top button, press effect, footer year
- `public/assets/` — fonts and images served at `/assets/...`
- `public/og-image.svg` — OG card design (charcoal + cobalt). **Note**: meta points to `og-image.png`; the SVG must be converted to PNG (1200×630) and saved as `public/og-image.png` for social previews to render.
- `public/robots.txt` — allow-all + sitemap link

## The three big systems

These are the architectural moves that aren't obvious from one file. Read this section before editing the site.

### 1. Color-stage body wash

Each `<section>` declares `data-stage="<name>"`. As the section enters the viewport midline, JS sets `document.body.dataset.stage`, and the body's `background-color` and `color` smoothly transition to that stage's palette (definitions in `global.css` under `body[data-stage="..."]` rules).

- Stages flip text color via `--page-fg`, `--page-fg-soft`, `--page-fg-mute`, and `--page-rule` so headings/eyebrows/rule lines remain legible on dark stages
- Cards (service tiles, portfolio cards) and the `.btn` system are explicitly locked to fixed colors so they don't flip when the body is dark
- Add a stage: define `body[data-stage="newname"]` in `global.css`, then set `data-stage="newname"` on the relevant `<section>`
- During programmatic scroll (top button, multi-section jumps), `body.is-jumping` is added and `setupStageObserver` skips updates so the wash doesn't cycle through every intermediate color. Final stage is set once when the jump ends.

### 2. Full-page scroll layout

On `(min-width: 720px) and (min-height: 640px)` (and not `prefers-reduced-motion`), each `.section` is `min-height: 100vh` and `setupFullpageScroll` intercepts wheel/keyboard/touch input. One wheel tick or arrow press advances exactly one section via `window.scrollTo({ behavior: 'smooth' })`. A 700ms lock prevents cascading through multiple sections from one trackpad swipe. On mobile or with reduced motion, scroll is normal.

### 3. Section reveal animation

When a `.section` reaches 18% viewport intersection, it gains `.is-visible`. Direct children of `[data-reveal]` containers run a `revealUp` keyframe animation (opacity 0→1, translateY 28px→0, 850ms) with a stagger driven by `--reveal-i` (set per `:nth-child` to 0, 140, 280, 420...).

- **`animation-fill-mode: backwards`** (not `both`/`forwards`) — critical, so the animation's end state doesn't override `:hover` transforms on buttons
- **Don't nest `[data-reveal]`** without a `--reveal-offset` on the inner one. Inner staggers fire on the same `is-visible` trigger as outer staggers, so a nested grid would animate in parallel with the heading. The pattern is: outer `[data-reveal]` for heading items, inner `[data-reveal]` (as a sibling, not a child) for the grid with `style="--reveal-offset: 420"` so its cards stagger after the heading finishes. See `Services.astro` and `Portfolio.astro`.
- Honors `prefers-reduced-motion: reduce` (no animation when set)

## Styling conventions

- Use design tokens from `tokens.css` (colors, type scale, spacing, motion) — don't hardcode values. The exception: stage-locked cards/buttons hardcode their own colors so they survive the body wash.
- Buttons: `.btn` is the base; modifiers `.btn--primary` (ink), `.btn--accent` (cobalt), `.btn--icon` (round). The `.is-pressed` class is applied on `pointerdown` by `main.js` — keep press feedback tactile (translate + inset shadow), not color shifts.
- Smooth in-page anchor scrolling is CSS `scroll-behavior: smooth` — no JS needed for `<a href="#…">`.

## Voice for copy

The user is a Principal Engineer who actively rejects AI-sounding copy. When editing text on the site:

- **No em-dashes used as conjunctions or asides.** Use periods or commas.
- **No "X, not just Y" rhetorical pattern** unless the punchline really earns it.
- **No abstract topic sentences** like "the systems underneath everything else" — lead with the concrete.
- **No filler clichés** ("without breaking things", "without paying for it later", "places that don't have clean edges").
- Plain declarative sentences. Reserved tone. Senior engineer voice.
- Concrete tech (ETL, ontology, graph DBs, AI tooling) shows up naturally inside the work, not as a buzzword list.
- See `.claude/skills/portfolio-conventions/SKILL.md` for the longer style guide.

## Deployment

`.github/workflows/deploy.yml` runs on push to `master`:
1. `npm ci && npm run build`
2. Sync hashed assets to S3 with `max-age=31536000, immutable`
3. Sync HTML/XML/TXT to S3 with `max-age=0, must-revalidate`
4. Invalidate CloudFront `/*`

Required configuration (GitHub repo **Variables**, except where noted):
- `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, `AWS_REGION` (defaults `us-east-1`)
- `AWS_DEPLOY_ROLE_ARN` (preferred, OIDC) **or** secrets `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` as fallback

Bucket and distribution IDs may still be stubbed (`REPLACE_WITH_*`) until the user has configured them.

## Third-party integrations

- Contact form posts to Formspree endpoint `xjvbwdqn` (hardcoded in `Contact.astro`) with `_next` redirect back to `https://jonathantiritilli.com`. Update both if the production domain changes.
- No analytics is wired up; the legacy Google Analytics snippet was removed during the Astro migration.

## Outstanding TODOs

- **`og-image.png`** — meta in `Base.astro` points to `/og-image.png` but the file doesn't exist yet. The design source is `public/og-image.svg`; needs a 1200×630 PNG conversion saved next to the SVG before social shares render previews.
- **S3 bucket / CloudFront distribution IDs** in `.github/workflows/deploy.yml` are still placeholder strings (`REPLACE_WITH_BUCKET_NAME`, `REPLACE_WITH_DISTRIBUTION_ID`). Deploys won't succeed until set.
