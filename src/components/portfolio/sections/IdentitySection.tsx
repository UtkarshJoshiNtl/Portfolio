import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { links } from "@/lib/portfolio-data";

const tags = ["GPU", "CUDA", "C++", "SYSTEMS"];

const contactItems = [
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${links.email}`, icon: Mail, label: "Email" },
  { href: links.resume, icon: FileText, label: "Resume" },
  { href: links.github, icon: Github, label: "GitHub" },
];

export function IdentitySection({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16 relative">
      {/* Ornamental background filigree accent */}
      <div
        className="absolute -top-8 -left-8 w-48 h-48 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 100 C20 40 60 10 100 10 C140 10 180 40 180 100 C180 160 140 190 100 190 C60 190 20 160 20 100Z"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M40 100 C40 55 70 30 100 30 C130 30 160 55 160 100 C160 145 130 170 100 170 C70 170 40 145 40 100Z"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          <path d="M100 10 L100 190" stroke="currentColor" strokeWidth="0.2" />
          <path d="M10 100 L190 100" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 relative z-10"
      >
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber tagline-cursor">
          Systems & Simulation Engineer
        </div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">Utkarsh Joshi</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="font-mono text-xs uppercase tracking-[0.15em] px-3 py-1.5 bg-tile/60 text-muted-foreground"
            >
              {t}
            </motion.span>
          ))}
        </div>
        <div className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-amber">
          Open to work & internships
        </div>
        <div className="mt-6 flex items-center gap-1">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-amber transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span className="relative">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber group-hover:w-full transition-all duration-300" />
              </span>
            </a>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="shrink-0 relative z-10"
      >
        <button onClick={() => onSelect("about")} className="block group">
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-2 ring-amber/20 group-hover:ring-amber/60 transition-all duration-500 group-hover:animate-glow-pulse">
            <img
              src="/avatar.jpg"
              alt="Utkarsh Joshi"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Ornamental ring accent */}
          <div
            className="absolute inset-[-6px] rounded-full border border-ornament opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            aria-hidden="true"
          />
        </button>
      </motion.div>
    </section>
  );
}
