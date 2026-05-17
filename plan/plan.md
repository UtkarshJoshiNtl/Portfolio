## Portfolio — Windows 8 Metro UI (Utkarsh Joshi)

Spec is detailed and unambiguous. One implementation pass, no clarifying questions needed.

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
| Astrosis      | big                   | featured, animated SVG bg |
| Projects      | medium                | cycling project names and small description     |
| Resume        | small                 | external link             |
| Roadmap       | tiny                  | cycling                   |
| Hobby Gallery | medium                | amber coloured            |
| Codeforces    | small                 | rating placeholder        |
| GitHub        | medium                | maybe activity            |
| About         | small                 | cycling                   |

### Panel content

- **Astrosis**: title, subtitle, tech tags, description, monospace benchmark table, technical highlights bullets, GitHub button
- **Projects**: 3 project cards (Quip, CuFloda, Cjit) — each with tech row, description, GitHub link
- **Roadmap**: title, mono subtitle, 2×2 rules grid, 4 daily-structure blocks, 7-phase accordion (`@/components/ui/accordion` already in project)
- **Hobby Gallery**: 3D Art section (placeholder image grid with labels) + Music section (track list with link placeholders) + footer note
- **About**: prose paragraphs, location, status

### Motion

- Tile hover: perimeter color loop, with scale
- Panel open: random transitions
- Escape key + X button both call close
- Cycling text: simple `AnimatePresence` fade between strings every 4s

### Astrosis SVG background

Inline SVG with 3 elliptical paths and amber/white dots animated via `<animateMotion>` along each ellipse. Pure SVG, no canvas, no Three.js — keeps grid fast as required. should look like an orbit

### What's explicitly excluded (per your spec)

No navbar, no main footer, no hero animation, no scroll reveals, no glass, no gradients, no particle bg on grid, no contact form, no testimonials, no skill bars.

### Placeholders you'll fill later

- `/resume.pdf` link
- Codeforces API
- Hobby 3D art images + music track links
- other possible pannels/tiles for stuff yet to be planned(Like github stats, Oss contributions, Research paper and blogs and experience)
