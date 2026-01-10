"use client"

import { Github, ExternalLink } from "lucide-react"

export function ProjectsSection() {
  return (
    <section id="projects" className="section-brutal">
      <div className="container-brutal">
        {/* Section Title - Offset */}
        <div className="mb-20">
          <h2 className="text-giant">PROJECTS</h2>
          <p className="text-body mt-4 max-w-xl">
            Building systems software and tools.<br />
            Updated monthly as I learn.
          </p>
        </div>

        {/* Featured Project - Quip - Takes Most Space */}
        <div className="mb-16 lg:mb-24">
          <div className="brutal-border-accent p-8 lg:p-12 brutal-shadow-heavy hover-rise transition-all max-w-4xl">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <p className="text-small uppercase tracking-wider text-accent mb-2">
                  Featured · In Progress
                </p>
                <h3 className="text-huge">QUIP</h3>
              </div>
              <a
                href="https://github.com/UtkarshJoshiNtl/quip"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border p-4 hover-bg-accent transition-accent"
              >
                <Github size={32} />
              </a>
            </div>

            <p className="text-body mb-8 leading-relaxed max-w-2xl">
              POSIX-compliant Unix shell implementing job control, signal handling, 
              and process management. Built in C to understand OS fundamentals from 
              first principles.
            </p>

            {/* Tech Stack - Brutal Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="brutal-border px-4 py-2 text-small font-mono">C</span>
              <span className="brutal-border px-4 py-2 text-small font-mono">POSIX</span>
              <span className="brutal-border px-4 py-2 text-small font-mono">Signals</span>
              <span className="brutal-border px-4 py-2 text-small font-mono">Process Management</span>
            </div>
          </div>
        </div>

        {/* Coming Soon - Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="brutal-border p-8 flex items-center justify-center min-h-[250px] hover:border-accent transition-accent">
            <p className="text-large text-accent">Coming Soon</p>
          </div>
          <div className="brutal-border p-8 flex items-center justify-center min-h-[250px] hover:border-accent transition-accent lg:translate-y-12">
            <p className="text-large text-accent">Coming Soon</p>
          </div>
          <div className="brutal-border p-8 flex items-center justify-center min-h-[250px] hover:border-accent transition-accent lg:-translate-y-6">
            <p className="text-large text-accent">Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  )
}
