import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Header } from "@/components/portfolio/Header";
import { Tile } from "@/components/portfolio/Tile";
import { CyclingText } from "@/components/portfolio/CyclingText";
import { AstrosisBg } from "@/components/portfolio/AstrosisBg";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { ProjectsPanel } from "@/components/portfolio/panels/ProjectsPanel";
import { RoadmapPanel } from "@/components/portfolio/panels/RoadmapPanel";
import { HobbyPanel } from "@/components/portfolio/panels/HobbyPanel";
import { AboutPanel } from "@/components/portfolio/panels/AboutPanel";
import {
  aboutCycle,
  astrosisCycle,
  hobbyCycle,
  links,
  projectsCycle,
  roadmapCycle,
} from "@/lib/portfolio-data";
import { FileText, Trophy, Github as GithubIcon, Shuffle } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type PanelId = "astrosis" | "projects" | "roadmap" | "hobby" | "about" | null;

type TileKey =
  | "astrosis"
  | "projects"
  | "resume"
  | "roadmap"
  | "hobby"
  | "cf"
  | "gh"
  | "about";

type Size = { w: number; h: number };
type Placed = { key: TileKey; x: number; y: number; w: number; h: number };

const VARIANTS: Record<TileKey, Size[]> = {
  astrosis: [
    { w: 2, h: 2 },
    { w: 2, h: 3 },
    { w: 3, h: 2 },
    { w: 3, h: 3 },
  ],
  projects: [
    { w: 2, h: 1 },
    { w: 2, h: 2 },
    { w: 3, h: 1 },
  ],
  resume: [
    { w: 1, h: 2 },
    { w: 1, h: 1 },
    { w: 2, h: 1 },
  ],
  roadmap: [
    { w: 2, h: 1 },
    { w: 2, h: 2 },
    { w: 1, h: 2 },
  ],
  hobby: [
    { w: 1, h: 2 },
    { w: 2, h: 2 },
    { w: 1, h: 1 },
    { w: 2, h: 1 },
  ],
  cf: [
    { w: 1, h: 1 },
    { w: 2, h: 1 },
    { w: 1, h: 2 },
  ],
  gh: [
    { w: 2, h: 1 },
    { w: 1, h: 1 },
    { w: 2, h: 2 },
  ],
  about: [
    { w: 1, h: 1 },
    { w: 2, h: 1 },
    { w: 1, h: 2 },
  ],
};

const TILE_ORDER: TileKey[] = [
  "astrosis",
  "projects",
  "resume",
  "roadmap",
  "hobby",
  "cf",
  "gh",
  "about",
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pack(cols: number, order: TileKey[], seed: number): Placed[] {
  void seed;

  const grid: (TileKey | null)[][] = [];
  const ensureRow = (y: number) => {
    while (grid.length <= y) grid.push(Array(cols).fill(null));
  };

  const findFirstEmpty = (): { x: number; y: number } => {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] === null) return { x, y };
      }
    }
    ensureRow(grid.length);
    return { x: 0, y: grid.length - 1 };
  };

  const maxWidthFrom = (x: number, y: number): number => {
    let w = 0;
    for (let i = x; i < cols; i++) {
      if (grid[y][i] === null) w++;
      else break;
    }
    return w;
  };

  const canFit = (x: number, y: number, w: number, h: number): boolean => {
    if (x + w > cols) return false;
    for (let dy = 0; dy < h; dy++) {
      ensureRow(y + dy);
      for (let dx = 0; dx < w; dx++) {
        if (grid[y + dy][x + dx] !== null) return false;
      }
    }
    return true;
  };

  const placed: Placed[] = [];

  for (const key of order) {
    const { x, y } = findFirstEmpty();
    const maxW = maxWidthFrom(x, y);
    const variants = shuffle(VARIANTS[key]);

    let chosen: Size | null = null;
    for (const v of variants) {
      const w = Math.min(v.w, maxW);
      const h = v.h;
      if (canFit(x, y, w, h)) {
        chosen = { w, h };
        break;
      }
    }
    if (!chosen) chosen = { w: maxW, h: 1 };

    for (let dy = 0; dy < chosen.h; dy++) {
      ensureRow(y + dy);
      for (let dx = 0; dx < chosen.w; dx++) {
        grid[y + dy][x + dx] = key;
      }
    }
    placed.push({ key, x, y, w: chosen.w, h: chosen.h });
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] !== null) continue;
      const above = y > 0 ? grid[y - 1][x] : null;
      const left = x > 0 ? grid[y][x - 1] : null;
      const target = above ?? left;
      if (!target) continue;
      const p = placed.find(
        (pp) =>
          pp.key === target &&
          x >= pp.x &&
          x < pp.x + pp.w &&
          y >= pp.y &&
          y <= pp.y + pp.h,
      );
      if (p) {
        if (above === target) p.h = Math.max(p.h, y - p.y + 1);
        else p.w = Math.max(p.w, x - p.x + 1);
        grid[y][x] = target;
      }
    }
  }

  return placed;
}

// Static class maps so Tailwind's JIT can detect every used class.
const COL_M: Record<number, string> = { 1: "col-span-1", 2: "col-span-2" };
const ROW_M: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
};
const COL_D: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};
const ROW_D: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
  4: "md:row-span-4",
};

