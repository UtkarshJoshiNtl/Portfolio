"use client";

import { useCallback, type ComponentProps } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  Box,
  Code2,
  FileText,
  Github,
  Map,
  Mail,
  Linkedin,
  Wrench,
  Trophy,
  Waves,
} from "lucide-react";
import { Tile } from "@/components/portfolio/Tile";
import { AstrosisBg } from "@/components/portfolio/AstrosisBg";
import { CyclingText } from "@/components/portfolio/CyclingText";
import { usePanel } from "@/components/portfolio/usePanel";
import { GitHubCalendar } from "@/components/portfolio/GitHubCalendar";
import { CodeforcesRating } from "@/components/portfolio/CodeforcesRating";
import { MusicPlayer } from "@/components/portfolio/MusicPlayer";
import { GallerySlideshow } from "@/components/portfolio/GallerySlideshow";
import { DoomGame } from "@/components/portfolio/DoomGame";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { ProjectsPanel } from "@/components/portfolio/panels/ProjectsPanel";
import { RoadmapPanel } from "@/components/portfolio/panels/RoadmapPanel";
import { ContactPanel } from "@/components/portfolio/panels/ContactPanel";
import { IdentityPanel } from "@/components/portfolio/panels/IdentityPanel";
import {
  astrosisCycle,
  identityCopy,
  links,
  projects,
  roadmapCycle,
  toolboxCycle,
} from "@/lib/portfolio-data";

function MetroTile({
  className,
  children,
  ...tileProps
}: ComponentProps<typeof Tile> & { className: string }) {
  return (
    <motion.div
      layout
      className={className}
      transition={{ type: "spring", stiffness: 360, damping: 34 }}
    >
      <Tile {...tileProps}>{children}</Tile>
    </motion.div>
  );
}

const projectIcons = [Box, Code2, Waves] as const;
const projectColors = ["bg-metro-graphite", "bg-metro-red", "bg-metro-green"] as const;

type PanelKey = "astrosis" | "projects" | "roadmap" | "contact" | "identity";

