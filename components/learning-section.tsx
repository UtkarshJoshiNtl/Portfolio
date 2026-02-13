"use client"

import { FadeUp, StaggerContainer, StaggerItem, ScaleIn } from "./motion"

export function LearningSection() {
  return (
    <section id="skills" className="section-main relative z-10 grid-bg">
      <div className="container-main">
        <FadeUp>
          <p className="text-small font-mono text-accent mb-4">{"// 02"}</p>
          <h2 className="text-giant mb-16">SKILLS</h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16">
          {/* Left — Competencies */}
          <div className="space-y-10">
            <FadeUp delay={0.1}>
              <h3 className="text-large mb-8 text-accent font-mono">competencies</h3>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Systems", desc: "Memory, DS from scratch, POSIX, Process mgmt" },
                  { title: "Retrieval", desc: "Inverted Indexes, BM25, Vector Similarity, Hybrid Ranking" },
                  { title: "Backend", desc: "REST APIs, Auth, DB Design, Rate Limiting" },
                  { title: "Tooling", desc: "Git, Linux, Debugging, Benchmarking" },
                ].map(({ title, desc }) => (
                  <StaggerItem key={title}>
                    <div className="card p-5">
                      <p className="text-body font-bold font-mono mb-2">{title}</p>
                      <p className="text-small opacity-50">{desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeUp>

            <ScaleIn delay={0.2}>
              <div className="card-accent p-6">
                <h3 className="text-large font-mono mb-4">{"// philosophy"}</h3>
                <ul className="space-y-3">
                  {[
                    "First-principles thinking over framework-driven design.",
                    "Measurable systems with documented trade-offs.",
                    "Explainability over black-box magic.",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent font-mono font-bold">{'>'}</span>
                      <p className="text-body opacity-80">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScaleIn>
          </div>

          {/* Right — Languages, Trajectory, Education */}
          <div className="space-y-10">
            <FadeUp delay={0.15}>
              <h3 className="text-large font-mono mb-3">languages</h3>
              <p className="text-body font-mono mb-1">C · Java · JavaScript</p>
              <p className="text-small opacity-40 font-mono">// C++ (competitive programming only)</p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <h3 className="text-large font-mono mb-4">trajectory</h3>
              <div className="space-y-3">
                <div className="code-border p-4">
                  <p className="text-small font-mono opacity-30">current</p>
                  <p className="text-body">Strengthening IR foundations</p>
                </div>
                <div className="code-border p-4">
                  <p className="text-small font-mono opacity-30">next</p>
                  <p className="text-body">Deployable Search Benchmarks</p>
                </div>
              </div>
            </FadeUp>

            <ScaleIn delay={0.3}>
              <div className="card p-6 border-accent">
                <p className="text-small font-mono text-accent mb-3">education</p>
                <p className="text-body font-bold mb-1">B.Tech Computer Science</p>
                <p className="text-small opacity-40">2025–2029 · India</p>
                <p className="text-small mt-2 opacity-40 font-mono">
                  // focus: systems, low-level software, IR
                </p>
              </div>
            </ScaleIn>
          </div>
        </div>
      </div>
    </section>
  )
}
