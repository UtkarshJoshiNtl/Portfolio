import { PanelShell } from "../PanelShell";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Coming soon",
    description:
      "Technical deep-dives on GPU computing, systems work, and performance optimization.",
    date: "2026",
  },
];

export function BlogPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="blog" onClose={onClose}>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Blog</div>
      <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Writing</h2>

      <div className="mt-8 max-w-3xl">
        <p className="text-foreground/80 mb-12">
          Technical writing on GPU computing, systems engineering, and the projects I&apos;m
          building. Publishing my first post as part of the 2026 roadmap.
        </p>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 border border-border/50 hover:border-white/30 transition-colors group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold group-hover:text-amber transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-foreground/70 text-sm md:text-base">{post.description}</p>
                </div>
                <span className="mt-3 md:mt-0 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {post.date}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-6 border border-border/30 bg-white/5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Roadmap
          </p>
          <p className="text-foreground/80">
            First technical post targeted for Q4 2026. Topics: GPU profiling workflows, CUDA
            optimization patterns, or systems design lessons from building simulators.
          </p>
        </motion.div>
      </div>
    </PanelShell>
  );
}
