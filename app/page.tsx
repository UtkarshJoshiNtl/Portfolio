"use client"

import { MetroGrid, Tile } from "@/components/metro-grid"
import { Scene3D } from "@/components/scene-3d"
import { ThemePicker } from "@/components/theme-picker"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export default function Home() {
  return (
    <>
      <Scene3D />
      <ThemePicker />

      <MetroGrid>
        {/* Tile 1: Hero / Intro (2x2) */}
        <Tile className="col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-background to-muted">
          <div className="h-full flex flex-col justify-end">
            <p className="text-small font-mono text-accent mb-2">{"// systems_engineer"}</p>
            <h1 className="text-huge font-bold leading-tight mb-2">
              UTKARSH<br />JOSHI
            </h1>
            <p className="opacity-60 text-small max-w-sm">
              Information Retrieval, RAG Systems, and Low-Level Engineering.
            </p>
          </div>
        </Tile>

        {/* Tile 2: Current Focus (1x2) */}
        <Tile className="col-span-1 row-span-2">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-small font-mono opacity-50 uppercase tracking-widest">focus</p>
            </div>
            <p className="text-large font-bold mb-auto">
              Search Systems & <br /> IR Foundations
            </p>
            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="text-small font-mono opacity-40 mb-1">status</p>
              <p className="text-body">Building from first principles</p>
            </div>
          </div>
        </Tile>

        {/* Tile 3: Feature Project - Search (2x2) */}
        <Tile className="col-span-1 md:col-span-2 row-span-2">
          <div className="h-full relative z-10 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="code-tag-solid text-xs">[FLAGSHIP]</span>
                <span className="code-tag text-xs">ACTIVE</span>
              </div>
              <ExternalLink size={18} className="opacity-50" />
            </div>
            <h2 className="text-giant mb-2">SEARCH<br />ENGINE</h2>
            <p className="text-body opacity-60 max-w-md mt-auto">
              Hybrid search system built from scratch. Inverted indices, BM25 weighting, and vector similarity.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="code-tag text-xs">Rust</span>
              <span className="code-tag text-xs">Tokio</span>
              <span className="code-tag text-xs">SIMD</span>
            </div>
          </div>
          {/* Decorative background number */}
          <span className="absolute -bottom-4 -right-4 text-[12rem] font-bold opacity-[0.03] pointer-events-none">
            01
          </span>
        </Tile>

        {/* Tile 4: Github (1x1) */}
        <Tile
          onClick={() => window.open("https://github.com/UtkarshJoshiNtl", "_blank")}
          className="col-span-1 row-span-1 bg-[#181717]"
        >
          <div className="h-full flex flex-col justify-between items-center py-4">
            <Github size={48} />
            <p className="font-mono text-small">@UtkarshJoshiNtl</p>
          </div>
        </Tile>

        {/* Tile 5: LinkedIn (1x1) */}
        <Tile
          onClick={() => window.open("https://linkedin.com/in/utkarsh-joshi", "_blank")}
          className="col-span-1 row-span-1 bg-[#0077b5]"
        >
          <div className="h-full flex flex-col justify-between items-center py-4 text-white">
            <Linkedin size={48} />
            <p className="font-mono text-small">Connect</p>
          </div>
        </Tile>

        {/* Tile 6: Skills Strip (2x1) */}
        <Tile className="col-span-1 md:col-span-2 row-span-1">
          <div className="h-full flex flex-col justify-center">
            <p className="text-small font-mono opacity-40 mb-3">{"// tech_stack"}</p>
            <div className="flex flex-wrap gap-3">
              {["C/C++", "Rust", "TypeScript", "Next.js", "PostgreSQL", "Docker", "Linux"].map(tech => (
                <span key={tech} className="text-large font-bold opacity-80 hover:text-accent transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Tile>

        {/* Tile 7: Contact / Mail (1x1) */}
        <Tile
          onClick={() => window.location.href = "mailto:joshiutkarshntl@gmail.com"}
          className="col-span-1 row-span-1 bg-accent"
        >
          <div className="h-full flex flex-col justify-center items-center text-background">
            <Mail size={40} className="mb-2" />
            <p className="font-bold">Email Me</p>
          </div>
        </Tile>

        {/* Tile 8: Quip Project (1x1) */}
        <Tile className="col-span-1 row-span-1">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-small font-mono text-accent">QUIP</p>
              <p className="text-xs opacity-50 mt-1">Unix Shell in C</p>
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs opacity-40">Process Mgmt</p>
            </div>
          </div>
        </Tile>

      </MetroGrid>
    </>
  )
}
