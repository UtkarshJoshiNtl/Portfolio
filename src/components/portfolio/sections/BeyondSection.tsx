import { useMemo } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { CodeforcesTile } from "../CodeforcesTile";
import { GithubStatsTile } from "../GithubStatsTile";
import { MusicPlayer } from "../MusicPlayer";
import { GalleryTile } from "../GalleryTile";
import { DoomTile } from "../DoomTile";
import { Tile } from "../Tile";
import { CyclingText } from "../CyclingText";
import { roadmapCycle } from "@/lib/portfolio-data";
import { pack, COL_M, ROW_M, COL_D, ROW_D, type Size } from "@/lib/grid-pack";

const BEYOND_VARIANTS: Record<string, Size[]> = {
  gallery: [
    { w: 2, h: 2 },
    { w: 2, h: 3 },
    { w: 3, h: 2 },
  ],
  cf: [
    { w: 2, h: 1 },
    { w: 2, h: 2 },
  ],
  gh: [
    { w: 2, h: 2 },
    { w: 1, h: 2 },
    { w: 2, h: 1 },
  ],
  music: [
    { w: 2, h: 1 },
    { w: 2, h: 2 },
    { w: 1, h: 2 },
  ],
  roadmap: [
    { w: 2, h: 1 },
    { w: 1, h: 1 },
    { w: 2, h: 2 },
  ],
  doom: [
    { w: 1, h: 1 },
    { w: 2, h: 1 },
  ],
};
const BEYOND_ORDER = ["gallery", "cf", "gh", "music", "roadmap", "doom"];

export function BeyondSection({
  seed,
  onOpenGallery,
  onOpenRoadmap,
  onOpenDoom,
}: {
  seed: number;
  onOpenGallery: () => void;
  onOpenRoadmap: () => void;
  onOpenDoom: () => void;
}) {
  const desktop = useMemo(() => pack(4, BEYOND_ORDER, seed, BEYOND_VARIANTS), [seed]);
  const mobile = useMemo(() => pack(2, BEYOND_ORDER, seed + 7, BEYOND_VARIANTS), [seed]);
  const dMap = Object.fromEntries(desktop.map((p) => [p.key, p]));
  const mMap = Object.fromEntries(mobile.map((p) => [p.key, p]));
  const cls = (k: string) =>
    `${COL_M[mMap[k].w]} ${ROW_M[mMap[k].h]} ${COL_D[dMap[k].w]} ${ROW_D[dMap[k].h]}`;

  return (
    <section className="mt-6 md:mt-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Signals
      </div>
      <LayoutGroup id="beyond">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px] grid-flow-dense"
          style={{ perspective: 1400 }}
        >
          <motion.div
            layout
            key={`${seed}-gallery`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className={cls("gallery")}
          >
            <GalleryTile onOpen={onOpenGallery} />
          </motion.div>

          <motion.div
            layout
            key={`${seed}-cf`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className={cls("cf")}
          >
            <CodeforcesTile />
          </motion.div>

          <motion.div
            layout
            key={`${seed}-gh`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className={cls("gh")}
          >
            <GithubStatsTile />
          </motion.div>

          <motion.div
            layout
            key={`${seed}-music`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className={cls("music")}
          >
            <MusicPlayer />
          </motion.div>

          <motion.div
            layout
            key={`${seed}-roadmap`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className={cls("roadmap")}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Tile
              id="roadmap"
              label="Roadmap"
              onClick={onOpenRoadmap}
              className="h-full bg-pattern-lines"
              bg="bg-tile-alt"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                May → Oct 2026
              </div>
              <div className="mt-auto pb-6">
                <CyclingText
                  items={roadmapCycle}
                  className="text-base md:text-lg font-semibold leading-snug"
                />
              </div>
            </Tile>
          </motion.div>

          <motion.div
            layout
            key={`${seed}-doom`}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className={cls("doom")}
          >
            <DoomTile onOpen={onOpenDoom} />
          </motion.div>
        </div>
      </LayoutGroup>
    </section>
  );
}
