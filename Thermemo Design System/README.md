# thermemo — Design System

> *Proof that this moment happened.*

**thermemo** is a receipt photobooth brand. It prints small thermal receipts as keepsakes — fragments of a moment instead of a glossy print. The brand sits at the intersection of **thermal** (instant, physical, casual) and **memento** (intimate, collected, quiet). The Japanese seal **記ノ片** (*ki-no-kata*, "piece of memory") anchors the visual identity.

This project is the master design system. It contains brand foundations, the visual language, a 16-slide brand guideline deck, and reusable assets for any future thermemo artifact.

## Provided sources

- `uploads/Logo Thermemo.png` — primary logo: torn-receipt mark with hand-drawn 記ノ片 seal in the lower-right corner.

There was no codebase, Figma, or product UI attached. The system below is built strictly from the written brief plus the supplied logo. UI kits for product surfaces are **not included** — there are no product surfaces yet. When the product (booth UI, web ordering, instagram templates, etc.) is real, we'll add `ui_kits/<surface>/` folders.

---

## Contents

| Path | What it is |
|---|---|
| `README.md` | This file — brand context, content + visual foundations, iconography |
| `colors_and_type.css` | All foundation tokens as CSS variables + semantic classes |
| `SKILL.md` | Agent Skills front-matter for re-using this system |
| `assets/` | Logo, seal, brand marks, motif graphics |
| `fonts/` | Local font notes (Helvetica substitution flagged) |
| `preview/` | Small design-system cards (type, color, components) shown in the Design System tab |
| `slides/` | The 16-slide brand guideline deck |

---

## CONTENT FUNDAMENTALS

**Voice in one sentence:** quiet, warm, reflective. Like a handwritten note tucked behind a polaroid — short, low-key, never selling hard.

### Tone
- **Reflective, not promotional.** Don't pitch the product; describe the feeling.
- **Soft-spoken.** No exclamation marks, no "amazing/incredible/revolutionary."
- **Memory-led.** Lead with the moment, the keepsake, the proof — never with features.
- **Bilingual is fine.** Indonesia–English mixing is part of the voice; pick one register per section and stick to it.

### Casing
- The brand name is **always lowercase**: `thermemo` — even mid-paragraph. Only capitalised at the start of a sentence, and even then designers prefer to recast the sentence.
- Section labels and stamp text are **ALL CAPS with generous letter-spacing** (`0.22em`), mimicking the look of receipt printed metadata (DATE · TIME · NO. 0042).
- Headlines stay in sentence case.

### Person
- Address the reader as *kamu* (Indonesian) or **you** (English) — never plural "we/our customers". Always one-to-one.
- The brand voice itself is mostly invisible — first person is rare. Prefer object-led statements ("a small proof", "this moment") over "we made…".

### Length
- One idea per line. Two sentences is a paragraph. Three is too many.
- Captions on Instagram or receipts: 5–12 words.
- Slide body copy: under 25 words per slide whenever possible.

### Tagline & key phrases
- **Tagline (verbatim, never paraphrased):** *Proof that this moment happened.*
- **Brand equation:** *Thermal + Memento = Thermemo*
- **Seal name:** 記ノ片 (*ki-no-kata*) — "fragment of memory"
- **Indonesian voice samples:** *"struk kecil, kenangan besar"* · *"momen yang gak hilang di kamera roll"* · *"bukti bahwa itu nyata"*

### What we don't do
- ❌ No emoji in marketing copy. Period. (The closest we get is the ✓ / ✗ in guidelines.)
- ❌ No "Hey gorgeous!" or chirpy CTA voice.
- ❌ No buzzwords: *revolutionize, game-changer, next-level, vibe-coded, era-defining*.
- ❌ No ALL-CAPS shouting for emphasis. Use letter-spacing or the Kaushan accent script instead.

### Examples

> ✓ "satu strip. satu malam. bukti."
> ✓ "kenangan kecil yang disimpan karena punya nilai personal."
> ✓ *Proof that this moment happened.*

> ✗ "Capture EPIC memories with thermemo's revolutionary receipt photobooth! 📸✨"
> ✗ "Don't miss out — book your booth today!"

---

## VISUAL FOUNDATIONS

The brand visual language sits between three influences: **Japanese wabi-sabi minimalism** (negative space, paper, seals), **thermal receipt aesthetics** (perforated edges, monospaced metadata, faded ink), and **muji-style retail calm** (very few colors, lots of room to breathe).

### Color
- **Rice Paper `#F7F4EE`** — the default background. Warm, slightly creamy, never white. Carries ~55% of any composition.
- **Ink Black `#111111`** — body text, dark covers. Not pure black — that's too cold. Carries ~30%.
- **Cedar Brown `#553125`** — accent only. Seal stamps, highlights, CTA underlines. Never a background block, never a large area fill. ~10%.
- **Stone Gray `#DCD8D1`** — hairline dividers, ghost borders, low-contrast secondary marks. ~5%.

Tokens in `colors_and_type.css`. The 55/30/10/5 ratio is a soft target, not a rule — but if a layout exceeds 15% cedar brown coverage, it's wrong.

### Type
- **Display & Functional:** Helvetica Neue / Helvetica. Tight, lowercase, sometimes oversized at the slide-cover scale (96px+). No quirky weights — Regular and Bold cover everything.
- **Accent:** Kaushan Script — used sparingly for handwritten warmth (a tagline, a phrase, a slide intro). Never for body, never for labels.
- **Japanese / Stamp:** Noto Serif JP, for 記ノ片 and any kanji that appears as a seal. Treated as a graphic, not as language.
- **Max two type families per layout.** A slide can be (Helvetica + Kaushan) or (Helvetica + Noto Serif JP), but not all three.

