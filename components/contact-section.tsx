"use client"

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="section-brutal">
      <div className="container-brutal">
        {/* Title - Split */}
        <div className="mb-20">
          <h2 className="text-giant">LET'S</h2>
          <h2 className="text-giant text-accent">BUILD</h2>
        </div>

        {/* Email - MASSIVE */}
        <div className="mb-20">
          <a
            href="mailto:joshiutkarshntl@gmail.com"
            className="group inline-block"
          >
            <p className="text-huge hover:text-accent transition-accent break-all">
              joshiutkarshntl@<br className="md:hidden"/>gmail.com
            </p>
            <div className="w-full h-1 bg-accent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-16">
          <p className="text-body leading-relaxed">
            Open to internships (2026-2027), collaborations, and conversations 
            about systems, operating systems, or anything low-level.
          </p>
        </div>

        {/* Social Links - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-20">
          <a
            href="https://github.com/UtkarshJoshiNtl"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-border p-8 hover-rise brutal-shadow hover-bg-accent transition-all group"
          >
            <Github size={48} className="mb-4" />
            <p className="text-body font-bold mb-2">GitHub</p>
            <p className="text-small opacity-70 group-hover:opacity-100">View my code</p>
          </a>
          <a
            href="https://linkedin.com/in/utkarsh-joshi"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-border p-8 hover-rise brutal-shadow hover-bg-accent transition-all group md:translate-y-8"
          >
            <Linkedin size={48} className="mb-4" />
            <p className="text-body font-bold mb-2">LinkedIn</p>
            <p className="text-small opacity-70 group-hover:opacity-100">Let's connect</p>
          </a>
          <a
            href="mailto:joshiutkarshntl@gmail.com"
            className="brutal-border p-8 hover-rise brutal-shadow hover-bg-accent transition-all group md:-translate-y-4"
          >
            <Mail size={48} className="mb-4" />
            <p className="text-body font-bold mb-2">Email</p>
            <p className="text-small opacity-70 group-hover:opacity-100">Say hello</p>
          </a>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t-2 border-foreground">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-small opacity-60">
              © 2025 Utkarsh Joshi
            </p>
            <p className="text-small opacity-60">
              Built with Next.js · Updated monthly
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
