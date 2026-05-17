import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import { FileText, Trophy, Github as GithubIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type PanelId = "astrosis" | "projects" | "roadmap" | "hobby" | "about" | null;

function Index() {
  const [panel, setPanel] = useState<PanelId>(null);
  const close = () => setPanel(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
        <Header />

        <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[140px] md:auto-rows-[160px]">
          <>
            {/* Astrosis 2x2 */}
            <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 min-h-[300px]">
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

            {/* Projects 2x1 */}
            <div className="col-span-2 md:col-span-2 min-h-[140px]">
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

            {/* Resume */}
            <Tile
              id="resume"
              label="Resume"
              href={links.resume}
              external
              className="h-full border-b-2 border-b-amber min-h-[140px]"
              bg="bg-tile-alt"
            >
              <FileText className="w-8 h-8 text-amber" />
              <div className="mt-auto pb-6 font-mono text-sm">resume.pdf ↗</div>
            </Tile>

            {/* Roadmap */}
            <Tile
              id="roadmap"
              label="Roadmap"
              onClick={() => setPanel("roadmap")}
              className="h-full min-h-[140px]"
            >
              <div className="mt-auto pb-6">
                <CyclingText
                  items={roadmapCycle}
                  className="text-base md:text-lg font-semibold leading-snug"
                />
              </div>
            </Tile>

            {/* Hobby */}
            <Tile
              id="hobby"
              label="Hobby Gallery"
              onClick={() => setPanel("hobby")}
              className="h-full min-h-[140px]"
              bg="bg-tile-purple"
            >
              <div className="mt-auto pb-6">
                <CyclingText
                  items={hobbyCycle}
                  className="text-xl md:text-2xl font-semibold"
                />
              </div>
            </Tile>

            {/* Codeforces */}
            <Tile
              id="cf"
              label="Codeforces"
              href={links.codeforces}
              external
              className="h-full min-h-[140px]"
              bg="bg-tile-alt"
            >
              <div className="font-mono text-amber text-sm">Rating: —</div>
              <div className="mt-auto pb-6 font-mono text-[11px] text-muted-foreground leading-relaxed">
                2 contests/week
                <br />
                upsolve everything
              </div>
            </Tile>

            {/* GitHub */}
            <Tile
              id="gh"
              label="GitHub"
              href={links.github}
              external
              className="h-full min-h-[140px]"
            >
              <GithubIcon className="w-6 h-6 text-amber" />
              <div className="mt-auto pb-6 font-mono text-xs md:text-sm break-all">
                UtkarshJoshiNtl
              </div>
            </Tile>

            {/* About */}
            <Tile
              id="about"
              label="About"
              onClick={() => setPanel("about")}
              className="h-full min-h-[140px]"
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
