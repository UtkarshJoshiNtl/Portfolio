"use client"

export function LearningSection() {
  return (
    <section id="learning" className="section-brutal bg-foreground text-background">
      <div className="container-brutal">
        {/* Title */}
        <h2 className="text-giant mb-20">CURRENT FOCUS</h2>

        {/* Asymmetric Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20">
          {/* Left - Learning */}
          <div className="space-y-12">
            <div>
              <h3 className="text-large mb-6 pb-2 border-b-4 border-accent inline-block">
                LEARNING
              </h3>
              <div className="space-y-6 mt-8">
                <div className="border-l-4 border-accent pl-6">
                  <p className="text-body font-bold mb-2">Operating Systems</p>
                  <p className="text-small opacity-70">OSTEP (Three Easy Pieces)</p>
                </div>
                <div className="border-l-4 border-background pl-6">
                  <p className="text-body font-bold mb-2">Data Structures & Algorithms</p>
                  <p className="text-small opacity-70">NeetCode 150 in Java</p>
                </div>
                <div className="border-l-4 border-background pl-6">
                  <p className="text-body font-bold mb-2">Systems Programming</p>
                  <p className="text-small opacity-70">C/C++ fundamentals, POSIX</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-large mb-6">NEXT UP</h3>
              <div className="flex flex-wrap gap-3">
                <span className="border-2 border-background px-4 py-2 text-small">Rust</span>
                <span className="border-2 border-background px-4 py-2 text-small">Networks</span>
                <span className="border-2 border-background px-4 py-2 text-small">Memory Mgmt</span>
                <span className="border-2 border-background px-4 py-2 text-small">Kernels</span>
              </div>
            </div>
          </div>

          {/* Right - Skills & Education */}
          <div className="space-y-12 lg:translate-y-12">
            <div>
              <h3 className="text-large mb-6">LANGUAGES</h3>
              <p className="text-body font-mono mb-4">C · C++ · Java</p>
              <p className="text-small opacity-70">
                Also: Spring Boot, MySQL, REST APIs, Docker
              </p>
            </div>

            <div>
              <h3 className="text-large mb-6">TOOLS</h3>
              <p className="text-body font-mono mb-2">Git · Docker · WSL2</p>
              <p className="text-body font-mono">Linux · Vim · VS Code</p>
            </div>

            <div className="border-4 border-accent p-6">
              <p className="text-small uppercase tracking-wider mb-3 text-accent">Education</p>
              <p className="text-body font-bold mb-2">B.Tech Computer Science</p>
              <p className="text-small opacity-70">2025–2029 · India</p>
              <p className="text-small mt-4 opacity-70">
                Focus: Systems, OS, Low-level Software
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
