# README design notes (internal)

Patterns extracted 2026-07-05 from top-starred READMEs (supabase/supabase,
excalidraw/excalidraw, charmbracelet/vhs, astral-sh/uv, appwrite/appwrite),
and how SoulDrop applies them.

## What the best repos actually do

1. **Centered hero block** — `<p align="center">` / `<div align="center">`
   with the logo image first, then title, tagline, badges. Excalidraw wraps
   the hero in an `<a>` to the product; supabase and uv use
   `<picture><source media="(prefers-color-scheme: dark)">` for dark/light
   logo swap (supabase's older `#gh-dark-mode-only` fragment trick is
   deprecated — `<picture>` is the current pattern).
2. **Badge row directly under the tagline** — img.shields.io, each badge an
   `<img>` wrapped in an anchor. uv links CI + version + license; excalidraw
   adds `PRs-welcome`. Flat/flat-square styles read cleanest.
3. **Demo media immediately after badges** — vhs leads with an animated GIF
   before any prose ("show, don't tell"); excalidraw uses a `<figure>` with
   caption. Motion above the fold is the single biggest "alive" signal.
4. **Quickstart as the first real section** — vhs: install command → tiny
   example → output preview. uv: highlights list, then per-capability
   sections each with a `console` block.
5. **Translation links near the top** — appwrite puts the language switcher
   right after the badges (supabase buries 40+ at the bottom — worse).
6. **Footer identity** — vhs closes with a brand badge + bilingual tagline;
   uv closes with license + centered brand mark.

## SoulDrop decisions

- Hero: centered `<picture>` logo (dark/light variants) → H1 → EN+VI tagline
  → 6-badge row (CI, version, license, platform, languages, PRs-welcome,
  flat-square, graphite label `#20242C`, amber `#E8B04B` / teal `#2FD6C3`) →
  language switcher (kept, promoted into the hero) → **animated SVG demo**.
- All image assets are self-backgrounded graphite cards, so they render
  identically on GitHub light and dark themes (belt) — and the logo still
  ships dark/light variants via `<picture>` (suspenders).
- `assets/demo.svg` animates with CSS keyframes inside the SVG — GitHub
  serves it through camo as an `<img>`, where CSS/SMIL animation plays but
  scripts and external resources do not. So: system font stacks only, and
  `textLength` on typed lines so the typewriter wipe aligns on any
  platform's monospace font. ~18 s loop with a hold before restart.
- Section headers get one emoji each (uv/appwrite style), no inline SVG
  icons — keeps the markdown source clean and diffable.
- Translated prose untouched; only presentation (hero, badges, media,
  section icons, footer) changed. Version stays 0.4.0.
