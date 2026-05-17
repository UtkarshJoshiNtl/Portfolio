"use client";

import { motion } from "framer-motion";
import { Github, Trophy, Code2, X } from "lucide-react";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import { useCodeforces } from "@/hooks/useCodeforces";

export function IdentityPanel({ onClose }: { onClose: () => void }) {
  const github = useGitHubStats("UtkarshJoshiNtl");
  const codeforces = useCodeforces("BakedRajma");

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
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
      className="fixed inset-0 z-50 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden"
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

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(at 80% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
              "radial-gradient(at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Main heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-tight mb-3"
              animate={{ backgroundPosition: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Utkarsh Joshi
            </motion.h1>
            <motion.div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg md:text-xl text-blue-100 font-medium">Software Engineer</p>
            </motion.div>
            <p className="text-base md:text-lg text-blue-200/80 max-w-2xl leading-relaxed">
              Passionate about GPU computing, high-performance systems, and building cool things
              with C++ and CUDA. Focused on simulation, optimization, and low-level systems work.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12"
            variants={containerVariants}
          >
            {/* GitHub Repos */}
            <motion.div
              variants={statVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5 group hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <motion.div className="flex items-center gap-2 mb-2">
                <Github className="w-4 h-4 text-blue-300" />
                <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">
                  Repos
                </span>
              </motion.div>
              <motion.div
                className="text-2xl md:text-3xl font-bold text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {github.loading ? "..." : github.publicRepos}
              </motion.div>
            </motion.div>

            {/* GitHub Stars */}
            <motion.div
              variants={statVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5 group hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <motion.div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-yellow-400">★</span>
                <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">
                  Stars
                </span>
              </motion.div>
              <motion.div
                className="text-2xl md:text-3xl font-bold text-yellow-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {github.loading ? "..." : github.totalStars}
              </motion.div>
            </motion.div>

            {/* Codeforces Rating */}
            <motion.div
              variants={statVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5 group hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <motion.div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-orange-300" />
                <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">
                  CF Rating
                </span>
              </motion.div>
              <motion.div
                className="text-2xl md:text-3xl font-bold text-orange-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {codeforces.loading ? "..." : codeforces.rating}
              </motion.div>
            </motion.div>

            {/* Followers */}
            <motion.div
              variants={statVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-5 group hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <motion.div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-white/50">
                  Followers
                </span>
              </motion.div>
              <motion.div
                className="text-2xl md:text-3xl font-bold text-purple-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {github.loading ? "..." : github.followers}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/40 mb-4">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {["GPU Computing", "CUDA", "C++", "High Performance", "Systems", "Simulation"].map(
                (tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-full text-sm font-medium text-blue-100 hover:border-blue-300/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ),
              )}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-white/10">
            <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/30">
              Open to collaborations and interesting projects
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
