import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AstrosisBg } from "../AstrosisBg";
import { QuipBg } from "../QuipBg";
import { CuFlodaBg } from "../CuFlodaBg";
import { CJitBg } from "../CJitBg";
import { EnCripBg } from "../EnCripBg";

const accentColors: Record<string, string> = {
  astrosis: "oklch(0.78 0.16 75)",
  quip: "oklch(0.7 0.15 145)",
  cufloda: "oklch(0.65 0.15 210)",
  cjit: "oklch(0.55 0.15 260)",
  encrip: "oklch(0.65 0.2 345)",
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
    id: "cufloda",
    name: "CuFloda",
    desc: "Lattice Boltzmann fluid simulation with real-time visualization",
    tech: ["Python", "NumPy", "PyGame", "D2Q9"],
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
];

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" },
  }),
};

export function WorkSection({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <section className="mt-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3"
      >
        Work
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        onClick={() => onSelect("astrosis")}
        className="w-full text-left bg-tile hover:bg-tile-alt transition-all duration-300 p-6 md:p-8 mb-3 relative overflow-hidden group"
      >
        <AstrosisBg />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, oklch(0.78 0.16 75 / 0.08), transparent 60%)`,
          }}
        />
        <div className="relative z-10">
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
          const Content = (
            <>
              {p.id === "quip" && <QuipBg />}
              {p.id === "cufloda" && <CuFlodaBg />}
              {p.id === "cjit" && <CJitBg />}
              {p.id === "encrip" && <EnCripBg />}
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
            "relative overflow-hidden bg-tile hover:bg-tile-alt transition-all duration-300 p-4 md:p-5 text-left h-full group";

          return (
            <motion.div
              key={p.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={sectionVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
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
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-3"
      >
        <TechStackBar />
      </motion.div>
    </section>
  );
}

function TechStackBar() {
  const categories = [
    { label: "Languages", items: ["C", "C++", "Python"] },
    { label: "Tools", items: ["Git", "CMake"] },
    {
      label: "Technologies",
      items: ["CUDA", "OpenMP", "OpenGL", "NumPy", "Bash", "Linux"],
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
