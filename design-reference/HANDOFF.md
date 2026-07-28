# Handoff: Anastasia Buialo — portfolio site

## Overview
A bilingual (English / Norwegian) personal portfolio for a UX and product designer in Oslo.
Typography is the entire visual language — there is no decorative imagery in the main
site; images appear only inside case studies and the handmade/visual-work section.

Three pages:

| Page | File | Purpose |
| --- | --- | --- |
| Home | `Anastasia Buialo - Portfolio v2.dc.html` | Hero, Method, Selected work (accordions + index), Experience, About, Visual work, Contact |
| Case | `FinAut Portal.dc.html` | FinAut authorisation portal — UX evaluation (2026) |
| Case | `Otovo Solar Planner.dc.html` | Otovo Solar Planner — self-checkout for residential solar (2023) |

## Target: what to build
**Static HTML on GitHub Pages**, served from this repo. No framework, no build step.
Astro is the intended upgrade path later (if a blog or CMS is added) — keep the markup
component-shaped so that migration is mechanical, but do not introduce it now.

Deliverables:
1. `index.html`, `finaut.html`, `otovo-solar-planner.html` (+ `assets/`) — plain HTML/CSS/JS.
2. A GitHub Pages deployment (branch `main`, `/` root, or `gh-pages` — your call).
3. `CNAME` if a custom domain is added later (the owner is considering `anastasiab.design`).

## About the design files
The bundled `.dc.html` files are **design references**, not production code. They are
authored in a proprietary component runtime (`<x-dc>` template + a `class Component
extends DCLogic` script, loaded by `support.js`) that will not exist in the target repo.

**The task is to recreate these designs as standalone static HTML**, preserving the exact
visual result. Concretely:

- Everything inside `<x-dc>…</x-dc>` is the markup. Strip the `<x-dc>` wrapper.
- `<helmet>…</helmet>` holds the `<link>` tags and the one `<style>` block — move its
  contents into `<head>`.
- `<sc-if value="{{ isEN }}">…</sc-if>` / `{{ isNO }}` are the two language versions of
  the whole page. Keep both in the DOM and toggle with a class/attribute, or split into
  `/en/` and `/no/` routes — your judgement (see *Language* below).
- `{{ handler }}` in an attribute is an event handler defined in the logic class at the
  bottom of the file; `{{ value }}` in text is a computed value. All of them are listed
  under *State and behaviour* below — the logic is small.
- `style-hover="…"`, `style-active="…"` compile to CSS pseudo-classes: rewrite as
  `:hover` / `:active` rules.
- Inline styles are an artifact of the authoring tool. **Convert them to a stylesheet**
  with the token set below; do not ship thousands of inline style attributes.

## Fidelity
**High fidelity.** Colours, type scale, spacing and interactions are final. Recreate them
exactly. The case-study *content* will be edited later by the owner, so keep case pages
easy to edit (semantic sections, no clever abstractions over the copy).

## Language
The site is fully bilingual. Every string exists in EN and NO. The toggle is in the header
(`EN` / `NO`), it switches the whole site, and the choice persists in
`localStorage['ab-portfolio-lang']` so it carries across pages.

Recommended for static: render both language blocks and toggle visibility, exactly as the
design does. If you prefer `/` and `/no/` routes for SEO, that is acceptable — but the
toggle must preserve the current page and the persisted preference.

## Theme
Light and dark, toggled in the header (lowercase `light` / `dark` labels), persisted in
`localStorage['ab-portfolio-theme']`, applied as `document.body.dataset.theme = 'dark'`.
Default is **light**. Both themes are WCAG-AA checked; do not "improve" the palettes.

## Design tokens