export default function Index() {
  const { active: panel, open, close } = usePanel(null);

  const openPanel = useCallback(
    (id: PanelKey) => {
      open(id);
    },
    [open],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-[92rem] mx-auto px-4 md:px-8 py-6 md:py-10">
        <LayoutGroup>
          <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3 auto-rows-[106px] md:auto-rows-[118px]">
            <MetroTile
              id="identity"
              label="Utkarsh Joshi"
              onClick={() => openPanel("identity")}
              bg="bg-gradient-to-br from-metro-cobalt via-metro-teal to-metro-violet"
              className="col-span-2 row-span-3 md:col-span-3 md:row-span-3"
            >
              <div className="flex h-full flex-col justify-between pb-8">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 mb-4">
                    Software Engineer
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
                    {identityCopy.title}
                  </h1>
                  <p className="mt-3 max-w-lg text-base md:text-lg text-white/90 font-medium">
                    {identityCopy.tagline}
                  </p>
                </div>
                <div>
                  <p className="max-w-lg text-xs md:text-sm text-white/70 leading-relaxed">
                    {identityCopy.body}
                  </p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {["GPU", "CUDA", "C++", "Systems"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-[11px] font-mono uppercase tracking-[0.1em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </MetroTile>

            <MetroTile
              label="Email"
              href={`mailto:${links.email}`}
              external
              bg="bg-metro-orange"
              className="col-span-1 row-span-1"
            >
              <Mail className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                Get in touch
              </div>
            </MetroTile>

            <MetroTile
              label="LinkedIn"
              href={links.linkedin}
              external
              bg="bg-metro-cobalt"
              className="col-span-1 row-span-1"
            >
              <Linkedin className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                Connect
              </div>
            </MetroTile>

            <MetroTile
              label="Resume"
              href={links.resume}
              external
              bg="bg-metro-purple"
              className="col-span-1 row-span-1"
            >
              <FileText className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                Download
              </div>
            </MetroTile>

            <MetroTile
              label="Toolbox"
              bg="bg-metro-graphite"
              className="col-span-1 row-span-2 md:col-span-1 xl:col-span-3 xl:row-span-1"
              asButton={false}
            >
              <Wrench className="h-5 w-5 text-white/70" />
              <CyclingText
                items={toolboxCycle}
                className="mt-auto pb-8 text-xs md:text-sm font-mono text-white/85"
              />
            </MetroTile>

            <MetroTile
              id="astrosis"
              label="Astrosis"
              onClick={() => openPanel("astrosis")}
              bg="bg-metro-teal"
              className="col-span-2 row-span-2 md:col-span-3 md:row-span-2 xl:col-span-3 xl:row-span-2"
            >
              <div className="relative h-full w-full">
                <AstrosisBg />
                <div className="relative z-10 flex h-full flex-col justify-between pb-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                    Featured project
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-semibold">Astrosis</div>
                    <CyclingText
                      items={astrosisCycle}
                      className="mt-3 text-xs md:text-sm font-mono text-white/85"
                    />
                  </div>
                </div>
              </div>
            </MetroTile>

            {projects.map((project, index) => {
              const Icon = projectIcons[index] ?? Box;
              return (
                <MetroTile
                  key={project.name}
                  label={project.name}
                  onClick={() => openPanel("projects")}
                  bg={projectColors[index] ?? "bg-metro-graphite"}
                  className="col-span-1 row-span-1 xl:col-span-2"
                >
                  <Icon className="h-6 w-6" />
                  <div className="mt-auto pb-8">
                    <div className="text-lg md:text-xl font-semibold leading-none">{project.name}</div>
                    <div className="mt-2 line-clamp-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                      {project.tech.slice(0, 3).join(" / ")}
                    </div>
                  </div>
                </MetroTile>
              );
            })}

            <MetroTile
              label="GitHub"
              href={links.github}
              external
              bg="bg-metro-graphite"
              className="col-span-2 row-span-2 md:col-span-3 md:row-span-2 xl:col-span-3 xl:row-span-2"
            >
              <Github className="h-5 w-5 mb-1 opacity-70 shrink-0" />
              <div className="flex-1 min-h-0 w-full">
                <GitHubCalendar />
              </div>
            </MetroTile>

            <MetroTile
              label="Codeforces"
              href={links.codeforces}
              external
              bg="bg-metro-violet"
              className="col-span-1 row-span-1"
            >
              <div className="flex flex-col gap-2 w-full h-full">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-white/75">
                    BakedRajma
                  </span>
                </div>
                <CodeforcesRating username="BakedRajma" />
              </div>
            </MetroTile>

            <MetroTile
              id="doom"
              label="Doom"
              bg="bg-gradient-to-br from-red-900 to-black"
              className="col-span-1 row-span-1"
              asButton={false}
            >
              <DoomGame />
            </MetroTile>

            <MetroTile
              id="roadmap"
              label="Roadmap"
              onClick={() => openPanel("roadmap")}
              bg="bg-metro-graphite"
              className="col-span-2 row-span-1 md:col-span-2 xl:col-span-2"
            >
              <Map className="h-6 w-6" />
              <CyclingText
                items={roadmapCycle}
                className="mt-auto pb-8 text-lg md:text-2xl font-semibold"
              />
            </MetroTile>

            <MetroTile
              id="gallery"
              label="Gallery"
              bg="bg-gradient-to-br from-cyan-600 to-blue-700"
              className="col-span-1 row-span-2 md:col-span-2 md:row-span-2 relative overflow-hidden"
              asButton={false}
            >
              <GallerySlideshow />
            </MetroTile>

            <MetroTile
              id="music"
              label="Music"
              bg="bg-gradient-to-br from-pink-600 to-rose-700"
              className="col-span-1 row-span-2"
              asButton={false}
            >
              <MusicPlayer />
            </MetroTile>

            <MetroTile
              id="contact"
              label="Contact"
              onClick={() => openPanel("contact")}
              bg="bg-metro-amber"
              className="col-span-1 row-span-1"
            >
              <Mail className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/85">
                Message
              </div>
            </MetroTile>
          </section>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {panel === "identity" && <IdentityPanel key="identity" onClose={close} />}
        {panel === "astrosis" && <AstrosisPanel key="astrosis" onClose={close} />}
        {panel === "projects" && <ProjectsPanel key="projects" onClose={close} />}
        {panel === "roadmap" && <RoadmapPanel key="roadmap" onClose={close} />}
        {panel === "contact" && <ContactPanel key="contact" onClose={close} />}
      </AnimatePresence>
    </main>
  );
}
