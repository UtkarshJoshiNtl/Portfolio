import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  Check,
  ChevronDown,
  Loader2,
  Trophy,
  Github,
} from "lucide-react";
import { toast } from "sonner";
import { PanelShell } from "./PanelShell";
import { links, projects, astrosisHighlights, benchmarks } from "@/lib/portfolio-data";
import { getGithubReadme } from "@/lib/github-readme.functions";

export type DetailId =
  | "astrosis"
  | "quip"
  | "cufloda"
  | "encrip"
  | "about"
  | "contact"
  | "codeforces"
  | "github";

function AstrosisContent() {
  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
        Featured Project
      </div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Astrosis</h2>
      <p className="mt-2 text-base md:text-lg text-muted-foreground">
        GPU-Accelerated Orbital Propagation and Conjunction Analysis Engine
      </p>
      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {["Python", "C++", "CUDA", "RK4", "SGP4", "pybind11", "OpenMP"].map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-6 leading-relaxed text-foreground/90 text-sm md:text-base">
        I built Astrosis because I wanted to see if I could make orbital mechanics fast enough to be
        useful. It started as an autonomous constellation manager at the NSH hackathon (IIT Delhi) —
        50 satellites calculating their own delta-v and fuel burn to maneuver in LEO.
      </p>
      <p className="mt-3 leading-relaxed text-foreground/90 text-sm md:text-base">
        High-fidelity orbital mechanics engine built from first principles. Implements RK4 numerical
        integration with J2, J3, and J4 gravity harmonics, US Standard Atmosphere 1976 drag model
        with Earth-rotation correction, solar radiation pressure with cylindrical shadow modeling,
        and lunisolar third-body effects. Multi-backend architecture with automatic selection
        between CUDA GPU, C++/OpenMP, NumPy, and pure Python.
      </p>
      <div className="mt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Benchmarks
        </div>
        <div className="overflow-x-auto border border-border">
          <table className="w-full font-mono text-xs">
            <tbody>
              {benchmarks.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri === 0 ? "bg-tile-alt text-amber" : "border-t border-border"}
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Technical Highlights
        </div>
        <ul className="space-y-2">
          {astrosisHighlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground/90">
              <span className="text-amber font-mono mt-0.5">›</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="https://github.com/UtkarshJoshiNtl/Astrosis"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 px-4 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
      >
        View on GitHub <ExternalLink className="w-4 h-4" />
      </a>
    </>
  );
}

function QuipContent() {
  const [showReadme, setShowReadme] = useState(false);
  const project = projects.find((p) => p.name === "Quip")!;
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: showReadme,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Quip</h2>
      <p className="mt-2 text-base md:text-lg text-muted-foreground">
        Unix shell in C99 — built from scratch, no dependencies
      </p>
      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-6 leading-relaxed text-foreground/90 text-sm md:text-base">
        {project.description}
      </p>
      <div className="mt-8 border border-border">
        <button
          onClick={() => setShowReadme(!showReadme)}
          className="w-full flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-amber hover:bg-tile-alt transition-colors"
        >
          <span>GitHub README</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showReadme ? "rotate-180" : ""}`}
          />
        </button>
        {showReadme && (
          <div className="border-t border-border px-5 py-6 bg-background/50">
            {readme?.html ? (
              <div
                className="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: readme.html }}
              />
            ) : readme?.error ? (
              <div className="font-mono text-xs text-muted-foreground">
                Could not load README: {readme.error}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-mono text-xs">Loading README…</span>
              </div>
            )}
          </div>
        )}
      </div>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 px-4 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
      >
        View on GitHub <ExternalLink className="w-4 h-4" />
      </a>
    </>
  );
}

function CuFlodaContent() {
  const [showReadme, setShowReadme] = useState(false);
  const project = projects.find((p) => p.name === "CuFloda")!;
  const { data: readme } = useQuery({
    queryKey: ["readme", project.repo],
    queryFn: () => getGithubReadme({ repo: project.repo }),
    enabled: showReadme,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">CuFloda</h2>
      <p className="mt-2 text-base md:text-lg text-muted-foreground">
        Lattice Boltzmann fluid simulation with real-time visualization
      </p>
      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-6 leading-relaxed text-foreground/90 text-sm md:text-base">
        {project.description}
      </p>
      <div className="mt-8 border border-border">
        <button
          onClick={() => setShowReadme(!showReadme)}
          className="w-full flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-amber hover:bg-tile-alt transition-colors"
        >
          <span>GitHub README</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showReadme ? "rotate-180" : ""}`}
          />
        </button>
        {showReadme && (
          <div className="border-t border-border px-5 py-6 bg-background/50">
            {readme?.html ? (
              <div
                className="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: readme.html }}
              />
            ) : readme?.error ? (
              <div className="font-mono text-xs text-muted-foreground">
                Could not load README: {readme.error}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-mono text-xs">Loading README…</span>
              </div>
            )}
          </div>
        )}
      </div>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 px-4 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
      >
        View on GitHub <ExternalLink className="w-4 h-4" />
      </a>
    </>
  );
}

