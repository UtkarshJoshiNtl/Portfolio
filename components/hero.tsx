"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { FadeUp, StaggerContainer, StaggerItem, MagneticWrap } from "./motion"

export function Hero() {
  return (
    <section className="min-h-screen relative flex items-center">
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="container-brutal w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-center">
          {/* Vertical Name - Left Side */}
          <FadeUp delay={0.1}>
            <div className="flex justify-start lg:justify-center">
              <h1 className="text-vertical text-massive tracking-tighter">
                UTKARSH JOSHI
              </h1>
            </div>
          </FadeUp>

          {/* Content - Right Side */}
          <div className="space-y-10 lg:pl-12">
            {/* Tagline */}
            <StaggerContainer staggerDelay={0.1}>
              <StaggerItem>
                <p className="text-large">
                  Backend & Systems Engineer
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-large text-accent mt-2">
                  Information Retrieval · RAG Systems
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex gap-4 opacity-50 mt-3">
                  <p className="text-small uppercase tracking-wider">India</p>
                  <p className="text-small uppercase tracking-wider">CS '29</p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Current Focus */}
            <FadeUp delay={0.4}>
              <div className="brutal-border-accent p-8 max-w-2xl glow-accent">
                <p className="text-small uppercase tracking-wider mb-4 text-accent">
                  Current Focus
                </p>
                <p className="text-body leading-relaxed">
                  Building a search system from first principles, strengthening IR foundations, and OSTEP.
                </p>
                <div className="mt-6 pt-6 border-t border-accent/10 flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <p className="text-small opacity-40 uppercase tracking-tighter">Internships</p>
                    <p className="text-small font-bold">Available 2026-2027</p>
                  </div>
                  <div>
                    <p className="text-small opacity-40 uppercase tracking-tighter">Full-time</p>
                    <p className="text-small font-bold">Open for discussion</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Socials */}
            <FadeUp delay={0.55}>
              <div className="flex flex-wrap gap-4">
                {[
                  { href: "https://github.com/UtkarshJoshiNtl", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/utkarsh-joshi", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:joshiutkarshntl@gmail.com", icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <MagneticWrap key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="brutal-border px-5 py-3 hover-bg-accent transition-accent flex items-center gap-3"
                    >
                      <Icon size={18} />
                      <span className="text-small uppercase tracking-wider">{label}</span>
                    </a>
                  </MagneticWrap>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-10 bg-accent/40" />
        <p className="text-small uppercase tracking-wider opacity-40">Scroll</p>
      </motion.div>
    </section>
  )
}
