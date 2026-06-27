import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  activePage?: string;
}

export function AppLayout({ children, activePage = "work" }: AppLayoutProps) {
  const navItems = [
    { id: "work", label: "Work", icon: "work" },
    { id: "projects", label: "Projects", icon: "layers" },
    { id: "experience", label: "Experience", icon: "history_edu" },
    { id: "contact", label: "Contact", icon: "alternate_email" },
  ];

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className="sidebar custom-scrollbar">
        <div className="mb-6">
          <div className="sidebar-title">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <span>Portfolio</span>
          </div>
          <p className="sidebar-subtitle">SYSTEMS ENGINEER</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.id === "work" ? "/" : `/${item.id}`}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
            >
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <button className="w-full py-2.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-opacity-90 transition-smooth">
            Download CV
          </button>
          <div className="flex items-center justify-between px-3 py-2 text-[11px] font-mono-label opacity-40">
            <span>V1.0.0</span>
            <span>STABLE</span>
          </div>
        </div>
      </aside>

      {/* Main Application Frame */}
      <main className="native-surface">
        {/* Header */}
        <header>
          <div className="traffic-lights hidden lg:flex">
            <div className="traffic-light red"></div>
            <div className="traffic-light yellow"></div>
            <div className="traffic-light green"></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
