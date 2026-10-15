# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on 0.0.0.0:5173 (host binding is for Docker use)
- `npm run build` — `vite build`; this is the only automated check
- `npm run preview` — serve the built `dist/` on 0.0.0.0:4173

There is no test runner, linter, or type checker. The project is **JavaScript only** (`.jsx`/`.js`) by the owner's choice — do not reintroduce TypeScript.

## Architecture

Single-page portfolio (React 18 + Tailwind 3 + Vite). No router or backend. `App.jsx` wraps `HeroSection` and `PortfolioSections` in the single `<main>`, followed by `SiteFooter`.

- **Theming:** `App.jsx` owns `dark`/`light` state (localStorage `portfolio-theme`, falling back to `prefers-color-scheme`), applies it as `data-theme` on the root div, and syncs `<meta name="theme-color">`. All colors are CSS variables in `src/index.css` (`:root` = dark, `[data-theme='light']` overrides); any new themed style needs both. In light mode, small accent text uses olive `--accent-text`; bright lime stays only as a solid fill with dark text.
- **Navigation:** sections and labels live in `src/config/site.js`. `useActiveSection` (IntersectionObserver) drives the active nav link and `aria-current`. Contact details and the résumé path (`/resume.pdf`, served from `public/`) are also in `site.js`.
- **Styling is split three ways:** Tailwind utilities in JSX, hero/header/globe styles in `src/index.css`, and lower-section styles in `src/components/portfolio/portfolio.css`. Labels in `portfolio.css` use `.portfolio-page .x` selectors on purpose, so `.project-copy > p` style rules can't resize them.
- **Hero globe:** `WireframeHorizon.jsx` is a static SVG computed at module load: a sphere with its axis tilted away from the viewer and rolled toward the orbit diagonal, so neither pole is on-screen (a visible pole makes it read as a "canopy"). Grid lines are bucketed into three depth bands (`.globe-depth-0..2`) for the fade toward the limb. Below 1024px the SVG docks to the bottom of the hero so the orbit/waypoint stay clear of the name and CTAs.
- `src/hooks/useGlobeAnimation.js` is an unused three.js + GSAP prototype with known bugs (stale theme closure, no redraw on theme change, geometry that doesn't match the SVG). It is not imported; don't wire it in without fixing those.
- **Project exhibits** (SmartSpecs, CampusOS) are interface mockups built from HTML/SVG with `role="img"`. Project Live/Code links render only when URLs are added to `projectLinks` in `PortfolioSections.jsx`.

## Design constraints (from the owner)

- No images of any kind on the site (no photos, screenshots, raster textures). Visual weight comes from type, layout, code-built UI and vector geometry.
- Keep the approved hero: `BK/` wordmark, glass pill around only the four nav links, two-line name (KALASKAR in lime), role line, two CTAs, left technical rail, hero-only grid, globe cropped bottom-right. Nothing may overlap the name.
- Don't invent facts (metrics, URLs, availability). Fix design problems with structure, not added glow/gradients/decoration.
- `code.html` and `screen.png` are the original design export, for reference only.

## Gotchas

- Headless Chrome on Windows enforces a ~500px minimum window width, so `--window-size=390,...` screenshots are cropped desktop layouts, not mobile. Use DevTools device emulation (`Emulation.setDeviceMetricsOverride`) to check real mobile widths.
- `frontend/` is an empty stray directory; ignore it.
- Git on Windows warns about LF→CRLF conversion; this is harmless.
