# Portfolio

Personal portfolio for [jonathantiritilli.com](https://jonathantiritilli.com) — built with [Astro](https://astro.build), deployed to S3 + CloudFront.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run preview
```

## Structure

- `src/pages/` — routes (`index.astro`, `404.astro`)
- `src/components/` — one component per section
- `src/layouts/Base.astro` — shared shell
- `src/styles/tokens.css` — design tokens (palette, type, spacing)
- `src/styles/global.css` — base styles, utilities, button system
- `src/scripts/main.js` — small vanilla JS for the back-to-top button and press effect
- `public/assets/` — fonts and images

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `master`, syncs `dist/` to S3, and invalidates CloudFront. Configure in repo settings:

- Variables: `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, `AWS_REGION`, `AWS_DEPLOY_ROLE_ARN`
- Or, secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (fallback if no OIDC role)
