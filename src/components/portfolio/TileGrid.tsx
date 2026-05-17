import { Tile } from "./Tile";
import { AstrosisBg } from "./AstrosisBg";
import { CyclingText } from "./CyclingText";
import { links } from "@/lib/portfolio-data";
import {
  astrosisCycle,
  projectsCycle,
  roadmapCycle,
  hobbyCycle,
  aboutCycle,
} from "@/lib/portfolio-data";
import type { PanelId } from "./usePanel";

type TileGridProps = {
  open: (id: Exclude<PanelId, null>, origin?: Element | null) => void;
};

export function TileGrid({ open }: TileGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px] grid-flow-dense">
      {/* Astrosis - Big (2x2) */}
      <Tile
        id="astrosis"
        label="Astrosis"
        onClick={() => open("astrosis")}
        className="md:col-span-2 md:row-span-2"
      >
        <div className="relative h-full w-full">
          <AstrosisBg />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <CyclingText items={astrosisCycle} className="text-xs md:text-sm font-mono" />
          </div>
        </div>
      </Tile>

      {/* Projects - Tall (1x2) */}
      <Tile
        id="projects"
        label="Projects"
        onClick={() => open("projects")}
        className="md:row-span-2"
      >
        <CyclingText items={projectsCycle} className="text-xs md:text-sm" />
      </Tile>

      {/* Resume - Small (1x1) */}
      <Tile label="Resume" href={links.resume} external className="bg-purple-900/20">
        <div className="text-xs md:text-sm">Download PDF</div>
      </Tile>

      {/* Roadmap - Small (1x1) */}
      <Tile id="roadmap" label="Roadmap" onClick={() => open("roadmap")}>
        <CyclingText items={roadmapCycle} className="text-xs" />
      </Tile>

      {/* Hobby Gallery - Wide (2x1) */}
      <Tile
        id="hobby"
        label="Hobby"
        onClick={() => open("hobby")}
        className="md:col-span-2 bg-amber-950/30"
      >
        <CyclingText items={hobbyCycle} className="text-xs md:text-sm" />
      </Tile>

      {/* Codeforces - Small (1x1) */}
      <Tile label="Codeforces" href={links.codeforces} external>
        <div className="text-xs md:text-sm">View Profile</div>
      </Tile>

      {/* GitHub - Tall (1x2) */}
      <Tile label="GitHub" href={links.github} external className="md:row-span-2">
        <div className="text-xs md:text-sm">@UtkarshJoshiNtl</div>
      </Tile>

      {/* About - Small (1x1) */}
      <Tile id="about" label="About" onClick={() => open("about")}>
        <CyclingText items={aboutCycle} className="text-xs" />
      </Tile>
    </div>
  );
}
