export type TileKey =
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

function seeded(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 0x100000000;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pack(cols: number, order: TileKey[], seed: number): Placed[] {
  const rand = seeded(seed);
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
    const variants = shuffle(VARIANTS[key], rand);

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
        (pp) => pp.key === target && x >= pp.x && x < pp.x + pp.w && y >= pp.y && y <= pp.y + pp.h,
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

export function computeLayout(seed: number) {
  const desktop = pack(4, TILE_ORDER, seed);
  const mobile = pack(2, TILE_ORDER, seed + 1);

  const dMap = Object.fromEntries(desktop.map((p) => [p.key, p])) as Record<TileKey, Placed>;
  const mMap = Object.fromEntries(mobile.map((p) => [p.key, p])) as Record<TileKey, Placed>;

  function cls(key: TileKey): string {
    const d = dMap[key];
    const m = mMap[key];
    return `${COL_M[m.w] ?? "col-span-1"} ${ROW_M[m.h] ?? "row-span-1"} ${COL_D[d.w] ?? "md:col-span-1"} ${ROW_D[d.h] ?? "md:row-span-1"}`;
  }

  return { cls, dMap, mMap, desktop, mobile };
}
