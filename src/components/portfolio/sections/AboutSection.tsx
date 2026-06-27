import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, MapPin, GraduationCap } from "lucide-react";
import { links, timeline } from "@/lib/portfolio-data";

const tags = ["GPU", "CUDA", "C++", "SYSTEMS", "SIMULATION"];

const contactItems = [
  { href: links.github, icon: Github, label: "GitHub" },
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${links.email}`, icon: Mail, label: "Email" },
  { href: links.resume, icon: FileText, label: "Resume" },
];

export function AboutSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
              <div className="shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-glass">
                  <img
                    src="/avatar.jpg"
                    alt="Utkarsh Joshi"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex gap-1.5 mt-2.5 justify-center sm:justify-start">
                  {contactItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-md bg-glass border border-glass-border shadow-glass flex items-center justify-center hover:bg-glass-hover hover:border-glass-border-hover text-foreground-secondary hover:text-foreground transition-all"
                    >
                      <item.icon className="w-3 h-3" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary mb-1" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                  Systems & Simulation Engineer
                </div>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-1" style={{ fontVariationSettings: '"MONO" 0, "CASL" 0' }}>
                  Utkarsh Joshi
                </h1>

                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>

                <div className="mt-5 space-y-3 text-foreground-secondary leading-relaxed text-sm md:text-base">
                  <p>
                    Started with hardware in 2020 — CPU overclocking, tech YouTube, the AMD Ryzen
                    livestream where they beat Intel in single-core for the first time. I wanted to
                    understand what a computer was actually doing, so I moved up the stack until I
                    hit the bottom. That's where I stayed.
                  </p>
                  <p>
                    Astrosis went through four lives — React frontend → CLI → TUI → CUDA. Each
                    rewrite taught me that performance isn't an afterthought, it's the design.
                    Some projects you build to ship, some you build to see how fast you can make
                    something go.
                  </p>
                  <p>
                    I work in C, C++, CUDA, and Python. I also use Blender, FL Studio, and
                    whatever else lets me build things that didn't exist before.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-xl bg-glass-hover border border-glass-border shadow-glass p-5 space-y-5">
              <div>
                <div className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary mb-3" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                  Timeline
                </div>
                <div className="space-y-3">
                  {timeline.map((t, i) => (
                    <div key={t.year} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-foreground-tertiary ring-2 ring-background mt-[5px]" />
                        {i < timeline.length - 1 && <div className="w-px flex-1 bg-glass-border mt-1" />}
                      </div>
                      <div className="flex-1 pb-3">
                        <span className="font-mono text-micro text-foreground-secondary tabular-nums" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                          {t.year}
                        </span>
                        <div className="text-small text-foreground-secondary mt-0.5">{t.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <div className="font-mono text-micro uppercase tracking-[0.2em] text-foreground-secondary mb-2" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
                  Reading / Learning
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "CS:APP",
                    "The Missing Semester",
                  ].map((item) => (
                    <span key={item} className="tag-pill">{item}</span>
                  ))}
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <div className="flex items-center gap-2 text-small text-foreground-secondary">
                  <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  <span>Nainital, India</span>
                </div>
                <div className="flex items-center gap-2 text-small text-foreground-secondary">
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                  <span>GEHU, Bhimtal — CS</span>
                </div>
                <div className="flex items-center gap-2 text-small text-gblue">
                  <span className="w-1.5 h-1.5 rounded-full bg-gblue" />
                  <span>Open to work & internships</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
