import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { links } from "@/lib/portfolio-data";
import { BootSequence } from "../BootSequence";

const tags = ["GPU", "CUDA", "C++", "SYSTEMS"];

const contactItems = [
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${links.email}`, icon: Mail, label: "Email" },
  { href: links.resume, icon: FileText, label: "Resume" },
  { href: links.github, icon: Github, label: "GitHub" },
];

const nameChars = "Utkarsh Joshi".split("");

export function IdentitySection({ onSelect }: { onSelect: (id: string) => void }) {
  const [bootComplete, setBootComplete] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!bootComplete) return;
    const onKey = () => setDismissed(true);
    window.addEventListener("keydown", onKey, { once: true });
    const timer = setTimeout(() => setDismissed(true), prefersReducedMotion ? 500 : 4000);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [bootComplete, prefersReducedMotion]);

  if (!dismissed) {
    return (
      <BootSequence
        onComplete={() => {
          setBootComplete(true);
          setTimeout(() => setDismissed(true), 1500);
        }}
      />
    );
  }

  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16 relative">


      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        className="flex-1 relative z-10"
      >
        <div className="font-mono text-sm uppercase tracking-wider text-accent mb-4">
          Systems & Simulation Engineer
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Utkarsh Joshi
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-xl">
          GPU acceleration specialist. Systems engineer. Building efficient software at scale.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((t) => (
            <span
              key={t}
              className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-accent/10 text-accent rounded"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="text-sm text-accent font-mono mb-6">
          Open to work & internships
        </div>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {contactItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors duration-200 group"
            >
              <item.icon className="w-4 h-4" />
              <span className="font-mono text-sm uppercase tracking-wider">{item.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.1 }}
        className="shrink-0 relative z-10"
      >
        <button onClick={() => onSelect("about")} className="block group">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden border border-border group-hover:border-accent/50 transition-all duration-200">
            <img
              src="/avatar.jpg"
              alt="Utkarsh Joshi"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
