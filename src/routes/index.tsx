"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  Box,
  Code2,
  Cpu,
  FileText,
  Github,
  Info,
  Mail,
  Map,
  Palette,
  Trophy,
  Waves,
  Linkedin,
  BookOpen,
  Sparkles,
  Music,
} from "lucide-react";
import { Tile } from "@/components/portfolio/Tile";
import { AstrosisBg } from "@/components/portfolio/AstrosisBg";
import { CyclingText } from "@/components/portfolio/CyclingText";
import { usePanel } from "@/components/portfolio/usePanel";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { ProjectsPanel } from "@/components/portfolio/panels/ProjectsPanel";
import { RoadmapPanel } from "@/components/portfolio/panels/RoadmapPanel";
import { AboutPanel } from "@/components/portfolio/panels/AboutPanel";
import { ContactPanel } from "@/components/portfolio/panels/ContactPanel";
import { BlogPanel } from "@/components/portfolio/panels/BlogPanel";
import { IdentityPanel } from "@/components/portfolio/panels/IdentityPanel";
import { Art3DPanel } from "@/components/portfolio/panels/Art3DPanel";
import { MusicPanel } from "@/components/portfolio/panels/MusicPanel";
import { astrosisCycle, identityCopy, links, projects, roadmapCycle } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  component: Index,
});

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

function MetricTile({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className: string;
}) {
  return (
    <MetroTile label={label} bg="bg-metro-amber" className={className}>
      <div className="text-3xl md:text-4xl font-semibold leading-none">{value}</div>
      <div className="mt-2 max-w-[10rem] font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">
        {label}
      </div>
    </MetroTile>
  );
}

