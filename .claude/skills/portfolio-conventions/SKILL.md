---
name: portfolio-conventions
description: Conventions and style guide for working on the jonathantiritilli.com portfolio site. Use when editing copy, components, styling, or animations in this repository.
---

# Portfolio Conventions

Working notes for the jonathantiritilli.com portfolio. The README in `CLAUDE.md` covers architecture; this is voice, working style, and "don't do that again" rules from prior iterations.

## Voice for site copy

The owner is a Principal Engineer at Domo and is actively allergic to AI-sounding writing. The bar:

- **No em-dashes as conjunctions, asides, or "punchlines."** Use periods or commas. A single em-dash as a real dash (range, attribution) is fine; rhetorical em-dashes are not.
- **No "X, not just Y"** rhetorical contrasts unless the line truly earns it. The current closing line in About uses it once on purpose.
- **No abstract opener sentences.** "the systems underneath everything else" was rejected; "I lead and build the things our developers and customers depend on" was kept. Lead concrete.
- **No filler clichés** — banned phrases observed so far: *"without breaking things"*, *"without paying for it later"*, *"places that don't have clean edges"*, *"move faster"* without an object.
- **Reserved tone.** Don't pump up seniority; state it plainly. *"a Principal Engineer working in business intelligence"* is right; *"a battle-hardened Principal Engineer"* is wrong.
- **First-person, declarative.** "I lead. I build. I step into gaps."
- **Concrete tech surfaces** (ETL, ontology, graph DBs, AI tooling, applications, APIs) show up inside the work, not as a buzzword list.

When in doubt, write three sentences in the user's voice and read them aloud. If any of them sound like a LinkedIn post, rewrite.

## Working style with the user

- **Decisive.** When asked "which option," they pick a number and move on. Don't re-litigate.
- **Iterative on visuals.** Expect "too dark / too subtle / animations too fast / too sticky" as normal feedback. Adjust and reship; don't over-explain.
- **Will reject AI tone in writing on sight.** If they say "this has AI language," strip em-dashes, rhetorical patterns, and abstract toppers — that's the fingerprint.
- **Auto mode is normal.** They expect implementation, not plan-mode pauses, for routine work. Confirmation only for destructive or ambiguous decisions.
- **Short responses preferred.** Lead with the change; trailing summaries should be one sentence at most.

## Architecture rules learned the hard way

1. **`animation-fill-mode: backwards`, not `both`.** When the reveal animation used `both`, the keyframe's end state held over `:hover` button transforms — buttons "lost" their hover lift and color shifts. Never use `forwards` or `both` for reveal animations on elements that have hover states.
2. **Don't nest `[data-reveal]` without an explicit `--reveal-offset`.** Both staggers fire on the same `is-visible` trigger, so an inner grid animates in parallel with the outer heading instead of after it. Pattern that works: outer `[data-reveal]` on heading wrapper, sibling `[data-reveal]` on the grid with `style="--reveal-offset: 420"`. See `Services.astro` and `Portfolio.astro`.
3. **Astro-scoped component styles outrank globals via specificity** (`.foo[data-astro-cid-xxx]` beats `.foo`). When a global rule needs to apply, either keep the conflicting property out of component scope, or use animations (which sit in a different cascade origin) instead of transitions.
4. **Cards and buttons must lock their own colors.** The body color wash flips `--ink`, `--page-fg`, etc. for sections. Card surfaces (service tiles, portfolio cards) and the `.btn` system hardcode their own backgrounds and text colors so they don't flip into illegible combinations on dark stages.
5. **Pause stage updates during programmatic scroll.** Smooth-scrolling through five sections fires a midline crossing for each one, which would cycle the body wash through every intermediate color. The `programmaticScroll` flag in `main.js` plus `body.is-jumping` short-circuits this; the final stage is set once when the jump ends.
6. **Don't use `prefers-color-scheme: dark`.** The site has its own deliberate stage-driven palette. Auto-dark-mode tokens were removed because they conflicted with the wash on dark-mode systems (paper sections rendered dark).
7. **Mandatory CSS scroll-snap fights trackpad inertia.** The site uses JS-driven full-page scroll instead, with explicit wheel/key/touch handlers and a 700ms lock. CSS snap remains disabled.

## Color palette (current — palette E "Bold pops")

| Section | Stage | Background | Text |
|---|---|---|---|
| Hero | `charcoal` | `#1F1D1B` | light |
| Services | `yellow` | `#F2D04C` | ink |
| About | `cobalt` | `#3C5FE3` | white |
| Portfolio | `terracotta` | `#D5664A` | light |
| Contact | `sage` | `#A8C2A0` | ink |

Service tiles: clay `#C8553D`, cobalt `#2D4EF5`, mustard `#D4A93C`. Heads-up: mustard tile blends into the yellow stage; flag this if visual contrast becomes a concern.

## When the user says "show me options"

Format the response as a comparison the user can react to in one keystroke:

- Numbered list, 3–6 options
- Each option: short name, concrete hex/values, one-sentence read on what it gives up vs gains
- End with a one-line recommendation and the question
- Never ship more than one option at once unless asked to A/B

## When asked to add a project to the portfolio

- The grid switches breakpoints at 720px (2 cols) and 1024px (4 cols). Six or eight items lay out cleanly; five or seven create orphans.
- The reveal stagger has indices defined for `:nth-child(1)` through `:nth-child(8)`. If adding a 9th, extend `--reveal-i` mappings in `global.css`.
- "Visit →" CTAs are bottom-aligned via `margin-top: auto` on `.portfolio__cta` (card is a flex column). Preserve this when restructuring cards.
