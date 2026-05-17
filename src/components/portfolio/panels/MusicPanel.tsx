"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { PanelShell } from "../PanelShell";

interface MusicPanelProps {
  onClose: () => void;
}

const musicProjects = [
  {
    title: "Generative Ambient Music",
    description: "Procedurally generated ambient soundscapes using algorithmic composition",
    genre: "Ambient",
  },
  {
    title: "Electronic Production",
    description: "Synthesizer exploration and electronic music composition",
    genre: "Electronic",
  },
  {
    title: "Game Audio Design",
    description: "Dynamic audio systems and procedural sound generation for interactive media",
    genre: "Game Audio",
  },
  {
    title: "Audio Programming",
    description: "DSP algorithms, real-time audio processing, and synthesis",
    genre: "Audio Tech",
  },
];

export function MusicPanel({ onClose }: MusicPanelProps) {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const noteVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  const headerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <PanelShell id="music" onClose={onClose}>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={headerVariants}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center"
            variants={pulseVariants}
            animate="animate"
          >
            <Music className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Music & Sound</h1>
            <p className="text-foreground/60 text-sm">Audio programming and creative exploration</p>
          </div>
        </motion.div>

        <motion.div className="grid gap-3">
          {musicProjects.map((project, index) => (
            <motion.div
              key={project.title}
              custom={index}
              variants={noteVariants}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 200, damping: 25 }}
              whileHover={{
                y: -4,
                rotate: -1,
              }}
              className="group p-5 rounded-lg border border-pink-500/20 bg-gradient-to-br from-pink-50/5 to-rose-50/5 hover:border-pink-500/40 hover:bg-pink-50/10 transition-all cursor-default"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-pink-400 transition-colors">
                  {project.title}
                </h3>
                <motion.div
                  className="text-xs font-mono px-2 py-1 rounded bg-pink-500/20 text-pink-300"
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(244, 63, 94, 0)", "0 0 0 8px rgba(244, 63, 94, 0)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {project.genre}
                </motion.div>
              </div>
              <p className="text-foreground/70 text-sm">{project.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={headerVariants}
          transition={{ duration: 0.5 }}
          className="mt-8 pt-6 border-t border-foreground/10"
        >
          <motion.div
            className="space-y-2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="flex gap-1">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-6 w-1 bg-gradient-to-t from-pink-500 to-rose-500 rounded-full"
                  animate={{
                    height: [
                      Math.random() * 20 + 10,
                      Math.random() * 30 + 20,
                      Math.random() * 20 + 10,
                    ],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
            <p className="text-foreground/50 text-sm mt-4">
              Passionate about sound design, music production, and the creative possibilities of
              algorithmic music and audio programming.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </PanelShell>
  );
}
