## Portfolio — Windows 8 Metro UI (Utkarsh Joshi)

Spec is detailed and unambiguous. One implementation pass, no clarifying questions needed.

### Stack note (important)

You asked for Next.js 14, but this project is **TanStack Start + Vite** (the Lovable template). I will keep the entire functional and visual spec identical and build it on TanStack Start instead of swapping frameworks. Everything else — Tailwind, Framer Motion, fonts, tile behavior, panels, content — matches your spec exactly. Say the word if you'd rather I migrate to Next.js first.

### Design tokens (`src/styles.css`)

- `--background`: `oklch(0.145 0 0)` (#0f0f0f)
- `--foreground`: near-white
- `--accent` (amber): `oklch(0.78 0.16 75)` (≈ #f59e0b)
- `--tile`: `oklch(0.18 0 0)`, `--tile-hover-border`: amber
- `--purple-tint`: subtle dark purple for Hobby tile
- Fonts: JetBrains Mono (labels/code), Inter (body) — loaded via Google Fonts in `__root.tsx` head
- No gradients, no glass, sharp corners (radius 0), flat fills only

### Routes

Single-page app — panels are state, not routes.

- `src/routes/index.tsx` — landing: name block + tile grid + panel overlay layer
- `src/routes/__root.tsx` — fonts, meta (title "Utkarsh Joshi — Systems Engineer", description, viewport)

Resume tile is an external link to `/resume.pdf` (opens new tab, no panel).

### Component breakdown (`src/components/portfolio/`)

- `Header.tsx` — name, role label (mono amber), one-liner, three icon links (GitHub/LinkedIn/Email)
- `TileGrid.tsx` — CSS grid: 4 cols desktop, 2 cols mobile; explicit row/col spans per tile
- `Tile.tsx` — base tile: flat fill, bottom-left mono uppercase label, amber border on hover (no scale), click → opens panel
- `CyclingText.tsx` — 4s interval text rotator for Astrosis/Projects/Roadmap/Hobby/About tiles
- `AstrosisTile.tsx` — tile with lightweight inline SVG of dots on elliptical paths (CSS-animated, no Three.js on grid)
- `PanelShell.tsx` — full-screen Framer Motion panel; animates from clicked tile's bounding rect (layoutId) to fullscreen; X button top-right; Escape closes; locks body scroll; footer "© 2026 Utkarsh Joshi"
- Panel content components: `AstrosisPanel`, `ProjectsPanel`, `RoadmapPanel`, `HobbyPanel`, `AboutPanel`
- `usePanel.ts` — simple state hook (active panel id + originating rect)

### Tile grid layout


| Tile          | Size                  | Notes                     |
| ------------- | --------------------- | ------------------------- |
| Astrosis      | col-span-2 row-span-2 | featured, animated SVG bg |
| Projects      | col-span-2            | cycling project names     |
| Resume        | 1×1                   | external link             |
| Roadmap       | 1×1                   | cycling                   |
| Hobby Gallery | 1×1                   | purple-tinted             |
| Codeforces    | 1×1                   | rating placeholder        |
| GitHub        | 1×1                   | username large mono       |
| About         | 1×1                   | cycling                   |


Mobile: 2 cols, Astrosis becomes 2×2, Projects 2×1, rest 1×1.

### Panel content

- **Astrosis**: title, subtitle, tech tags, description, monospace benchmark table, technical highlights bullets, GitHub button
- **Projects**: 3 project cards (Quip, CuFloda, Cjit) — each with tech row, description, GitHub link
- **Roadmap**: title, mono subtitle, 2×2 rules grid, 4 daily-structure blocks, 7-phase accordion (`@/components/ui/accordion` already in project)
- **Hobby Gallery**: 3D Art section (placeholder image grid with labels) + Music section (track list with link placeholders) + footer note
- **About**: prose paragraphs, location, status

### Motion

- Tile hover: 150ms border color transition only, no scale
- Panel open: Framer Motion `layoutId` shared between tile and panel so it expands from the tile's position; close reverses
- Escape key + X button both call close
- Cycling text: simple `AnimatePresence` fade between strings every 4s

### Astrosis SVG background

Inline SVG with 3 elliptical paths and amber/white dots animated via `<animateMotion>` along each ellipse. Pure SVG, no canvas, no Three.js — keeps grid fast as required.

### What's explicitly excluded (per your spec)

No navbar, no main footer, no hero animation, no scroll reveals, no glass, no gradients, no particle bg on grid, no contact form, no testimonials, no skill bars, no dramatic hover scale.

### Files to create/modify

- modify: `src/routes/__root.tsx` (fonts, meta), `src/styles.css` (tokens), `src/routes/index.tsx` (compose)
- create: `src/components/portfolio/*` (≈10 files listed above), `src/hooks/usePanel.ts`, `src/lib/portfolio-data.ts` (all copy/links/benchmarks in one place for easy editing)
- add dep: `framer-motion`

### Placeholders you'll fill later

- `/resume.pdf` link
- Codeforces rating number
- Hobby 3D art images + music track links