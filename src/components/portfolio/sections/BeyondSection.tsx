import { motion } from "framer-motion";
import { CodeforcesTile } from "../CodeforcesTile";
import { GithubStatsTile } from "../GithubStatsTile";

export function BeyondSection({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <section className="mt-6 md:mt-8 mb-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3">
        Activity
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[110px] md:auto-rows-[120px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="col-span-1 md:col-span-2 row-span-2"
        >
          <CodeforcesTile onClick={() => onSelect("codeforces")} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="col-span-1 md:col-span-2 row-span-2"
        >
          <GithubStatsTile onClick={() => onSelect("github")} />
        </motion.div>
      </div>
    </section>
  );
}
