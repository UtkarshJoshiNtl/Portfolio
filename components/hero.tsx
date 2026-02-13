"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useSounds } from "./sound-provider"

export function Hero() {
  const { playClick, playHover } = useSounds()

  return (
    <section className="min-h-screen relative flex items-center z-10">
      <div className="container-main w-full">
        <div className="max-w-3xl">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-small font-mono text-accent mb-4 tracking-wider">
              {"// backend & systems engineer"}
            </p>
            <h1 className="text-massive mb-6">
              UTKARSH<br />JOSHI
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-large text-accent mb-2">
              Information Retrieval · RAG Systems
            </p>
            <p className="text-body opacity-55 max-w-md mb-8">
              India · CS '29 · Building from first principles
            </p>
          </motion.div>

          {/* Current Focus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-accent p-6 mb-10 max-w-lg">
              <p className="text-small font-mono text-accent mb-3">$ current_focus</p>
              <p className="text-body leading-relaxed opacity-80">
                Building a search system from first principles, strengthening IR foundations, and OSTEP.
              </p>
              <div className="mt-5 pt-4 border-t border-white/5 flex gap-8">
                <div>
                  <p className="text-small font-mono opacity-50">internships</p>
                  <p className="text-small font-bold">2026-2027</p>
                </div>
                <div>
                  <p className="text-small font-mono opacity-30">full_time</p>
                  <p className="text-small font-bold">open</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {[
              { href: "https://github.com/UtkarshJoshiNtl", icon: Github, label: "github" },
              { href: "https://linkedin.com/in/utkarsh-joshi", icon: Linkedin, label: "linkedin" },
              { href: "mailto:joshiutkarshntl@gmail.com", icon: Mail, label: "email" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="card px-5 py-3 flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={playHover}
                onClick={playClick}
              >
                <Icon size={16} />
                <span className="text-small font-mono">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-12 bg-accent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-small font-mono tracking-widest">scroll</p>
      </motion.div>
    </section>
  )
}
