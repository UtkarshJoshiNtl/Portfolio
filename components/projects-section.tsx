"use client"

import { Github } from "lucide-react"
import { motion } from "framer-motion"
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem, MagneticWrap } from "./motion"
import { useSounds } from "./sound-provider"

export function ProjectsSection() {
  const { playClick, playHover } = useSounds()

  return (
    <section id="projects" className="section-main relative z-10">
      <div className="container-main">
        {/* Section Title */}
        <FadeUp>
          <p className="text-small font-mono text-accent mb-4">{"// 01"}</p>
          <h2 className="text-giant mb-4">PROJECTS</h2>
          <p className="text-body opacity-40 mb-16 max-w-lg">
            Systems software and retrieval tools. Updated monthly.
          </p>
        </FadeUp>

        {/* Flagship - Search System */}
        <ScaleIn delay={0.1}>
          <div className="card-accent p-8 lg:p-10 mb-12 max-w-4xl">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="code-tag-solid">[ACTIVE]</span>
                  <span className="code-tag">[FLAGSHIP]</span>
                </div>
                <h3 className="text-huge">SEARCH SYSTEM</h3>
              </div>
              <motion.a
                href="#"
                className="card p-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={playHover}
                onClick={playClick}
              >
                <Github size={20} />
              </motion.a>
            </div>

            <p className="text-body mb-8 leading-relaxed opacity-70 max-w-2xl">
              Building a hybrid search engine from the ground up. Inverted indexes,
              BM25 weighting, and vector similarity for RAG-enhanced retrieval.
            </p>

            {/* Metrics */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { label: "latency", value: "p99 < 50ms" },
                { label: "index", value: "BM25 + Vec" },
                { label: "faithfulness", value: "measured" },
                { label: "status", value: "active" },
              ].map(({ label, value }) => (
                <StaggerItem key={label}>
                  <div className="code-border p-4">
                    <p className="text-small font-mono opacity-30">{label}</p>
                    <p className="text-body font-mono font-bold">{value}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="flex flex-wrap gap-2">
              {["Information Retrieval", "Hybrid Search", "BM25/TF-IDF", "Vector Embeddings"].map((t) => (
                <span key={t} className="code-tag">[{t}]</span>
              ))}
            </div>
          </div>
        </ScaleIn>

        {/* QUIP */}
        <FadeUp delay={0.1}>
          <div className="card p-8 lg:p-10 mb-12 max-w-3xl ml-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="code-tag">[INDEPENDENT]</span>
              <span className="code-tag">[SYSTEMS]</span>
            </div>
            <h3 className="text-huge mb-4">QUIP</h3>
            <p className="text-body mb-6 opacity-60 leading-relaxed">
              Unix shell built in C. Process management, POSIX signals,
              low-level resource handling.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["C", "POSIX", "Process Mgmt"].map((t) => (
                <span key={t} className="code-tag">[{t}]</span>
              ))}
            </div>
            <motion.a
              href="https://github.com/UtkarshJoshiNtl/quip"
              target="_blank"
              rel="noopener noreferrer"
              className="card inline-flex items-center gap-2 px-5 py-3 font-mono text-small hover:text-accent cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={playHover}
              onClick={playClick}
            >
              <Github size={14} /> source_code
            </motion.a>
          </div>
        </FadeUp>

        {/* Team Projects */}
        <FadeUp>
          <p className="text-small font-mono text-accent mb-6 mt-20">{"// team & hackathons"}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "NEWT TRACKER",
                tags: ["Next.js 14", "PostgreSQL", "Maps API"],
                badges: ["TEAM", "COST_OPT"],
                desc: "Field operations platform. GPS geo-logging, real-time visualization, infrastructure security.",
                url: "https://github.com/UtkarshJoshiNtl/Newt_Tracker",
              },
              {
                name: "PACKKIT",
                tags: ["RAG", "Semantic Search", "Offline-first"],
                badges: ["TEAM", "RETRIEVAL"],
                desc: "Semantic search and RAG backend. Offline-first capabilities, vector-enhanced retrieval.",
                url: "https://github.com/UtkarshJoshiNtl/Packkit",
              },
            ].map((project) => (
              <div key={project.name} className="card p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {project.badges.map((b) => (
                      <span key={b} className="code-tag">[{b}]</span>
                    ))}
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-huge">{project.name}</h4>
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-2 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={playHover}
                      onClick={playClick}
                    >
                      <Github size={16} />
                    </motion.a>
                  </div>
                  <p className="text-body mb-6 opacity-50 leading-relaxed">{project.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="code-tag">[{t}]</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
