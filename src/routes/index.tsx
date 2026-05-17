"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Tile } from "@/components/portfolio/Tile";
import { AstrosisBg } from "@/components/portfolio/AstrosisBg";
import { CyclingText } from "@/components/portfolio/CyclingText";
import { usePanel } from "@/components/portfolio/usePanel";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { ProjectsPanel } from "@/components/portfolio/panels/ProjectsPanel";
import { RoadmapPanel } from "@/components/portfolio/panels/RoadmapPanel";
import { HobbyPanel } from "@/components/portfolio/panels/HobbyPanel";
import { AboutPanel } from "@/components/portfolio/panels/AboutPanel";
import {
  astrosisCycle,
  projectsCycle,
  roadmapCycle,
  hobbyCycle,
  aboutCycle,
  links,
} from "@/lib/portfolio-data";
import { computeLayout } from "@/lib/tile-layout";
import type { TileKey } from "@/lib/tile-layout";

export const Route = createFileRoute("/")({
  component: Index,
});

function GridTile({
  seed,
  tileKey,
  id,
  label,
  onClick,
  href,
  external,
  bg,
  children,
  cls,
}: {
  seed: number;
  tileKey: TileKey;
  id?: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  external?: boolean;
  bg: string;
  children: React.ReactNode;
  cls: (key: TileKey) => string;
}) {
  return (
    <motion.div
      layout
      key={`${seed}-${tileKey}`}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className={cls(tileKey)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Tile id={id} label={label} onClick={onClick} href={href} external={external} bg={bg}>
        {children}
      </Tile>
    </motion.div>
  );
}

export function Index() {
  const { active: panel, open, close } = usePanel(null);
  const [seed, setSeed] = useState(0);
  const reshuffle = useCallback(() => setSeed(Math.floor(Math.random() * 1e9) + 1), []);

  const { cls } = useMemo(() => computeLayout(seed), [seed]);

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

        <LayoutGroup>
          <section
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px] grid-flow-dense"
            style={{ perspective: 1400 }}
          >
            <GridTile
              seed={seed}
              tileKey="astrosis"
              id="astrosis"
              label="Astrosis"
              onClick={() => open("astrosis")}
              bg="bg-tile"
              cls={cls}
            >
              <div className="relative h-full w-full">
                <AstrosisBg />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <CyclingText items={astrosisCycle} className="text-xs md:text-sm font-mono" />
                </div>
              </div>
            </GridTile>

            <GridTile
              seed={seed}
              tileKey="projects"
              id="projects"
              label="Projects"
              onClick={() => open("projects")}
              bg="bg-tile"
              cls={cls}
            >
              <CyclingText items={projectsCycle} className="text-xs md:text-sm" />
            </GridTile>

            <GridTile
              seed={seed}
              tileKey="resume"
              label="Resume"
              href={links.resume}
              external
              bg="bg-purple-900/20"
              cls={cls}
            >
              <div className="text-xs md:text-sm">Download PDF</div>
            </GridTile>

            <GridTile
              seed={seed}
              tileKey="roadmap"
              id="roadmap"
              label="Roadmap"
              onClick={() => open("roadmap")}
              bg="bg-tile"
              cls={cls}
            >
              <CyclingText items={roadmapCycle} className="text-xs" />
            </GridTile>

            <GridTile
              seed={seed}
              tileKey="hobby"
              id="hobby"
              label="Hobby"
              onClick={() => open("hobby")}
              bg="bg-amber-950/30"
              cls={cls}
            >
              <CyclingText items={hobbyCycle} className="text-xs md:text-sm" />
            </GridTile>

            <GridTile
              seed={seed}
              tileKey="cf"
              label="Codeforces"
              href={links.codeforces}
              external
              bg="bg-tile"
              cls={cls}
            >
              <div className="text-xs md:text-sm">View Profile</div>
            </GridTile>

            <GridTile
              seed={seed}
              tileKey="gh"
              label="GitHub"
              href={links.github}
              external
              bg="bg-tile"
              cls={cls}
            >
              <div className="text-xs md:text-sm">@UtkarshJoshiNtl</div>
            </GridTile>

            <GridTile
              seed={seed}
              tileKey="about"
              id="about"
              label="About"
              onClick={() => open("about")}
              bg="bg-tile"
              cls={cls}
            >
              <CyclingText items={aboutCycle} className="text-xs" />
            </GridTile>
          </section>
        </LayoutGroup>
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
