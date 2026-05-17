"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { PanelShell } from "../PanelShell";

interface Art3DPanelProps {
  onClose: () => void;
}

const artProjects = [
  {
    title: "Procedural Terrain Generation",
    description: "Real-time 3D terrain with Perlin noise and GPU acceleration",
    tech: ["Three.js", "GLSL", "WebGL"],
  },
  {
    title: "Particle System Simulation",
    description: "Physics-based particles with collision detection",
    tech: ["CUDA", "C++", "OpenGL"],
  },
  {
    title: "Neural Style Transfer",
    description: "Real-time artistic style transfer using GPU acceleration",
    tech: ["PyTorch", "CUDA", "Python"],
  },
  {
    title: "Ray Tracing Renderer",
    description: "Path tracing engine with realistic lighting and materials",
    tech: ["C++", "CUDA", "Ray Tracing"],
  },
];

export function Art3DPanel({ onClose }: Art3DPanelProps) {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const projectVariants = {
    initial: { opacity: 0, x: -40, scale: 0.95 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: { opacity: 0, x: 40, scale: 0.95 },
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <PanelShell id="art3d" onClose={onClose}>
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
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">3D Art & Graphics</h1>
            <p className="text-foreground/60 text-sm">
              Visual exploration and GPU-accelerated graphics
            </p>
          </div>
        </motion.div>

        <motion.div className="grid gap-4">
          {artProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={projectVariants.initial}
              animate={projectVariants.animate}
              whileHover={{
                scale: 1.02,
                rotate: 1,
              }}
              className="group p-5 rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-50/5 to-blue-50/5 hover:border-cyan-500/40 hover:bg-cyan-50/10 transition-all cursor-default"
            >
              <motion.h3
                className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyan-400 transition-colors"
                layoutId={`art-project-${index}`}
              >
                {project.title}
              </motion.h3>
              <p className="text-foreground/70 text-sm mb-3">{project.description}</p>
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={headerVariants}
          transition={{ duration: 0.5 }}
          className="mt-8 pt-6 border-t border-foreground/10"
        >
          <p className="text-foreground/50 text-sm">
            Exploring the intersection of mathematics, physics, and visual art through
            GPU-accelerated rendering and real-time graphics.
          </p>
        </motion.div>
      </motion.div>
    </PanelShell>
  );
}
