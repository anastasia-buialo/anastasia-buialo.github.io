# Anastasia Buialo — portfolio

Bilingual (EN / NO), light/dark, typography-driven portfolio for a UX & product
designer in Oslo. Plain static HTML/CSS/JS — no framework, no build step.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, method, selected work, experience, about, visual work, contact |
| `finaut.html` | Case — FinAut authorisation portal (UX evaluation, 2026) |
| `otovo-solar-planner.html` | Case — Otovo Solar Planner (2023) |
| `styles.css` | Design system: tokens (light/dark), typography, all component styles |
| `app.js` | Language + theme toggles, accordions, copy-to-clipboard |
| `assets/` | Images + the self-hosted Thornskull display font |
| `design-reference/` | Original `.dc.html` design files + handoff spec (not served) |

## Behaviour

- **Language** EN/NO — both rendered in the DOM, toggled by class; persisted in
  `localStorage['ab-portfolio-lang']` (default `en`). Each block carries `lang`.
- **Theme** light/dark — `document.body.dataset.theme`, persisted in
  `localStorage['ab-portfolio-theme']` (default `light`). An inline snippet sets
  it before first paint to avoid a flash.
- **Accordions** are real `<button>`s with `aria-expanded`; panels use `[hidden]`.
- **Toggles** are `role="group"` with `aria-pressed`.

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy — GitHub Pages

This repo is Pages-ready (`.nojekyll` included). From the repo root:

```sh
# 1. create the repo on GitHub (public) and push
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main

# 2. enable Pages: repo Settings → Pages → Source: "Deploy from a branch",
#    Branch: main, folder: / (root). Save.
```

Site will be at `https://<you>.github.io/<repo>/`. For a user site, name the repo
`<you>.github.io` and it serves at the root domain.

### Custom domain (optional)

For `anastasiab.design`, add a `CNAME` file containing the domain, point the DNS
`A`/`CNAME` records at GitHub Pages, and set the domain under Settings → Pages.

## Fonts

Headings use **Futura** (falls back to **Jost**, loaded from Google Fonts); body
uses **Suisse Int'l** (falls back to **Switzer**, loaded from Fontshare). Both
Futura and Suisse rely on being installed locally, otherwise the fallbacks ship.
To drop the two third-party requests, self-host Jost and Switzer under `assets/`
and swap the `<link>` tags for `@font-face` rules. **Thornskull** (the display
specimen in Visual work) is already self-hosted from `assets/`.
