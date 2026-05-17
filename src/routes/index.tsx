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
  Volume2,
  VolumeX,
  Waves,
  Linkedin,
  BookOpen,
} from "lucide-react";
import { Tile } from "@/components/portfolio/Tile";
import { AstrosisBg } from "@/components/portfolio/AstrosisBg";
import { CyclingText } from "@/components/portfolio/CyclingText";
import { usePanel } from "@/components/portfolio/usePanel";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { ProjectsPanel } from "@/components/portfolio/panels/ProjectsPanel";
import { RoadmapPanel } from "@/components/portfolio/panels/RoadmapPanel";
import { HobbyPanel } from "@/components/portfolio/panels/HobbyPanel";
import { AboutPanel } from "@/components/portfolio/panels/AboutPanel";
import { ContactPanel } from "@/components/portfolio/panels/ContactPanel";
import { BlogPanel } from "@/components/portfolio/panels/BlogPanel";
import {
  astrosisCycle,
  hobbyCycle,
  identityCopy,
  links,
  projects,
  roadmapCycle,
  toolboxCycle,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  component: Index,
});

type TileTone = "click" | "slide";

function useMetroSound() {
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);

  const play = useCallback(
    (tone: TileTone = "click") => {
      if (muted || typeof window === "undefined") return;

      const AudioContextCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;

      const context = contextRef.current ?? new AudioContextCtor();
      contextRef.current = context;
      setReady(true);

      void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(tone === "slide" ? 340 : 520, now);
      oscillator.frequency.exponentialRampToValueAtTime(tone === "slide" ? 260 : 390, now + 0.08);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(tone === "slide" ? 0.028 : 0.022, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.14);
    },
    [muted],
  );

  return {
    muted,
    ready,
    toggleMuted: () => setMuted((value) => !value),
    play,
  };
}

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

function GroupLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`col-span-2 md:col-span-4 xl:col-span-6 mt-4 first:mt-0 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55 ${className}`}
    >
      {children}
    </div>
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
  const { muted, ready, toggleMuted, play } = useMetroSound();

  const handleInteractiveClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;
      if (target.closest("button,a")) play("click");
    },
    [play],
  );

  const openPanel = useCallback(
    (id: "astrosis" | "projects" | "roadmap" | "hobby" | "about" | "contact" | "blog") => {
      play("slide");
      open(id);
    },
    [open, play],
  );

  return (
    <main
      className="min-h-screen bg-background text-foreground"
      onClickCapture={handleInteractiveClick}
    >
      <div className="max-w-[92rem] mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55">
            Metro board / technical portfolio
          </div>
          <button
            onClick={toggleMuted}
            className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-metro-graphite text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={muted ? "Unmute tile sounds" : "Mute tile sounds"}
            title={
              ready ? (muted ? "Unmute sounds" : "Mute sounds") : "Sounds start after first click"
            }
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        <LayoutGroup>
          <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3 auto-rows-[106px] md:auto-rows-[118px] grid-flow-dense">
            <GroupLabel>Featured</GroupLabel>

            <MetroTile
              label="Identity"
              bg="bg-metro-cobalt"
              className="col-span-2 row-span-2 md:col-span-2 md:row-span-2"
            >
              <div className="flex h-full flex-col justify-between pb-8">
                <div>
                  <h1 className="text-3xl md:text-5xl font-semibold leading-none">
                    {identityCopy.title}
                  </h1>
                  <p className="mt-3 max-w-md text-sm md:text-base text-white/85">
                    {identityCopy.tagline}
                  </p>
                </div>
                <p className="max-w-md text-xs md:text-sm text-white/75">{identityCopy.body}</p>
              </div>
            </MetroTile>

            <MetroTile
              id="astrosis"
              label="Astrosis"
              onClick={() => openPanel("astrosis")}
              bg="bg-metro-teal"
              className="col-span-2 row-span-2 md:col-span-2 md:row-span-2"
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

            <MetroTile
              label="CUDA"
              bg="bg-metro-violet"
              className="hidden md:block md:col-span-1 md:row-span-1"
            >
              <Cpu className="h-7 w-7" />
              <div className="mt-auto pb-8 font-mono text-xs uppercase tracking-[0.12em] text-white/85">
                GPU experiments
              </div>
            </MetroTile>

            <MetroTile
              label="C++"
              bg="bg-metro-green"
              className="hidden md:block md:col-span-1 md:row-span-1"
            >
              <Code2 className="h-7 w-7" />
              <div className="mt-auto pb-8 font-mono text-xs uppercase tracking-[0.12em] text-white/85">
                Systems code
              </div>
            </MetroTile>

            <GroupLabel>Projects</GroupLabel>

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
              label="Toolbox"
              bg="bg-metro-cobalt"
              className="col-span-2 row-span-1 md:col-span-4 md:row-span-1"
            >
              <div className="flex h-full items-center gap-4 pb-5">
                <Cpu className="hidden h-9 w-9 shrink-0 md:block" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                    Toolbox
                  </div>
                  <CyclingText
                    items={toolboxCycle}
                    className="mt-1 text-lg md:text-3xl font-semibold"
                  />
                </div>
              </div>
            </MetroTile>

            <GroupLabel>Signal</GroupLabel>

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

            <GroupLabel>Personal</GroupLabel>

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
              id="hobby"
              label="Hobby"
              onClick={() => openPanel("hobby")}
              bg="bg-metro-red"
              className="col-span-1 row-span-1"
            >
              <Palette className="h-6 w-6" />
              <CyclingText items={hobbyCycle} className="mt-auto pb-8 text-sm font-semibold" />
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
        {panel === "astrosis" && <AstrosisPanel key="astrosis" onClose={close} />}
        {panel === "projects" && <ProjectsPanel key="projects" onClose={close} />}
        {panel === "roadmap" && <RoadmapPanel key="roadmap" onClose={close} />}
        {panel === "hobby" && <HobbyPanel key="hobby" onClose={close} />}
        {panel === "about" && <AboutPanel key="about" onClose={close} />}
        {panel === "contact" && <ContactPanel key="contact" onClose={close} />}
        {panel === "blog" && <BlogPanel key="blog" onClose={close} />}
      </AnimatePresence>
    </main>
  );
}
