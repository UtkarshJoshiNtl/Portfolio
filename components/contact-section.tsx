"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { FadeUp, StaggerContainer, StaggerItem } from "./motion"
import { useSounds } from "./sound-provider"

export function ContactSection() {
  const { playClick, playHover } = useSounds()

  return (
    <section id="contact" className="section-main relative z-10">
      <div className="container-main">
        <FadeUp>
          <p className="text-small font-mono text-accent mb-4">{"// 03"}</p>
          <h2 className="text-giant mb-2">LET'S</h2>
          <h2 className="text-giant text-accent mb-16">BUILD</h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <a
            href="mailto:joshiutkarshntl@gmail.com"
            className="animated-underline inline-block mb-12"
          >
            <p className="text-huge opacity-80 hover:opacity-100 hover:text-accent transition-all-smooth break-all">
              joshiutkarshntl@gmail.com
            </p>
          </a>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-body opacity-40 max-w-lg mb-12 leading-relaxed">
            Open for internships (Summer 2026/2027) and full-time discussions.
            Interested in backend infrastructure, search systems, and low-level engineering.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mb-20">
          {[
            { href: "https://github.com/UtkarshJoshiNtl", icon: Github, label: "github", desc: "view my code" },
            { href: "https://linkedin.com/in/utkarsh-joshi", icon: Linkedin, label: "linkedin", desc: "let's connect" },
            { href: "mailto:joshiutkarshntl@gmail.com", icon: Mail, label: "email", desc: "say hello" },
          ].map(({ href, icon: Icon, label, desc }) => (
            <StaggerItem key={label}>
              <motion.a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="card p-6 block cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={playHover}
                onClick={playClick}
              >
                <Icon size={28} className="mb-3 opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all-smooth" />
                <p className="text-body font-mono font-bold mb-1">{label}</p>
                <p className="text-small opacity-30 group-hover:opacity-60 transition-all-smooth">{desc}</p>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="text-small font-mono opacity-20">© 2025 utkarsh_joshi</p>
            <p className="text-small font-mono opacity-20">next.js · three.js · updated monthly</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