CSS custom properties, defined on `:root` (light) and `body[data-theme="dark"]`:

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#d6d6d2` | `#030712` | page background |
| `--ink` | `#17171b` | `#f9fafb` | headings, primary text |
| `--big` | `#2b2c30` | `#e5e7eb` | large lead paragraphs |
| `--body` | `#212226` | `#d1d5db` | body copy |
| `--sub` | `#34353b` | `#9ca3af` | secondary copy |
| `--mut` | `#3f4046` | `#9ca3af` | captions, footnotes |
| `--acc` | `#4338ca` | `#818cf8` | accent: labels, numerals, arrows |
| `--acc2` | `#4f46e5` | `#a5b4fc` | accent hover / emphasis figures |
| `--acc3` | `#3730a3` | `#c7d2fe` | project tags |
| `--line` | `rgba(0,0,0,.14)` | `rgba(255,255,255,.12)` | toggle borders |
| `--line2` | `rgba(0,0,0,.16)` | `rgba(255,255,255,.08)` | section boundaries, header |
| `--line3` | `rgba(0,0,0,.18)` | `rgba(255,255,255,.10)` | all list/row dividers |
| `--line4` | `rgba(0,0,0,.40)` | `rgba(255,255,255,.55)` | interactive outlines (buttons) |
| `--wash` | `rgba(0,0,0,.02)` | `rgba(255,255,255,.02)` | row hover fill |
| `--header-bg` | `rgba(214,214,210,.88)` | `rgba(3,7,18,.85)` | sticky header (with `backdrop-filter: blur(12px)`) |
| `--dot`, `--dot2`, `--dot3` | `rgba(23,23,27,.45/.38/.30)` | `rgba(129,140,248,.55/.45/.35)` | dither dot patterns |
| `--img-line` | `rgba(79,70,229,.28)` | `rgba(129,140,248,.25)` | image borders |
| `--glow` | `rgba(67,56,202,.45)` | `rgba(129,140,248,.35)` | button shadow on hover |

**Divider rule (important):** `--line2` = section boundaries and header only;
`--line3` = every list/row divider; `--line4` = interactive outlines only, never a divider.

### Typography
Two families, no others:

- **Futura**, falling back to **Jost** (Google Fonts) — all headings, all uppercase labels,
  numerals, buttons in the toggles, the wordmark.
  `font-family: 'Futura', 'Jost', sans-serif`
- **Suisse Int'l**, falling back to **Switzer** (Fontshare) — all body copy.
  `font-family: 'Suisse Intl', 'Suisse Int\'l', 'Switzer', sans-serif`
  (Suisse Int'l is licensed; the site currently relies on it being installed locally and
  falls back to Switzer. If a licence is bought, self-host it; otherwise Switzer is the
  shipped face.)
- **Thornskull** — a display face designed by the owner, self-hosted from
  `assets/Thornskull-Regular.otf`, used only for the Thornskull specimen in Visual work.

Font links currently in use:
```html
<link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500&display=swap" rel="stylesheet">
```
Self-hosting both is preferred for GitHub Pages (no third-party requests, no FOUT).

**Type scale** (fixed sizes — there are only four; do not add more):

| Size | Weight | Tracking | Use |
| --- | --- | --- | --- |
| 12px | 500 | 0.18em (0.22em on the hero/section kicker) | uppercase labels, kickers, section names |
| 14px | 400 | normal (0.02em on project tags) | metadata, captions, footnotes, years |
| 18px | 400 | normal | body copy, list items, buttons, nav |
| 22px | 400 | normal | lead paragraphs, pull quotes |

**Display sizes** (fluid, `clamp(min, vw, max)`):

| Element | Value |
| --- | --- |
| Home h1 | `clamp(52px, 7.5vw, 112px)`, weight 500, `line-height: 1.02`, `letter-spacing: -0.02em` (NO version uses `line-height: 1.18` — the Norwegian string has ascender/descender collisions at 1.02) |
| Contact h2, case h1 | `clamp(44px, 6.4vw, 92px)` – `clamp(48px, 7vw, 104px)`, weight 500, `-0.02em` |
| Section h2 | `clamp(32px, 4vw, 56px)`, weight 500, `-0.01em` |
| Case-study h3 (accordion titles) | `clamp(28px, 3.4vw, 48px)`, weight 500, `-0.01em` |
| Sub-section h2 | `clamp(24px, 3vw, 36px)`, weight 500 |
| Emphasis figures (+40%, 13) | `clamp(36px, 4.4vw, 60px)` – `clamp(44px, 5vw, 72px)`, Futura, weight 500, `--acc2` |

