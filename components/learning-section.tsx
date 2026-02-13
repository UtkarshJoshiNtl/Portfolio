"use client"

import { FadeUp, StaggerContainer, StaggerItem, ScaleIn } from "./motion"

export function LearningSection() {
  return (
    <section id="learning" className="section-brutal relative overflow-hidden">
      {/* Inverted section — dark on light */}
      <div className="absolute inset-0 bg-foreground" />
      <div className="relative container-brutal text-background">
        {/* Title */}
        <FadeUp>
          <h2 className="text-giant mb-16">CURRENT FOCUS</h2>
        </FadeUp>

        {/* Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20">
          {/* Left - Competencies & Philosophy */}
          <div className="space-y-12">
            <FadeUp delay={0.1}>
              <div>
                <h3 className="text-large mb-6 pb-2 border-b-2 border-accent inline-block">
                  COMPETENCIES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <StaggerContainer staggerDelay={0.06}>
                    {[
                      { title: "Systems", desc: "Memory & Arrays, DS from scratch, POSIX, Process mgmt" },
                      { title: "Retrieval", desc: "Inverted Indexes, BM25, Vector Similarity, Hybrid Ranking" },
                    ].map(({ title, desc }) => (
                      <StaggerItem key={title}>
                        <div className="border-l-2 border-accent pl-5 mb-6">
                          <p className="text-body font-bold mb-1">{title}</p>
                          <p className="text-small opacity-60">{desc}</p>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  <StaggerContainer staggerDelay={0.06}>
                    {[
                      { title: "Backend", desc: "REST APIs, Auth, DB Design, Rate Limiting" },
                      { title: "Tooling", desc: "Git, Linux, Debugging, Benchmarking" },
                    ].map(({ title, desc }) => (
                      <StaggerItem key={title}>
                        <div className="border-l-2 border-accent pl-5 mb-6">
                          <p className="text-body font-bold mb-1">{title}</p>
                          <p className="text-small opacity-60">{desc}</p>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </FadeUp>

            <ScaleIn delay={0.2}>
              <div className="border border-background/20 p-8 bg-background/5 backdrop-blur-sm">
                <h3 className="text-large mb-5 uppercase">Philosophy</h3>
                <ul className="space-y-4">
                  {[
                    "First-principles thinking over framework-driven design.",
                    "Measurable systems with documented trade-offs.",
                    "Explainability over black-box magic.",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-0.5 text-lg">/</span>
                      <p className="text-body leading-snug">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScaleIn>
          </div>

          {/* Right - Skills & Education */}
          <div className="space-y-10 lg:translate-y-8">
            <FadeUp delay={0.2}>
              <div>
                <h3 className="text-large mb-4">LANGUAGES</h3>
                <p className="text-body font-mono mb-3">C · Java · JavaScript</p>
                <p className="text-small opacity-50">
                  Secondary: C++ (CP only)
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div>
                <h3 className="text-large mb-4">TRAJECTORY</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-small uppercase opacity-40">Currently</p>
                    <p className="text-body">Strengthening IR foundations</p>
                  </div>
                  <div>
                    <p className="text-small uppercase opacity-40">Next</p>
                    <p className="text-body">Deployable Search Benchmarks</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <ScaleIn delay={0.4}>
              <div className="border-2 border-accent p-6">
                <p className="text-small uppercase tracking-wider mb-3 text-accent">Education</p>
                <p className="text-body font-bold mb-1">B.Tech Computer Science</p>
                <p className="text-small opacity-50">2025–2029 · India</p>
                <p className="text-small mt-3 opacity-50 italic">
                  Focus: Systems, Low-level Software, IR
                </p>
              </div>
            </ScaleIn>
          </div>
        </div>
      </div>
    </section>
  )
}
