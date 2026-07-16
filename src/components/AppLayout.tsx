import { Home, Layers, Mail } from "lucide-react";
import type { ReactNode } from "react";

export type SectionId = "about" | "projects" | "contact";

interface AppLayoutProps {
  children: ReactNode;
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const NAV = [
  { id: "about" as const, label: "About", icon: Home },
  { id: "projects" as const, label: "Projects", icon: Layers },
  { id: "contact" as const, label: "Contact", icon: Mail },
];

export function AppLayout({ children, activeSection, onNavigate }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand mb-6 px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-google flex items-center justify-center text-xs font-bold text-white">
              UJ
            </div>
            <div className="flex flex-col">
              <span
                className="text-sm font-bold text-foreground"
                style={{ fontVariationSettings: '"MONO" 0, "CASL" 0' }}
              >
                Utkarsh Joshi
              </span>
              <span
                className="text-[10px] text-foreground-secondary font-mono"
                style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}
              >
                SYSTEMS ENGINEER
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            >
              <item.icon className="nav-icon" strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer mt-auto pt-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium text-foreground bg-glass-strong border border-glass-border hover:bg-glass-active hover:border-glass-border-hover transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            CV
          </a>
        </div>
      </aside>

      <main className="main-area">
        <div className={`content-area px-2 md:px-4 py-4 md:py-6${activeSection === "projects" ? " fill" : ""}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