Line heights: 1.02–1.15 for display, 1.4–1.6 for body (`1.6` for 18px, `1.45–1.5` for 22px).
Only **two weights exist in the whole site: 400 and 500.** Never introduce 600/700.

### Spacing
Section padding `clamp(56px, 9vw, 100px)` vertical; page container `max-width: 1040px`
with `padding: 0 clamp(16px, 4vw, 32px)`. Row padding 20–36px. Grid gaps 12/16/24/32/40/48.
Measure caps: body `max-width: 62ch`, leads `44–46ch`.

### Radii and elevation
- Buttons and toggles: `border-radius: 999px` (pills).
- Images: `border-radius: 4px` with a 1px `--img-line` border.
- No shadows anywhere except button hover (`transform: translateY(-3px)`), and the
  header's `backdrop-filter: blur(12px)`.

### Texture
A fixed full-viewport film-grain overlay via `body::after` (inline SVG `feTurbulence`,
`opacity: .35`, `mix-blend-mode: multiply`; dark mode uses `opacity: .8`, `overlay`, and a
light noise matrix). `z-index: 2147483647`, `pointer-events: none`. Copy it verbatim from
the source — it is what stops the flat-CSS feel.
Dither bands (radial-gradient dot patterns with a linear-gradient mask) appear above the
contact heading and as section transitions.

## Screens

### Home — `Anastasia Buialo - Portfolio v2.dc.html`
Sticky header → Hero → Method → Selected work → Experience → About → Visual work → Contact.

1. **Header** — sticky, `--header-bg` + blur, 1px `--line2` bottom border. Left: wordmark
   ("Anastasia Buialo", Futura 14px/500, `letter-spacing: .04em`, `white-space: nowrap`).
   Right: nav (Method, Work, About, Contact — 18px, `--sub`, hover `--acc2`), then two pill
   toggles: EN/NO and light/dark. Active toggle segment = `--ink` fill, `--bg` text.
2. **Hero** — kicker "Anastasia Buialo / UX- and Product Designer, Oslo" (12px, `--acc`,
   uppercase, .22em), h1 with the last phrase in italic accent, a 22px sub-paragraph, and a
   4-row meta list (Experience 8 years · Based in Oslo, Norway · Recognition UX Nordic Award
   finalist · Focus Insights · Conceptualisation · Flows) as `flex; justify-content:
   space-between` rows with `--line3` dividers.
3. **Method** — h2 + kicker, a full-width 22px tagline, then four steps (01 Hypothesis,
   02 Testing, 03 Insight, 04 Adjustment) in `repeat(auto-fit, minmax(min(100%,180px),1fr))`.
4. **Selected work** — an NDA note, then four accordions (FinAut 2026, c)optikk 2025,
   KORUS 2025, Otovo – Solar Planner 2023). Header row: numeral (`--acc`) / title + subtitle
   / year + `+`|`−` glyph; hover fills `--wash`, shifts the title 10px, tints it `--acc2`.
   **All start collapsed.** Expanded body: a description + bullets + (FinAut, Otovo) an
   outlined pill "Read the full case →" linking to the case page; right column holds Role,
   the emphasis figure where there is one, and tag chips (14px, `--acc3`).
   Below: **More projects** — a 6-row index table (name / description / year), `--line3` rows.
5. **Experience** — four labelled rows (Roles, Education, Certifications, Recognition),
   label left (12px uppercase, 220px column), list right. Stacks below ~540px.
6. **About** — portrait (`assets/avatar.png`, 260px square, no border) beside two paragraphs
   + Languages, then the four skills rows (Design, Research & insight, Tools & AI, Ways of
   working) with items separated by accent middots.
7. **Visual work** — Thornskull (giant live specimen in the Thornskull face, a 4-step
   process strip, photos) and Rave collective (identity board, textures, wordmark), then
   "And everything else made by hand" with six greyscale photos and the pro-bono footnote.
8. **Contact** — dither band, huge h2, then the segmented email control (address link +
   divider + Copy button), LinkedIn and Netlife pills; footer line with © , the visuals
   credit and "Oslo, Norway".

