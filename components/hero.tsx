"use client"

import { Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-screen relative flex items-center">
      <div className="container-brutal w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-center">
          {/* Vertical Name - Left Side */}
          <div className="flex justify-start lg:justify-center">
            <h1 className="text-vertical text-massive tracking-tighter">
              UTKARSH JOSHI
            </h1>
          </div>

          {/* Content - Right Side */}
          <div className="space-y-12 lg:pl-12">
            {/* Tagline */}
            <div className="space-y-4">
              <p className="text-large">
                CS '29 · Systems-focused
              </p>
              <p className="text-large text-accent">
                Building in public
              </p>
            </div>

            {/* Current Focus */}
            <div className="brutal-border-accent p-8 max-w-2xl">
              <p className="text-small uppercase tracking-wider mb-4 text-accent">
                Right now
              </p>
              <p className="text-body leading-relaxed">
                Unix shell in C, OSTEP, DSA fundamentals
              </p>
              <p className="text-small mt-4 opacity-60">
                Open for internships: 2026-2027
              </p>
            </div>

            {/* Socials - Brutal Style */}
            <div className="flex flex-wrap gap-6">
              <a
                href="https://github.com/UtkarshJoshiNtl"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border px-6 py-3 hover-rise hover-bg-accent transition-accent flex items-center gap-3"
              >
                <Github size={20} />
                <span className="text-small uppercase tracking-wider">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/utkarsh-joshi"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border px-6 py-3 hover-rise hover-bg-accent transition-accent flex items-center gap-3"
              >
                <Linkedin size={20} />
                <span className="text-small uppercase tracking-wider">LinkedIn</span>
              </a>
              <a
                href="mailto:joshiutkarshntl@gmail.com"
                className="brutal-border px-6 py-3 hover-rise hover-bg-accent transition-accent flex items-center gap-3"
              >
                <Mail size={20} />
                <span className="text-small uppercase tracking-wider">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[2px] h-12 bg-accent"></div>
        <p className="text-small uppercase tracking-wider">Scroll</p>
      </div>
    </section>
  )
}