### Spacing & layout
- **Slide margin minimum 10% on every side.** Air is the design.
- **Max 1–2 visual elements per slide.** If you need more, split the slide.
- **8-px grid** for component spacing; **32-px gutter** for slide grids.
- Body copy column width: 45–65 characters. Never edge-to-edge.

### Backgrounds & textures
- Two background modes: **Rice Paper light** (all content slides) and **Ink Black dark** (cover, closing, optional dividers).
- A subtle paper-grain texture is allowed at very low opacity (≤ 8%). Avoid heavy paper textures — it tips into "wedding invitation."
- **No gradients.** No images as background fills. No glass / blur effects.

### Borders & dividers
- **Hairline (1px) Stone Gray** — default divider between sections.
- **0.5pt dashed Ink at 50% opacity** — receipt-style divider. Used for "tear here" moments.
- **No drop shadows** on UI elements other than physical receipt mockups (where a soft, low shadow is fine: `0 12px 30px -22px rgba(17,17,17,0.5)`).

### Corners
- **2–4px** for cards and inputs. The brand has a flat, paper-ish feel — `border-radius: 0` is fine. `border-radius: 16px` would be wrong.
- **Pill / 999px** only for seal stamps and round stickers.

### Imagery
- **Monochrome only.** Three flavours: pure B&W, warm sepia, high-contrast B&W. No color photography.
- **Photobooth-strip vertical crop** is the canonical aspect ratio for any portrait imagery (roughly 2:5).
- **Grain is welcome.** A light film-grain layer adds warmth. Avoid digital-clean.

### Motion
- Brand is mostly static. When motion is used:
  - Fades only (200–400ms).
  - Easing: `cubic-bezier(0.32, 0.72, 0, 1)` (gentle decel).
  - No bounce, no parallax, no scroll-jacking.
- The one signature animation: a thermal-print **reveal**, where lines of content appear top-to-bottom like a receipt being printed (50–80ms stagger).

### Hover / press states
- Hover: **Cedar Brown** appears as an underline or a 1px ink stroke. Never a fill change. Cursor stays default.
- Press: 96% scale + 80ms ease-out. No color change.
- Disabled: opacity 0.4, no pointer.

### Cards
- Background: Rice Paper or pure white.
- Border: 1px Stone Gray.
- Radius: 2–4px.
- Shadow: none, unless emulating a physical receipt (see `--shadow-receipt`).
- Padding: 24px minimum.

### Transparency & blur
- Used almost never. Allowed only at the 50% ink-on-paper level for dividers, or for a watermark stamp at 8–14% opacity.

### Recurring motifs
- **Torn-paper edge** — used as a section break or asset frame.
- **記ノ片 seal** — corner watermark on every brand artifact.
- **Receipt strip frame** — vertical container for showcase imagery.
- **Stamp/badge** — round, Cedar Brown ink, used for callouts.
- **Dashed perforation line** — divides slide regions.

---

## ICONOGRAPHY

thermemo has **no proprietary icon library**. The brand is intentionally icon-light — most communication is type, photo, and stamp. When iconography is needed:

- **Primary approach:** **stamps & seals**, not pictograms. A circle with letter-spaced text in Cedar Brown beats a UI icon every time. Examples: `· LIMITED ·`, `NO. 0042`, `記`.
- **Secondary approach:** **Lucide** (linked from CDN, [lucide.dev](https://lucide.dev)) for any utility icon that genuinely is a UI affordance — chevrons, close, copy, share, download. Stroke 1.5, currentColor (Ink Black), 20px default. This is a **substitution** — flagged for the user. If thermemo later defines an in-house set, replace.
- **Emoji:** **never** in product or marketing copy. ✓ and ✗ are allowed inside guideline tables only, treated as glyphs, never colored emoji.
- **Unicode glyphs as icons:** the bullet `·`, en-dash `–`, and the seal characters `記` / `片` are part of the brand's iconography vocabulary. Use them.
- **SVGs:** the logo, the torn-paper edge, and the seal are PNG/SVG assets in `/assets`. Keep custom illustration to those forms — don't draw new glyph-icons.

Files in `/assets`:
- `logo-thermemo.png` — primary lockup (torn receipt + 記ノ片 seal).
- `seal-kinokata.svg` — standalone round seal mark.
- `receipt-strip.svg` — vertical receipt frame for imagery.
- `torn-edge.svg` — torn-paper section divider.

---

## Fonts

All three brand fonts are loaded locally from `/fonts/`:

| Family in CSS | File | Role |
|---|---|---|
| `Helvetica` | `fonts/Helvetica.ttf` | Primary / functional |
| `Kaushan Script` | `fonts/KaushanScript-Regular.ttf` | Accent / handwritten |
| `Thermemo JP` | `fonts/_____Pr6N_M.otf` | Japanese / stamp (記ノ片) |

The `Thermemo JP` alias is internal — it points at the uploaded Japanese face so we don't have to chase its exact metadata name. If the JP source is replaced, swap the file at the same path and the alias will follow.

---

## How to use this system

- For a **new artifact** (slide, social post, mock), start by linking `colors_and_type.css` and importing the relevant cards from `/preview` as visual reference.
- For **production code**, treat the CSS variables in `colors_and_type.css` as canonical and translate them to your framework's token system.
- For **prototyping flows or screens**, build under `ui_kits/<surface>/` and follow the section composition rules above.