export function Index() {
  const { active: panel, open, close } = usePanel(null);

  const openPanel = useCallback(
    (
      id:
        | "astrosis"
        | "projects"
        | "roadmap"
        | "about"
        | "contact"
        | "blog"
        | "identity"
        | "art3d"
        | "music",
    ) => {
      open(id);
    },
    [open],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-[92rem] mx-auto px-4 md:px-8 py-6 md:py-10">
        <LayoutGroup>
          <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3 auto-rows-[106px] md:auto-rows-[118px] grid-flow-dense">
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
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-[11px] font-mono uppercase tracking-[0.1em]">
                      GPU
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-[11px] font-mono uppercase tracking-[0.1em]">
                      CUDA
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-[11px] font-mono uppercase tracking-[0.1em]">
                      C++
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-[11px] font-mono uppercase tracking-[0.1em]">
                      Systems
                    </span>
                  </div>
                </div>
              </div>
            </MetroTile>

            <MetroTile
              id="astrosis"
              label="Astrosis"
              onClick={() => openPanel("astrosis")}
              bg="bg-metro-teal"
              className="col-span-2 row-span-3 md:col-span-3 md:row-span-3"
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
                    <div className="mt-4 grid grid-cols-3 gap-1.5 md:hidden font-mono text-[10px]">
                      <span className="bg-black/20 px-2 py-1">507x</span>
                      <span className="bg-black/20 px-2 py-1">83x</span>
                      <span className="bg-black/20 px-2 py-1">CUDA</span>
                    </div>
                  </div>
                </div>
              </div>
            </MetroTile>

            <MetricTile
              value="507x"
              label="Batch speedup"
              className="hidden md:block md:col-span-1 md:row-span-1"
            />
            <MetricTile
              value="83x"
              label="CUDA detection"
              className="hidden md:block md:col-span-1 md:row-span-1"
            />

            {projects.map((project, index) => {
              const icons = [Box, Code2, Waves] as const;
              const colors = ["bg-metro-graphite", "bg-metro-red", "bg-metro-green"];
              const Icon = icons[index] ?? Box;
              return (
                <MetroTile
                  key={project.name}
                  label={project.name}
                  onClick={() => openPanel("projects")}
                  bg={colors[index] ?? "bg-metro-graphite"}
                  className={
                    index === 0
                      ? "col-span-2 row-span-1 md:col-span-2 md:row-span-1"
                      : "col-span-1 row-span-1 md:col-span-2 md:row-span-1"
                  }
                >
                  <Icon className="h-6 w-6" />
                  <div className="mt-auto pb-8">
                    <div className="text-lg md:text-2xl font-semibold leading-none">
                      {project.name}
                    </div>
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
              className="col-span-1 row-span-1"
            >
              <Github className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                repos
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
                profile
              </div>
            </MetroTile>

            <MetroTile
              label="Resume"
              href={links.resume}
              external
              bg="bg-metro-red"
              className="col-span-1 row-span-1"
            >
              <FileText className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                PDF
              </div>
            </MetroTile>

            <MetroTile
              label="Codeforces"
              href={links.codeforces}
              external
              bg="bg-metro-violet"
              className="col-span-1 row-span-1"
            >
              <Trophy className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                contests
              </div>
            </MetroTile>

            <MetroTile
              label="Contact"
              onClick={() => openPanel("contact")}
              bg="bg-metro-green"
              className="col-span-1 row-span-1"
            >
              <Mail className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75">
                Get in touch
              </div>
            </MetroTile>

            <MetroTile
              id="about"
              label="About"
              onClick={() => openPanel("about")}
              bg="bg-metro-teal"
              className="col-span-1 row-span-1 md:col-span-2 md:row-span-1"
            >
              <Info className="h-6 w-6" />
              <div className="mt-auto pb-8 text-sm md:text-lg font-semibold">
                Cool technical projects, built seriously.
              </div>
            </MetroTile>

            <MetroTile
              id="blog"
              label="Blog"
              onClick={() => openPanel("blog")}
              bg="bg-metro-amber"
              className="col-span-1 row-span-1"
            >
              <BookOpen className="h-6 w-6" />
              <div className="mt-auto pb-8 font-mono text-[10px] uppercase tracking-[0.12em] text-white/85">
                Writing
              </div>
            </MetroTile>

            <MetroTile
              id="art3d"
              label="3D Art"
              onClick={() => openPanel("art3d")}
              bg="bg-gradient-to-br from-cyan-600 to-blue-700"
              className="col-span-1 row-span-2 md:col-span-2 md:row-span-2"
            >
              <motion.div
                className="h-full flex flex-col justify-between"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-cyan-200" />
                <div className="pb-8">
                  <div className="text-xl md:text-2xl font-bold text-cyan-50">3D Art</div>
                  <div className="mt-2 text-xs md:text-sm font-mono text-cyan-100/70">
                    Graphics & visualization
                  </div>
                </div>
              </motion.div>
            </MetroTile>

            <MetroTile
              id="music"
              label="Music"
              onClick={() => openPanel("music")}
              bg="bg-gradient-to-br from-pink-600 to-rose-700"
              className="col-span-1 row-span-2 md:col-span-2 md:row-span-2"
            >
              <motion.div
                className="h-full flex flex-col justify-between"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Music className="h-6 w-6 text-pink-200" />
                <div className="pb-8">
                  <div className="text-xl md:text-2xl font-bold text-pink-50">Music</div>
                  <div className="mt-2 text-xs md:text-sm font-mono text-pink-100/70">
                    Sound & audio
                  </div>
                </div>
              </motion.div>
            </MetroTile>

            <MetroTile
              id="roadmap"
              label="Roadmap"
              onClick={() => openPanel("roadmap")}
              bg="bg-metro-graphite"
              className="col-span-2 row-span-1 md:col-span-2 md:row-span-1"
            >
              <Map className="h-6 w-6" />
              <CyclingText
                items={roadmapCycle}
                className="mt-auto pb-8 text-lg md:text-2xl font-semibold"
              />
            </MetroTile>
          </section>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {panel === "identity" && <IdentityPanel key="identity" onClose={close} />}
        {panel === "astrosis" && <AstrosisPanel key="astrosis" onClose={close} />}
        {panel === "projects" && <ProjectsPanel key="projects" onClose={close} />}
        {panel === "roadmap" && <RoadmapPanel key="roadmap" onClose={close} />}
        {panel === "about" && <AboutPanel key="about" onClose={close} />}
        {panel === "contact" && <ContactPanel key="contact" onClose={close} />}
        {panel === "blog" && <BlogPanel key="blog" onClose={close} />}
        {panel === "art3d" && <Art3DPanel key="art3d" onClose={close} />}
        {panel === "music" && <MusicPanel key="music" onClose={close} />}
      </AnimatePresence>
    </main>
  );
}
