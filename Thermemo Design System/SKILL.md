---
name: thermemo-design
description: Use this skill to generate well-branded interfaces and assets for thermemo, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and brand components for prototyping the thermemo receipt-photobooth identity.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files:
- `README.md` — brand context, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — canonical CSS variables and semantic classes.
- `fonts/` — Helvetica.ttf, KaushanScript-Regular.ttf, and the Japanese face (`_____Pr6N_M.otf`, aliased as `Thermemo JP`).
- `assets/` — logo, seal, receipt-strip and torn-edge SVGs.
- `slides/` — the 16-slide brand guideline deck (uses `deck-stage.js`).
- `preview/` — small specimen cards for type, color, components, brand.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. Always link `colors_and_type.css` and use the CSS variables (`--rice-paper`, `--ink-black`, `--cedar-brown`, `--stone-gray`) instead of hex literals.

If working on production code, copy the assets and translate the CSS variables into your framework's token system. Treat the 55 / 30 / 10 / 5 color ratio, the lowercase brand wordmark, and the verbatim tagline ("Proof that this moment happened.") as non-negotiable.

If the user invokes this skill without any other guidance, ask them what they want to build — a slide, a social asset, a receipt design, a webpage — then ask 4–6 short clarifying questions and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Hard rules to follow at all times:
- The brand wordmark is **always lowercase**: `thermemo`.
- The tagline is **verbatim**: *Proof that this moment happened.*
- No emoji in marketing copy. No gradients. No color photography.
- Two fonts per layout, max.
- 10% margin minimum on every slide / page edge.
- Cedar Brown is an accent, never a background fill.
