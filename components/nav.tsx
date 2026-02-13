"use client"

import { motion } from "framer-motion"

export function Nav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {[
        { id: "projects", label: "Projects" },
        { id: "learning", label: "Skills" },
        { id: "contact", label: "Contact" },
      ].map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="text-vertical text-small uppercase tracking-widest hover-accent transition-accent opacity-50 hover:opacity-100"
        >
          {label}
        </button>
      ))}
      <a
        href="/resume.pdf"
        target="_blank"
        className="text-vertical text-small uppercase tracking-widest text-accent border-l border-accent pl-2 opacity-80 hover:opacity-100"
      >
        Resume
      </a>
    </motion.nav>
  )
}
