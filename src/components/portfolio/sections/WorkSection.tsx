import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../SectionHeader";
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

export function WorkSection({ onSelect }: { onSelect: (id: string) => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section>
      <SectionHeader label="Work" />

      <motion.button
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect("astrosis")}
        className="w-full text-left bg-card border border-border rounded-lg p-8 mb-8 hover:border-accent/50 transition-colors duration-200 group"
      >
        <div className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
          Featured
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{projects[0].name}</h2>
        <p className="text-muted-foreground text-base mb-6 max-w-2xl">{projects[0].desc}</p>
        <div className="grid grid-cols-3 gap-4 mb-6 max-w-xl">
          {projects[0].stats && projects[0].stats.map((s) => (
            <motion.div
              key={s.label}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.2 }}
              className="bg-muted/40 p-4 rounded-md"
            >
              <div className="text-2xl font-bold text-accent">{s.value}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {projects[0].tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-accent/10 text-accent rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {projects.slice(1).map((p, i) => {
          const isExternal = "href" in p && p.href;

          return (
            <motion.div
              key={p.id}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.05 }}
            >
              {isExternal ? (
                <a
                  href={(p as typeof p & { href: string }).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full bg-card border border-border rounded-lg p-6 hover:border-accent/50 hover:shadow-md hover:y-1 transition-all duration-200 group"
                >
                  <ProjectCardContent p={p} />
                </a>
              ) : (
                <button
                  onClick={() => onSelect(p.id)}
                  className="w-full text-left h-full bg-card border border-border rounded-lg p-6 hover:border-accent/50 hover:shadow-md hover:y-1 transition-all duration-200 group"
                >
                  <ProjectCardContent p={p} />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ProjectCardContent({ p }: { p: (typeof projects)[0] | (typeof projects)[1] | (typeof projects)[2] | (typeof projects)[3] | (typeof projects)[4] | (typeof projects)[5] | (typeof projects)[6] | (typeof projects)[7] | (typeof projects)[8] }) {
  const isExternal = "href" in p;
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground mb-2">{p.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
      <div className="flex flex-wrap gap-2 items-center">
        {p.tech.slice(0, 3).map((t) => (
          <span key={t} className="font-mono text-xs uppercase tracking-wider px-2 py-1 bg-muted/40 text-muted-foreground rounded">
            {t}
          </span>
        ))}
        {isExternal && <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto" />}
      </div>
    </>
  );
}
