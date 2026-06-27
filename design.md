# Portfolio Design

## Identity

Systems & simulation engineer portfolio. Dark, technical, typographically driven.
Aesthetic bridges brutalist simplicity with organic filigree: command-line terminal culture
meets ornamental craftsmanship. 10 theme skins.

## Typography

- **Recursive** (variable font, all axes): primary typeface across all themes
  - MONO axis: proportional body text ↔ monospace code/labels
  - CASL axis: linear (professional) → casual (personality at display sizes)
- **Fraunces**: display headings in artist, forest themes
- **Press Start 2P**: retro theme (1980s amber monitor)
- **Share Tech Mono**: blueprint theme (engineering drawing aesthetic)
- **Righteous**: vaporwave theme (synthwave sunset)

## Theming

10 themes via `data-theme` attribute on `<html>`, stored in `localStorage('mtf-theme')`.
All colors in OKLCH for perceptual uniformity. Each theme defines:
- `--font-*-stack` / `--font-*-settings` for Recursive axis configuration
- Full semantic color palette (background, foreground, card, primary, accent, tile, etc.)
- Theme-specific body backgrounds, tile styles, hover effects, scrollbar styling

Themes: terminal, artist, noir, retro, blueprint, vaporwave, forest, ocean, nord, gruvbox

## Layout

Single-scroll single-column `<main>` at 1600px max-width. Sections flow vertically:
1. **Identity** — boot sequence animation → hero (name, tagline, tags, avatar)
2. **TimelineBand** — chronological project timeline
3. **WorkSection** — featured hero tile + 2×4 project grid + tech stack bar
4. **ConnectSection** — About + Contact tiles
5. **BeyondSection** — Codeforces + GitHub stats tiles

Detail panels are full-screen overlays with Framer Motion shared layout animations (layoutId).

## Animations

- **Framer Motion v12** for all animation
- Page load: boot sequence types out system messages, then hero staggers in per-character
- Scroll reveals: sculpted timing per section using `whileInView` with varied delays and cubic-bezier easing `[0.16, 1, 0.3, 1]`
- Tile hover: 3D rotate + lift with spring physics
- Panel open/close: shared layout animation + book-opening card flip
- Backgrounds: `useAnimationFrame` for Keplerian orbits, LBM particles, simulation visuals
- Parallax: scroll-driven `translateY` on decorative circle elements

## Ornamental System

- **OrnamentFrame**: fixed side bars with gradient dashes + top/bottom rails
- **Filigree overlay**: theme-unique SVG tiling patterns at 8% opacity
- **Grain overlay**: fractal noise texture at 2.5% opacity for atmosphere
- **Section dividers**: seeded SVG sine waves with pathLength animation
- **Corner flourishes**: L-bracket SVGs on tile hover
- **Drop caps**: floating 3em mono letters in detail panels

## Background Components

Each project tile has a unique animated SVG background rendered at runtime:

| Project | Visual |
|---------|--------|
| Astrosis | Keplerian orbital paths with orbiting dots |
| Quip | Terminal text with blinking cursor |
| S-Stream | Lattice grid dots with bouncing particles |
| CJit | DAG commit graph with branch lines |
| EnCrip | Network nodes with traveling data packets |
| CTorrent | Sine wave with peer dots |
| Current | Slot occupancy grid (3×5) |
| Visage | Oscillating frequency bars |
| justLanded | Animated terrain with stars |

## Project Details

All 9 projects represented as tiles. 8 have lazy-loaded detail panels with distinctive
visual identities: orbital decorations (Astrosis), terminal window framing (Quip),
wave ornaments (S-Stream), network graphs (EnCrip/CTorrent), dashboard cards (Visage),
game UI (justLanded), algorithmic layouts (Current).
