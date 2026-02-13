"use client"

import { motion } from "framer-motion"
import { useSounds } from "./sound-provider"

export function Nav() {
  const { playClick, playHover } = useSounds()

  const scrollToSection = (id: string) => {
    playClick()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      className="fixed top-6 left-6 z-50 hidden lg:flex items-center gap-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <span className="text-small font-mono text-accent">UJ</span>
      <div className="flex gap-4">
        {["projects", "skills", "contact"].map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            onMouseEnter={playHover}
            className="text-small font-mono opacity-55 hover:opacity-100 hover:text-accent transition-all-smooth cursor-pointer"
          >
            $ {id}
          </button>
        ))}
      </div>
      <a
        href="/resume.pdf"
        target="_blank"
        onMouseEnter={playHover}
        onClick={playClick}
        className="text-small font-mono text-accent opacity-60 hover:opacity-100 transition-all-smooth border-l border-white/10 pl-4"
      >
        resume.pdf
      </a>
    </motion.nav>
  )
}
