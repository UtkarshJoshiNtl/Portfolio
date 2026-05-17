"use client";

import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/portfolio/Header";
import { TileGrid } from "@/components/portfolio/TileGrid";
import { usePanel } from "@/components/portfolio/usePanel";
import { AstrosisPanel } from "@/components/portfolio/panels/AstrosisPanel";
import { ProjectsPanel } from "@/components/portfolio/panels/ProjectsPanel";
import { RoadmapPanel } from "@/components/portfolio/panels/RoadmapPanel";
import { HobbyPanel } from "@/components/portfolio/panels/HobbyPanel";
import { AboutPanel } from "@/components/portfolio/panels/AboutPanel";

export const Route = createFileRoute("/")({
  component: Index,
});

export function Index() {
  const { active: panel, open, close } = usePanel(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
        <Header />
        <TileGrid open={open} />
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
