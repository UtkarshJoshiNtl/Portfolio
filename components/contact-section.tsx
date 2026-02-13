"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { FadeUp, MagneticWrap, StaggerContainer, StaggerItem } from "./motion"

export function ContactSection() {
  return (
    <section id="contact" className="section-brutal relative">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none blur-[100px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="container-brutal relative">
        {/* Title */}
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-giant">LET'S</h2>
            <h2 className="text-giant text-accent">BUILD</h2>
          </div>
        </FadeUp>

        {/* Email */}
        <FadeUp delay={0.15}>
          <div className="mb-16">
            <a
              href="mailto:joshiutkarshntl@gmail.com"
              className="group inline-block"
            >
              <p className="text-huge hover:text-accent transition-accent break-all">
                joshiutkarshntl@<br className="md:hidden" />gmail.com
              </p>
              <div className="w-full h-[2px] bg-accent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </a>
          </div>
        </FadeUp>

        {/* Description */}
        <FadeUp delay={0.25}>
          <div className="max-w-2xl mb-14">
            <p className="text-body leading-relaxed opacity-60">
              Open for internships (Summer 2026/2027) and full-time discussions.
              Particularly interested in backend infrastructure, search systems, and low-level engineering.
            </p>
          </div>
        </FadeUp>

        {/* Social Links */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mb-16" staggerDelay={0.08}>
          {[
            { href: "https://github.com/UtkarshJoshiNtl", icon: Github, label: "GitHub", desc: "View my code" },
            { href: "https://linkedin.com/in/utkarsh-joshi", icon: Linkedin, label: "LinkedIn", desc: "Let's connect" },
            { href: "mailto:joshiutkarshntl@gmail.com", icon: Mail, label: "Email", desc: "Say hello" },
          ].map(({ href, icon: Icon, label, desc }) => (
            <StaggerItem key={label}>
              <MagneticWrap>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="brutal-border p-6 hover-rise transition-all group block"
                >
                  <Icon size={36} className="mb-3 opacity-80" />
                  <p className="text-body font-bold mb-1">{label}</p>
                  <p className="text-small opacity-40 group-hover:opacity-70 transition-opacity">{desc}</p>
                </a>
              </MagneticWrap>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer */}
        <FadeUp delay={0.3}>
          <div className="pt-10 border-t border-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <p className="text-small opacity-30">
                © 2025 Utkarsh Joshi
              </p>
              <p className="text-small opacity-30">
                Built with Next.js · Updated monthly
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