function EnCripContent() {
  const project = projects.find((p) => p.name === "EnCrip")!;
  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Project</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">EnCrip</h2>
      <p className="mt-2 text-base md:text-lg text-muted-foreground">
        Secure Distributed Execution Framework
      </p>
      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-6 leading-relaxed text-foreground/90 text-sm md:text-base">
        {project.description}
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-xl">
        {[
          ["394,922", "HMAC gen ops/sec"],
          ["526,275", "HMAC verify ops/sec"],
          ["100%", "replay detection"],
        ].map(([val, label]) => (
          <div key={label} className="border border-border p-4">
            <div className="text-xl font-semibold text-amber">{val}</div>
            <div className="font-mono text-[10px] text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 px-4 py-3 bg-amber text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
      >
        View on GitHub <ExternalLink className="w-4 h-4" />
      </a>
    </>
  );
}

function AboutContent() {
  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">About</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Utkarsh Joshi</h2>
      <div className="mt-4">
        <img
          src="/avatar.jpg"
          alt="Utkarsh Joshi"
          width={160}
          height={160}
          className="w-32 h-32 md:w-40 md:h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="mt-4 space-y-4 text-foreground/90 leading-relaxed text-sm md:text-base">
        <p>
          Started with hardware in 2020 — CPU overclocking, tech YouTube, the AMD Ryzen livestream
          where they beat Intel in single-core for the first time. I wanted to understand what a
          computer was actually doing, so I moved up the stack until I hit the bottom. That's where
          I stayed.
        </p>
        <p>
          Astrosis went through four lives — React frontend → CLI → TUI → CUDA. Each rewrite taught
          me that performance isn't an afterthought, it's the design. Some projects you build to
          ship, some you build to see how fast you can make something go.
        </p>
        <p>
          I work in C, C++, CUDA, and Python. I also use Blender, FL Studio, and whatever else lets
          me build things that didn't exist before.
        </p>
      </div>
      <div className="mt-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Education
        </div>
        <div className="border border-border p-4">
          <div className="font-semibold">Graphic Era Hill University, Bhimtal</div>
          <div className="font-mono text-xs text-muted-foreground mt-1">
            B.Tech in Computer Science & Engineering
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber mt-2">
            First Year
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">
          Currently Reading / Learning
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "CS:APP (Computer Systems: A Programmer's Perspective)",
            "The Missing Semester (MIT)",
          ].map((item) => (
            <span
              key={item}
              className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-border text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 max-w-md font-mono text-xs">
        <div className="text-muted-foreground uppercase tracking-[0.15em]">Location</div>
        <div>Nainital, India</div>
        <div className="text-muted-foreground uppercase tracking-[0.15em] mt-2">Status</div>
        <div className="mt-2">Open to work & internships</div>
      </div>
    </>
  );
}

function ContactContent() {
  const copyEmail = () => {
    navigator.clipboard.writeText(links.email).then(() => {
      toast.success("Email copied to clipboard");
    });
  };

  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Contact</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Get in touch</h2>
      <p className="mt-2 text-sm text-muted-foreground">Reach out directly via email.</p>
      <div className="mt-8 max-w-md">
        <div className="border border-border p-5 bg-tile-alt">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-amber shrink-0" />
            <div>
              <div className="font-mono text-sm break-all">{links.email}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                Email
              </div>
            </div>
          </div>
          <button
            onClick={copyEmail}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 border border-amber text-amber hover:bg-amber hover:text-black transition-colors px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em]"
          >
            <Check className="w-4 h-4" />
            Copy email
          </button>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground leading-relaxed">
          Prefer LinkedIn?{" "}
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber underline"
          >
            Connect there
          </a>
          .
        </div>
      </div>
    </>
  );
}

function CodeforcesContent() {
  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Activity</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Codeforces</h2>
      <p className="mt-2 text-base md:text-lg text-muted-foreground">
        Competitive programming profile
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Trophy className="w-6 h-6 text-amber" />
        <span className="font-mono text-lg">@{links.codeforcesHandle}</span>
      </div>
      <a
        href={links.codeforces}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 px-4 py-3 border border-amber text-amber hover:bg-amber hover:text-black transition-colors font-mono text-xs uppercase tracking-[0.15em]"
      >
        View full profile <ExternalLink className="w-4 h-4" />
      </a>
    </>
  );
}

function GithubContent() {
  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Activity</div>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">GitHub</h2>
      <p className="mt-2 text-base md:text-lg text-muted-foreground">
        Open source and project activity
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Github className="w-6 h-6 text-amber" />
        <span className="font-mono text-lg">@{links.githubUser}</span>
      </div>
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 px-4 py-3 border border-amber text-amber hover:bg-amber hover:text-black transition-colors font-mono text-xs uppercase tracking-[0.15em]"
      >
        View full profile <ExternalLink className="w-4 h-4" />
      </a>
    </>
  );
}

function DetailContentInner({ id }: { id: DetailId }) {
  switch (id) {
    case "astrosis":
      return <AstrosisContent />;
    case "quip":
      return <QuipContent />;
    case "cufloda":
      return <CuFlodaContent />;
    case "encrip":
      return <EnCripContent />;
    case "about":
      return <AboutContent />;
    case "contact":
      return <ContactContent />;
    case "codeforces":
      return <CodeforcesContent />;
    case "github":
      return <GithubContent />;
  }
}

export function DetailContent({ id, onBack }: { id: DetailId | null; onBack: () => void }) {
  const resolvedId = id ?? "about";

  return (
    <motion.div
      key={resolvedId}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-amber transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <DetailContentInner id={resolvedId} />
      <div className="mt-12 pt-6 border-t border-border font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        © 2026 Utkarsh Joshi
      </div>
    </motion.div>
  );
}

export function DetailMobilePanel({ id, onClose }: { id: DetailId; onClose: () => void }) {
  return (
    <PanelShell id={id} onClose={onClose}>
      <DetailContentInner id={id} />
    </PanelShell>
  );
}
