"use client";

import { motion } from "framer-motion";
import { Github, Trophy, Code2, X } from "lucide-react";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import { useCodeforces } from "@/hooks/useCodeforces";
import { links } from "@/lib/portfolio-data";

export function IdentityPanel({ onClose }: { onClose: () => void }) {
  const github = useGitHubStats();
  const codeforces = useCodeforces("BakedRajma");

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  };

  const statVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center border border-blue-400/20 hover:border-blue-300 text-blue-300 hover:text-blue-200 transition-colors bg-blue-950/50 backdrop-blur-sm"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20 overflow-y-auto max-h-screen"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-tight mb-3">
            Utkarsh Joshi
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg md:text-xl text-blue-100 font-medium">Software Engineer</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10"
          variants={containerVariants}
        >
          <motion.div
            variants={statVariants}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Github className="w-4 h-4 text-blue-300" />
              <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">Repos</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-100">
              {github.loading ? "…" : github.error ? "—" : github.publicRepos}
            </div>
          </motion.div>

          <motion.div
            variants={statVariants}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-yellow-400">★</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">Stars</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-200">
              {github.loading ? "…" : github.error ? "—" : github.totalStars}
            </div>
          </motion.div>

          <motion.div
            variants={statVariants}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-orange-300" />
              <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">CF Rating</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-orange-200">
              {codeforces.loading ? "…" : codeforces.error || codeforces.rating == null ? "—" : codeforces.rating}
            </div>
            {!codeforces.loading && !codeforces.error && codeforces.rank && (
              <div className="text-xs text-white/50 mt-1 capitalize">{codeforces.rank}</div>
            )}
          </motion.div>

          <motion.div
            variants={statVariants}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">Followers</span>
            <div className="text-2xl md:text-3xl font-bold text-purple-200 mt-2">
              {github.loading ? "…" : github.error ? "—" : github.followers}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-5 text-blue-100/90 leading-relaxed max-w-3xl mb-10">
          <p>
            I am a first-year computer science undergraduate drawn to high-performance computing, GPU
            work, simulation, and low-level systems. The common thread is simple: I like making
            technically interesting things fast, understandable, and real.
          </p>
          <p>
            The projects range from C tooling and shells to simulation experiments and CUDA kernels.
            Astrosis is one proof point, not the whole identity: the broader obsession is performance,
            graphics, systems, and cool builds that force me to learn the machinery underneath.
          </p>
          <p>
            Currently deepening CUDA, OpenGL, C++, Linux tooling, and parallel computing while keeping
            the work concrete enough that someone can inspect it quickly.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/20 hover:border-white/40 font-mono text-xs uppercase tracking-wider transition-colors"
          >
            GitHub
          </a>
          <a
            href={links.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/20 hover:border-white/40 font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Codeforces
          </a>
          <a
            href={`mailto:${links.email}`}
            className="px-4 py-2 border border-white/20 hover:border-white/40 font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Email
          </a>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/20 hover:border-white/40 font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Resume
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 max-w-md font-mono text-xs text-white/60">
          <div className="uppercase tracking-[0.15em]">Location</div>
          <div>India</div>
          <div className="uppercase tracking-[0.15em] mt-2">Status</div>
          <div className="mt-2">First year, actively building</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