### Case pages — FinAut, Otovo
Same header (back-link wordmark instead of nav), hero (kicker · h1 · 22px summary), then a
single section of labelled rows: Problem / Research / diagnosis / From insight to design /
Concept or Solution / Learnings. Otovo puts three emphasis figures under the hero image.
Both end with the NDA note and a "← All work" pill.

## State and behaviour
The entire site needs four pieces of state:

```js
lang    // 'en' | 'no'  — localStorage 'ab-portfolio-lang', default 'en'
theme   // 'light' | 'dark' — localStorage 'ab-portfolio-theme', default 'light',
        // applied as document.body.dataset.theme
open[]  // which case accordions are expanded — all false on load
copied  // true for 2s after the Copy button writes the email to the clipboard
```

- **Copy button**: `navigator.clipboard.writeText('anastasia.buialo@gmail.com')`, falls back
  to a hidden `<textarea>` + `execCommand('copy')`. Label swaps to "Copied!" / "Kopiert!"
  for 2 seconds.
- **Accordion**: click the header row to toggle. Make the header a `<button>` with
  `aria-expanded` in the rebuild (the design uses a div with onClick — fix this).
- **Nav links** are same-page anchors with `scroll-margin-top: 80px` and
  `scroll-behavior: smooth` under `prefers-reduced-motion: no-preference`.

## Interactions
- Transitions are 0.2–0.25s on `color`, `background`, `border-color`, `transform`.
- Button hover: border → `--acc`, text → `--acc2`, `translateY(-3px)`.
- Accordion row hover: background `--wash`, title `translateX(10px)` + `--acc2`.
- Nothing that is not clickable has a hover state — keep it that way.
- `:focus-visible` → `2px solid var(--acc)`, `outline-offset: 3px`, `border-radius: 4px`.

## Responsive
Single fluid layout, no media queries in the source — everything uses `clamp()`,
`flex-wrap` and `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`. Verify at 390px, 768px,
1024px and 1440px. Known constraints to preserve:
- Label/content rows must stack (they are `flex-wrap` with a 220px label and `flex: 1 1 320px` content).
- Pills use `white-space: nowrap` so the trailing ↗ / → never wraps.
- The six side-work photos wrap at a 110px minimum.

## Accessibility
Already handled in the design; keep it: WCAG-AA contrast in both themes, visible focus
rings, `prefers-reduced-motion` respected, 44px+ touch targets on all pills.
To fix during the rebuild: accordion headers should be real buttons with `aria-expanded`,
the toggles should be `role="group"` with `aria-pressed`, and each language block should
carry the right `lang` attribute (`lang="en"` / `lang="no"`).

## Assets
All in `assets/` (copied into this bundle):

- `avatar.png` — hand-drawn portrait, used in About and as the favicon.
- `Thornskull-Regular.otf` — the owner's own display typeface (self-hosted).
- `thornskull-*.jpg/png` — paper-cut process photos and the alphabet specimen.
- `drk-*.png`, `ork-board.png`, `ork-textures.png`, `ref-*.png` — rave-collective identity
  work and its references.
- `finaut-*` — FinAut case: journey map, insight board, today's portal, two concepts.
- `otovo-*` — Otovo case: journey map, user stories, insight board, workshop, final flow.
- `pigeon.jpg`, `ramen.jpg`, `bird-sketches.png`, `ink-brush.png`, `opera-fjord.jpg`,
  `skateboard.jpg` — the side-work strip (rendered greyscale via CSS `filter`).

All photography and illustration is by Anastasia Buialo; the footer credits this and the
credit line must survive the rebuild.

## Content notes
- Case-study copy will be edited after launch — keep it in plain, obvious markup.
- Some case material is under NDA; the "some data is anonymised" note appears on the work
  section and both case pages and must not be dropped.
- Norwegian is bokmål throughout.

## Files in this bundle
- `Anastasia Buialo - Portfolio v2.dc.html` — home
- `FinAut Portal.dc.html` — FinAut case
- `Otovo Solar Planner.dc.html` — Otovo case
- `support.js` — the authoring runtime, **for reference only; do not ship it**
- `assets/` — all images and the Thornskull font
