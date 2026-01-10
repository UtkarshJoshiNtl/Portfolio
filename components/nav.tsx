"use client"

export function Nav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8">
      <button
        onClick={() => scrollToSection("projects")}
        className="text-vertical text-small uppercase tracking-widest hover-accent transition-accent"
      >
        Projects
      </button>
      <button
        onClick={() => scrollToSection("learning")}
        className="text-vertical text-small uppercase tracking-widest hover-accent transition-accent"
      >
        Learning
      </button>
      <button
        onClick={() => scrollToSection("contact")}
        className="text-vertical text-small uppercase tracking-widest hover-accent transition-accent"
      >
        Contact
      </button>
      <a
        href="/resume.pdf"
        target="_blank"
        className="text-vertical text-small uppercase tracking-widest text-accent border-l-2 border-accent pl-2"
      >
        Resume
      </a>
    </nav>
  )
}
