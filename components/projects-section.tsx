"use client"

import { Github } from "lucide-react"
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem, MagneticWrap } from "./motion"

export function ProjectsSection() {
  return (
    <section id="projects" className="section-brutal">
      <div className="container-brutal">
        {/* Section Title */}
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-giant">PROJECTS</h2>
            <p className="text-body mt-4 max-w-xl opacity-60">
              Building systems software and tools.<br />
              Updated monthly as I learn.
            </p>
          </div>
        </FadeUp>

        {/* Flagship Project - Search System */}
        <ScaleIn delay={0.1}>
          <div className="mb-20">
            <div className="brutal-border-accent p-8 lg:p-12 glow-accent hover-rise transition-all max-w-5xl">
              <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
                <div>
                  <p className="text-small uppercase tracking-wider text-accent mb-2">
                    Flagship Project · Active
                  </p>
                  <h3 className="text-huge">SEARCH SYSTEM</h3>
                </div>
                <MagneticWrap>
                  <a
                    href="#"
                    className="brutal-border p-4 hover-bg-accent transition-accent"
                    title="View Repo"
                  >
                    <Github size={22} />
                  </a>
                </MagneticWrap>
              </div>

              <p className="text-body mb-8 leading-relaxed max-w-3xl opacity-80">
                Building a hybrid search engine from the ground up to understand information retrieval at its core.
                Implementing inverted indexes, BM25 weighting, and vector similarity for RAG-enhanced retrieval.
              </p>

              {/* Metrics Grid */}
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8" staggerDelay={0.06}>
                {[
                  { label: "Latency", value: "P99 < 50ms" },
                  { label: "Index", value: "BM25 + Vec" },
                  { label: "Faithfulness", value: "Measured" },
                  { label: "Status", value: "Active" },
                ].map(({ label, value }) => (
                  <StaggerItem key={label}>
                    <div className="glass-card p-4 rounded-sm">
                      <p className="text-small opacity-40 uppercase">{label}</p>
                      <p className="text-large font-mono tracking-tighter">{value}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 text-small font-mono bg-accent text-background rounded-sm">Information Retrieval</span>
                <span className="glass-card px-4 py-1.5 text-small font-mono rounded-sm">Hybrid Search</span>
                <span className="glass-card px-4 py-1.5 text-small font-mono rounded-sm">BM25/TF-IDF</span>
                <span className="glass-card px-4 py-1.5 text-small font-mono rounded-sm">Vector Embeddings</span>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Systems Project - QUIP */}
        <FadeUp delay={0.1}>
          <div className="mb-20 flex justify-end">
            <div className="brutal-border p-8 lg:p-12 hover-rise transition-all max-w-3xl">
              <p className="text-small uppercase tracking-wider opacity-40 mb-2">Systems · Independent</p>
              <h3 className="text-huge mb-6">QUIP</h3>
              <p className="text-body mb-8 leading-relaxed opacity-80">
                Unix shell built in C to study process management and POSIX signals.
                Focusing on low-level resource handling and explainability.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="glass-card px-4 py-1.5 text-small font-mono rounded-sm">C</span>
                <span className="glass-card px-4 py-1.5 text-small font-mono rounded-sm">POSIX</span>
                <span className="glass-card px-4 py-1.5 text-small font-mono rounded-sm">Process Mgmt</span>
              </div>
              <MagneticWrap>
                <a
                  href="https://github.com/UtkarshJoshiNtl/quip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 brutal-border px-6 py-3 hover-bg-accent transition-accent uppercase text-small font-bold"
                >
                  <Github size={16} /> Source Code
                </a>
              </MagneticWrap>
            </div>
          </div>
        </FadeUp>

        {/* Team & Hackathons */}
        <FadeUp>
          <div className="mt-24">
            <h3 className="text-large mb-10 border-b border-foreground/10 pb-4 uppercase tracking-tight">Team & Hackathons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Newt Tracker */}
              <div className="brutal-border p-8 hover-rise transition-all flex flex-col justify-between">
                <div>
                  <p className="text-small uppercase tracking-wider text-accent mb-2">Cost Optimization · Mapping</p>
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-huge">NEWT TRACKER</h4>
                    <MagneticWrap>
                      <a href="https://github.com/UtkarshJoshiNtl/Newt_Tracker" target="_blank" rel="noopener noreferrer" className="brutal-border p-2 hover-bg-accent transition-accent">
                        <Github size={18} />
                      </a>
                    </MagneticWrap>
                  </div>
                  <p className="text-body mb-6 opacity-60 leading-relaxed">
                    Field operations platform featuring GPS geo-logging and real-time visualization.
                    Focused on infrastructure security and mapping optimization to reduce query costs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="glass-card px-3 py-1 text-small font-mono rounded-sm">Next.js 14</span>
                  <span className="glass-card px-3 py-1 text-small font-mono rounded-sm">PostgreSQL</span>
                  <span className="glass-card px-3 py-1 text-small font-mono rounded-sm">Maps API</span>
                </div>
              </div>

              {/* Packkit */}
              <div className="brutal-border p-8 hover-rise transition-all flex flex-col justify-between">
                <div>
                  <p className="text-small uppercase tracking-wider text-accent mb-2">Offline Infra · Retrieval</p>
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-huge">PACKKIT</h4>
                    <MagneticWrap>
                      <a href="https://github.com/UtkarshJoshiNtl/Packkit" target="_blank" rel="noopener noreferrer" className="brutal-border p-2 hover-bg-accent transition-accent">
                        <Github size={18} />
                      </a>
                    </MagneticWrap>
                  </div>
                  <p className="text-body mb-6 opacity-60 leading-relaxed">
                    Advanced backend for semantic search and RAG systems.
                    Implemented offline-first capabilities and enhanced vector-enhanced retrieval logic.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="glass-card px-3 py-1 text-small font-mono rounded-sm">RAG</span>
                  <span className="glass-card px-3 py-1 text-small font-mono rounded-sm">Semantic Search</span>
                  <span className="glass-card px-3 py-1 text-small font-mono rounded-sm">Offline-first</span>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
