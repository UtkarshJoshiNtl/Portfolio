## 1. Port the repo into this project

The source repo (`utboy-jpg/metro-tile-forge`) is built on the same stack we're already on (TanStack Start + Vite + Tailwind v4 + shadcn). So this is a file-copy port, not a rewrite.

- Fetch every file under `src/` from `raw.githubusercontent.com/utboy-jpg/metro-tile-forge/main/` and write into this project at the same paths (overwriting placeholder `index.tsx`, `styles.css`, etc.). Same for `package.json` deps, `components.json`, and `public/` assets.
- Install any new deps the ported `package.json` introduces (one `bun add` pass).
- Keep our existing `routeTree.gen.ts`, `router.tsx`, `__root.tsx`, `server.ts`, `start.ts` shells — only overwrite where the repo version actually differs.
- Verify the build, fix any import/path issues, confirm the dashboard renders.

## 2. Theme system + "Artist" palette

Today the design tokens live in `src/styles.css` as a single `:root` block. Refactor to a multi-theme system:

- Introduce a `ThemeProvider` (`src/components/theme/ThemeProvider.tsx`) that sets a `data-theme="..."` attribute on `<html>` and persists choice to `localStorage`.
- Convert `:root` tokens into per-theme blocks: `[data-theme="default"] { ... }`, `[data-theme="artist"] { ... }`, plus room for more (`noir`, `terminal` placeholders).
- "Artist / Digital Canvas" palette — bold, saturated, painterly. Direction: off-white canvas background, ink-black foreground, **vivid accents**: cadmium red, ultramarine blue, viridian green, cadmium yellow, magenta. Hand-painted feel: chunky borders, slight tile rotation on hover, halftone/paper-grain texture overlay. Headings get a brush-display font (e.g. Fraunces / Caprasimo), body stays in a clean grotesk.
- Add a **theme switcher** in the header — a small palette icon button that opens a popover with swatch previews of each theme. Switching is instant (CSS-var swap, no reload).

## 3. Declutter the busy tiles

- **CodeforcesTile** — drop secondary clutter (raw lists, redundant labels). Keep: handle, current rating with rank color, max rating, one mini sparkline of recent contests. Move solved-problem detail into the expanded panel only.
- **GithubStatsTile** — the contribution heatmap is the focal point. Strip extra stat rows; keep just total contributions + current streak as captions under the grid. Reduce cell count if it's overflowing (last ~20 weeks, not full year), or scale cell size responsively.
- **TechStackBar / CyclingText** — make the text inside symbols instead and make them smaller

## 4. Doom tile (embedded, real game)

- Add a `DoomTile` component that participates in `grid-pack.ts` and is sized to **fill whatever empty space remains** at the bottom of the tile grid — so the bottom edge becomes a clean straight line (no ragged tail).
- Embed a WASM DOOM port. Plan: use **[js-dos v8](https://js-dos.com/)** (loads DOSBox in the browser via WASM) running a **FreeDOOM** WAD. js-dos is MIT, FreeDOOM is BSD-licensed — both safe to ship.
  - Download `freedoom1.wad` (~12 MB) from the official FreeDOOM GitHub release at build/clone time, place in `public/games/`.
  - Download the js-dos bundle (`js-dos.js`, `wdosbox.wasm`, `dosbox.conf`) into `public/games/jsdos/`.
  - `DoomTile` renders an idle "ENTER THE SLAUGHTERHOUSE" cover; on click it instantiates js-dos pointing at the WAD, captures keyboard, shows fullscreen toggle + mute.
- If js-dos turns out infeasible in the Worker/SSR sandbox (it shouldn't — it's purely client-side, gated behind `useEffect`), the fallback is **doom-wasm** (chocolate-doom compiled to WASM). Either way the deliverable is a real playable game in the tile, not a placeholder.

## 5. Verification

- Visual QA each theme by toggling through the switcher.
- Confirm Codeforces / GitHub / TechStack tiles look calmer side-by-side.
- Confirm DOOM tile loads, plays, and that the grid bottom edge is flat.
- Run typecheck/build before handing back.

## Technical notes

- DOOM embed is fully client-side; the WASM + WAD load only after the user clicks the tile (don't tank initial page weight).
- Keyboard focus trap inside the DOOM canvas while playing so arrow keys don't scroll the page.
- Tile sizing for DOOM uses `grid-pack.ts` with a `flexFill: true` flag — extend the packer to support one fill-remainder tile per row group.
- All new colors go through CSS variables only; no hardcoded hex in components (per design system rules).
- Theme attribute on `<html>` is set pre-hydration via an inline script in `__root.tsx` to avoid FOUC on theme switch.

Files I'll touch / create:

- New: `src/components/theme/{ThemeProvider,ThemeSwitcher}.tsx`, `src/components/portfolio/DoomTile.tsx`, `public/games/...`
- Modified: `src/styles.css` (multi-theme tokens), `src/routes/__root.tsx` (provider + FOUC script), `src/components/portfolio/{Header,CodeforcesTile,GithubStatsTile,TechStackBar,CyclingText}.tsx`, `src/lib/grid-pack.ts`
