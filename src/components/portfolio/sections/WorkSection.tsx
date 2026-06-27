import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AstrosisBg } from "../AstrosisBg";
import { QuipBg } from "../QuipBg";
import { SStreamBg } from "../SStreamBg";
import { CJitBg } from "../CJitBg";
import { EnCripBg } from "../EnCripBg";
import { CTorrentBg } from "../CTorrentBg";
import { CurrentBg } from "../CurrentBg";
import { VisageBg } from "../VisageBg";
import { JustLandedBg } from "../JustLandedBg";
import { SectionHeader } from "../SectionHeader";
import { orbitalDisplacement } from "@/lib/grid-pack";
import { useReducedMotion } from "@/lib/motion-preferences";

const accentColors: Record<string, string> = {
  astrosis: "oklch(0.78 0.16 75)",
  quip: "oklch(0.7 0.15 145)",
  "s-stream": "oklch(0.65 0.15 210)",
  cjit: "oklch(0.55 0.15 260)",
  encrip: "oklch(0.65 0.2 345)",
  ctorrent: "oklch(0.6 0.15 30)",
  current: "oklch(0.7 0.12 145)",
  visage: "oklch(0.6 0.15 300)",
  justLanded: "oklch(0.65 0.15 160)",
};

const projects = [
  {
    id: "astrosis",
    name: "Astrosis",
    tag: "Featured",
    desc: "GPU-Accelerated Orbital Propagation and Conjunction Analysis Engine",
    stats: [
      { value: "507×", label: "batch propagation" },
      { value: "83×", label: "conjunction screening" },
      { value: "<1e-7", label: "energy drift / 24h" },
    ],
    tech: ["C++", "CUDA", "Python", "pybind11", "OpenMP", "RK4"],
  },
  {
    id: "quip",
    name: "Quip",
    desc: "Unix shell in C99 — built from scratch, zero dependencies",
    tech: ["C", "POSIX", "termios", "Job Control"],
  },
  {
    id: "s-stream",
    name: "S-Stream",
    desc: "Lattice Boltzmann fluid simulation with GPU acceleration",
    tech: ["Python", "CuPy", "PySide6", "D2Q9"],
  },
  {
    id: "cjit",
    name: "cjit",
    desc: "Version control system in C — content-addressed storage",
    tech: ["C", "CAS", "Version Control"],
    href: "https://github.com/UtkarshJoshiNtl/cjit",
  },
  {
    id: "encrip",
    name: "EnCrip",
    desc: "Distributed execution framework with HMAC-SHA256 auth",
    tech: ["Python", "HMAC", "FastAPI", "Worker"],
  },
  {
    id: "current",
    name: "Current",
    desc: "Concurrent TTL hash map — C++17 performance study",
    tech: ["C++17", "Lock-Free", "CMake"],
  },
  {
    id: "ctorrent",
    name: "CTorrent",
    desc: "Educational CLI BitTorrent client in C",
    tech: ["C", "POSIX", "P2P"],
  },
  {
    id: "visage",
    name: "Visage",
    desc: "Real-time system performance TUI dashboard",
    tech: ["Python", "Textual", "eBPF"],
  },
  {
    id: "justLanded",
    name: "justLanded",
    desc: "Local co-op 3D physics game — Godot 4",
    tech: ["Godot", "GDScript", "3D Physics"],
  },
];

const sectionVariants = (prefersReducedMotion: boolean) => ({
  hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion
      ? { duration: 0 }
      : {
          duration: 0.55,
          delay: Math.sin(i * 0.7) * 0.08 + 0.08,
          ease: [0.16, 1, 0.3, 1],
        },
  }),
});

export function WorkSection({ onSelect }: { onSelect: (id: string) => void }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="mt-2">
      <SectionHeader label="Work" />

      <motion.button
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
        whileHover={prefersReducedMotion ? {} : { y: -2, transition: { duration: 0.2 } }}
        onClick={() => onSelect("astrosis")}
        className="w-full text-left bg-surface-container border border-outline rounded-lg transition-smooth p-6 md:p-8 mb-3 relative overflow-hidden group hover:border-primary hover:bg-surface-bright hover:shadow-lg"
        style={{ transformStyle: "preserve-3d", perspective: "800px" }}
      >
        <AstrosisBg />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, oklch(0.78 0.16 75 / 0.08), transparent 60%)`,
          }}
        />
        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber mb-1">
            Featured
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">{projects[0].name}</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">{projects[0].desc}</p>
          <div className="grid grid-cols-3 gap-3 mt-5 max-w-xl">
            {projects[0].stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="bg-background/50 p-3 md:p-4"
              >
                <div className="text-xl md:text-2xl font-semibold text-amber">{s.value}</div>
                <div className="font-mono text-[10px] md:text-xs text-muted-foreground mt-1 leading-tight">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {projects[0].tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 bg-amber/10 text-amber/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {projects.slice(1).map((p, i) => {
          const isExternal = "href" in p && p.href;
          const accent = accentColors[p.id] || "oklch(0.78 0.16 75)";
          const offset = orbitalDisplacement(i, 1, 256 + i);

          const Content = (
            <>
              {p.id === "quip" && <QuipBg />}
              {p.id === "s-stream" && <SStreamBg />}
              {p.id === "cjit" && <CJitBg />}
              {p.id === "encrip" && <EnCripBg />}
              {p.id === "ctorrent" && <CTorrentBg />}
              {p.id === "current" && <CurrentBg />}
              {p.id === "visage" && <VisageBg />}
              {p.id === "justLanded" && <JustLandedBg />}
              <div className="relative z-10 flex flex-col h-full">
                <div className="font-mono text-xs" style={{ color: accent }}>
                  {p.name}
                </div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {p.desc}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 items-end">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 bg-tile-alt/50 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {isExternal && <ArrowUpRight className="w-3 h-3 text-muted-foreground ml-auto" />}
                </div>
              </div>
            </>
          );

          const cardClasses =
            "relative overflow-hidden bg-surface-container border border-outline rounded-lg transition-smooth p-4 md:p-5 text-left h-full group hover:border-primary hover:bg-surface-bright hover:shadow-md";

          return (
            <motion.div
              key={p.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={sectionVariants(prefersReducedMotion)}
              whileHover={prefersReducedMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "800px",
                transform: `translate(${offset.dx}px, ${offset.dy}px)`,
              }}
            >
              {isExternal ? (
                <a
                  href={(p as typeof p & { href: string }).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block h-full ${cardClasses}`}
                >
                  {Content}
                </a>
              ) : (
                <button onClick={() => onSelect(p.id)} className={`w-full ${cardClasses}`}>
                  {Content}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
        className="mt-3"
      >
        <TechStackBar />
      </motion.div>
    </section>
  );
}

function TechStackBar() {
  const categories = [
    { label: "Languages", items: ["C", "C++", "Python", "GDScript"] },
    { label: "Tools", items: ["Git", "CMake", "Godot"] },
    {
      label: "Technologies",
      items: ["CUDA", "OpenMP", "OpenGL", "NumPy", "CuPy", "eBPF", "Bash", "Linux"],
    },
  ];

  return (
    <div className="relative bg-tile/50 group overflow-hidden">
      <div className="px-5 py-4 flex gap-8 md:gap-14">
        {categories.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-2">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber/70">
              {cat.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((t) => (
                <span
                  key={t}
                  className="font-mono text-sm uppercase tracking-[0.08em] text-muted-foreground hover:text-amber transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
