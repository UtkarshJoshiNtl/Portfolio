import { motion } from "framer-motion";
import { ExternalLink, Github, Trophy, Mail } from "lucide-react";
import { links } from "@/lib/portfolio-data";

const platforms = [
  {
    icon: Mail,
    label: "Email",
    value: links.email,
    href: `mailto:${links.email}`,
    color: "gblue",
    snippet: "joshiutkarshntl@gmail.com",
  },
  {
    icon: null,
    label: "LinkedIn",
    value: "Connect",
    href: links.linkedin,
    color: "gblue",
    customIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    icon: Trophy,
    label: "Codeforces",
    value: "@BakedRajma",
    href: links.codeforces,
    color: "gblue",
  },
  {
    icon: Github,
    label: "GitHub",
    value: `@${links.githubUser}`,
    href: links.github,
    color: "gblue",
  },
];

export function ContactSection() {

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {platforms.map((p, i) => (
          <motion.a
            key={p.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            href={p.href}
            target={p.label !== "Email" ? "_blank" : undefined}
            rel={p.label !== "Email" ? "noopener noreferrer" : undefined}
            className="rounded-xl bg-glass-hover border border-glass-border hover:bg-glass-active hover:border-glass-border-hover hover:shadow-glow shadow-glass transition-all p-5 group flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-gblue/10 flex items-center justify-center group-hover:bg-gblue/20 transition-colors mb-3">
              {p.customIcon ?? (p.icon && <p.icon className="w-5 h-5 text-gblue" strokeWidth={1.5} />)}
            </div>
            <div className="font-semibold text-sm text-foreground">{p.value}</div>
            <div className="font-mono text-micro text-foreground-secondary uppercase tracking-[0.15em] mt-1" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
              {p.label}
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-foreground-secondary mt-2 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
