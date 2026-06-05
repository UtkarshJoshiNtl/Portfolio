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
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1"
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
        className="shrink-0"
      >
        <button onClick={() => onSelect("about")} className="block group">
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-2 ring-amber/20 group-hover:ring-amber/60 transition-all duration-500 group-hover:animate-glow-pulse">
            <img
              src="/avatar.jpg"
              alt="Utkarsh Joshi"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
