import { Github, Linkedin, Mail, FileText } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-accent selection:text-background pb-32">

      {/* ─── Header ─── */}
      <section className="section-container pt-32 md:pt-40">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          Utkarsh Joshi
        </h1>
        <p className="font-mono text-accent mb-6">
          Backend & Systems Engineer
        </p>
        <div className="flex gap-6 text-sm text-zinc-400">
          <a href="https://github.com/UtkarshJoshiNtl" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2">
            <Github size={14} /> GitHub
          </a>
          <a href="https://linkedin.com/in/utkarsh-joshi" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href="mailto:joshiutkarshntl@gmail.com" className="hover:text-white flex items-center gap-2">
            <Mail size={14} /> Email
          </a>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="section-container py-4">
        <p className="text-zinc-300 max-w-prose">
          Computer Science undergraduate focused on <strong>Information Retrieval</strong>, <strong>RAG Systems</strong>, and low-level engineering. I build measurable systems from first principles, prioritizing explainability over magic and understanding over abstraction.
        </p>
        <p className="text-zinc-500 text-sm mt-4">
          Currently building search systems from the ground up and strengthening IR foundations.
        </p>
      </section>

      {/* ─── Projects ─── */}
      <section className="section-container">
        <span className="mono-label">Selected Projects</span>
        <h2>Engineering & Systems</h2>

        {/* Project 1: Search Engine */}
        <div className="project-item">
          <h3 className="text-xl text-white">Search System</h3>
          <p className="font-mono text-xs text-zinc-500 mb-4">Rust • Tokio • SIMD</p>
          <p className="text-zinc-400 mb-6 italic">
            Hybrid search system built from scratch with inverted indices and vector similarity.
          </p>

          <div className="space-y-6 text-sm">
            <div>
              <span className="text-white font-medium block mb-1">Context</span>
              <p className="text-zinc-400">
                Existing search libraries often obscure the underlying ranking mechanics. This project implements a hybrid retrieval engine to understand the tradeoffs between lexical (BM25) and semantic (Vector) search at the data structure level.
              </p>
            </div>

            <div>
              <span className="text-white font-medium block mb-1">System</span>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 ml-1">
                <li>Custom inverted index implementation with variable-byte encoding.</li>
                <li>SIMD-accelerated scoring functions for high-throughput ranking.</li>
                <li>Async I/O pipeline using Tokio for concurrent indexing.</li>
              </ul>
            </div>

            <div>
              <span className="text-white font-medium block mb-1">Metrics</span>
              <div className="metric-grid">
                <div className="metric-item">
                  <span className="metric-label">Indexing Speed</span>
                  <span className="metric-value">~45MB/s</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Query Latency (P99)</span>
                  <span className="metric-value">&lt;12ms</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Recall@10</span>
                  <span className="metric-value">0.89</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-white font-medium block mb-1">Tradeoffs</span>
              <p className="text-zinc-400">
                Optimized for read-heavy workloads; real-time updates require a full segment merge, impacting write availability during re-indexing. Memory usage is higher than Lucene due to uncompressed pointer lists in the current iteration.
              </p>
            </div>
          </div>
        </div>

        {/* Project 2: Quip */}
        <div className="project-item">
          <h3 className="text-xl text-white">Quip</h3>
          <p className="font-mono text-xs text-zinc-500 mb-4">C • Syscall Interface</p>
          <p className="text-zinc-400 mb-6 italic">
            A minimalist Unix shell implementation focusing on process management and piping.
          </p>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-white font-medium block mb-1">Context</span>
              <p className="text-zinc-400">
                Built to master the Linux process API (fork/exec/wait) and signal handling nuances without relying on high-level abstractions.
              </p>
            </div>
            <div>
              <span className="text-white font-medium block mb-1">System</span>
              <p className="text-zinc-400">
                Implements rigid command parsing, foreground/background process groups, and custom signal traps. detailed pipe orchestration ensures correct stdout/stdin handoffs.
              </p>
            </div>
          </div>
        </div>

        {/* Project 3: Newt Tracker (Team) */}
        <div className="project-item border-l-zinc-800 hover:border-zinc-700">
          <h3 className="text-lg text-zinc-300">Newt Tracker</h3>
          <p className="font-mono text-xs text-zinc-500 mb-2">Contributor • Infrastructure</p>
          <p className="text-zinc-500 text-sm">
            Optimized mapping infrastructure costs and implemented security protocols for a hackathon tracking solution.
          </p>
        </div>

      </section>

      {/* ─── Competencies ─── */}
      <section className="section-container">
        <span className="mono-label">Competencies</span>
        <h2>Technical Stack</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-white mb-3">Core Engineering</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><span className="text-accent">C / C++</span> &mdash; Memory, Pointers, Systems</li>
              <li><span className="text-accent">Java</span> &mdash; Enterprise Backend Patterns</li>
              <li><span className="text-accent">Rust</span> &mdash; Safety, Concurrency</li>
              <li><span className="text-accent">Linux/Bash</span> &mdash; Tooling & Scripting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-3">Domain Focus</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Information Retrieval (BM25, TF-IDF)</li>
              <li>Vector Similarity & Embeddings</li>
              <li>Database Design & Indexing</li>
              <li>REST API Architecture</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Philosophy ─── */}
      <section className="section-container">
        <span className="mono-label">Philosophy</span>
        <h2>Engineering Principles</h2>
        <ul className="space-y-4 text-sm text-zinc-400 mt-6">
          <li className="flex gap-3">
            <span className="text-accent font-mono">01.</span>
            <p className="mb-0"><strong>First Principles Thinking.</strong> Deconstruct problems to their base constraints rather than applying analogies or templates.</p>
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-mono">02.</span>
            <p className="mb-0"><strong>Explainability Over Magic.</strong> Systems should be understood, not just consumed. Avoid black boxes where possible.</p>
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-mono">03.</span>
            <p className="mb-0"><strong>Cost & Constraint Awareness.</strong> Efficient code isn't just fast; it respects the hardware and budget constraints it runs on.</p>
          </li>
        </ul>
      </section>

      <footer className="section-container py-12 border-t border-white/5 mt-12">
        <p className="font-mono text-xs text-zinc-600 text-center">
          © {new Date().getFullYear()} Utkarsh Joshi. Built with Next.js & Tailwind.
        </p>
      </footer>
    </main>
  )
}
