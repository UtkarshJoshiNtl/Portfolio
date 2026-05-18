import { Github, Linkedin, Mail } from "lucide-react";
import { links } from "@/lib/portfolio-data";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export function Header() {
  return (
    <header className="mb-6 md:mb-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
        Systems &amp; Simulation Engineer
      </div>
      <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
        Utkarsh Joshi
      </h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
        First-year CS undergrad building high-performance systems from first principles.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-9 h-9 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-9 h-9 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href={`mailto:${links.email}`}
          aria-label="Email"
          className="w-9 h-9 border border-border flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
        >
          <Mail className="w-4 h-4" />
        </a>
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