function Index() {
  const [panel, setPanel] = useState<PanelId>(null);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const close = () => setPanel(null);
  const reshuffle = useCallback(
    () => setSeed(Math.floor(Math.random() * 1e9)),
    [],
  );

  const desktopLayout = useMemo(() => pack(4, TILE_ORDER, seed), [seed]);
  const mobileLayout = useMemo(() => pack(2, TILE_ORDER, seed + 1), [seed]);

  const dMap = useMemo(
    () => Object.fromEntries(desktopLayout.map((p) => [p.key, p])) as Record<TileKey, Placed>,
    [desktopLayout],
  );
  const mMap = useMemo(
    () => Object.fromEntries(mobileLayout.map((p) => [p.key, p])) as Record<TileKey, Placed>,
    [mobileLayout],
  );

  const cls = (key: TileKey) => {
    const d = dMap[key];
    const m = mMap[key];
    return `${COL_M[m.w] ?? "col-span-1"} ${ROW_M[m.h] ?? "row-span-1"} ${COL_D[d.w] ?? "md:col-span-1"} ${ROW_D[d.h] ?? "md:row-span-1"}`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
        <div className="flex items-start justify-between gap-4">
          <Header />
          <button
            onClick={reshuffle}
            className="shrink-0 mt-2 inline-flex items-center gap-2 border border-border hover:border-amber hover:text-amber transition-colors px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em]"
            aria-label="Reshuffle tile layout"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Reshuffle
          </button>
        </div>

        <section
          key={seed}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px] grid-flow-dense"
        >
          <div className={cls("astrosis")}>
            <Tile
              id="astrosis"
              label="Astrosis · Featured"
              onClick={() => setPanel("astrosis")}
              className="h-full"
              bg="bg-tile"
            >
              <AstrosisBg />
              <div className="relative z-10 flex flex-col h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                  Featured
                </div>
                <div className="mt-auto pb-6">
                  <CyclingText
                    items={astrosisCycle}
                    className="text-xl md:text-2xl font-semibold leading-snug max-w-md"
                  />
                </div>
              </div>
            </Tile>
          </div>

          <div className={cls("projects")}>
            <Tile
              id="projects"
              label="Projects"
              onClick={() => setPanel("projects")}
              className="h-full"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                5 projects
              </div>
              <div className="mt-auto pb-6">
                <CyclingText
                  items={projectsCycle}
                  interval={2200}
                  className="text-2xl md:text-3xl font-semibold font-mono text-amber"
                />
              </div>
            </Tile>
          </div>

          <div className={cls("resume")}>
            <Tile
              id="resume"
              label="Resume"
              href={links.resume}
              external
              className="h-full border-b-2 border-b-amber"
              bg="bg-tile-alt"
            >
              <FileText className="w-8 h-8 text-amber" />
              <div className="mt-auto pb-6 font-mono text-sm">resume.pdf ↗</div>
            </Tile>
          </div>

          <div className={cls("roadmap")}>
            <Tile
              id="roadmap"
              label="Roadmap"
              onClick={() => setPanel("roadmap")}
              className="h-full"
            >
              <div className="mt-auto pb-6">
                <CyclingText
                  items={roadmapCycle}
                  className="text-base md:text-lg font-semibold leading-snug"
                />
              </div>
            </Tile>
          </div>

          <div className={cls("hobby")}>
            <Tile
              id="hobby"
              label="Hobby Gallery"
              onClick={() => setPanel("hobby")}
              className="h-full"
              bg="bg-tile-purple"
            >
              <div className="mt-auto pb-6">
                <CyclingText
                  items={hobbyCycle}
                  className="text-xl md:text-2xl font-semibold"
                />
              </div>
            </Tile>
          </div>

          <div className={cls("cf")}>
            <Tile
              id="cf"
              label="Codeforces"
              href={links.codeforces}
              external
              className="h-full"
              bg="bg-tile-alt"
            >
              <div className="font-mono text-amber text-sm">Rating: —</div>
              <div className="mt-auto pb-6 font-mono text-[11px] text-muted-foreground leading-relaxed">
                2 contests/week
                <br />
                upsolve everything
              </div>
            </Tile>
          </div>

          <div className={cls("gh")}>
            <Tile
              id="gh"
              label="GitHub"
              href={links.github}
              external
              className="h-full"
            >
              <GithubIcon className="w-6 h-6 text-amber" />
              <div className="mt-auto pb-6 font-mono text-xs md:text-sm break-all">
                UtkarshJoshiNtl
              </div>
            </Tile>
          </div>

          <div className={cls("about")}>
            <Tile
              id="about"
              label="About"
              onClick={() => setPanel("about")}
              className="h-full"
              bg="bg-tile-alt"
            >
              <Trophy className="w-5 h-5 text-amber opacity-0" aria-hidden />
              <div className="mt-auto pb-6">
                <CyclingText
                  items={aboutCycle}
                  className="text-base md:text-lg font-semibold leading-snug"
                />
              </div>
            </Tile>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {panel === "astrosis" && <AstrosisPanel key="astrosis" onClose={close} />}
        {panel === "projects" && <ProjectsPanel key="projects" onClose={close} />}
        {panel === "roadmap" && <RoadmapPanel key="roadmap" onClose={close} />}
        {panel === "hobby" && <HobbyPanel key="hobby" onClose={close} />}
        {panel === "about" && <AboutPanel key="about" onClose={close} />}
      </AnimatePresence>
    </main>
  );
}
