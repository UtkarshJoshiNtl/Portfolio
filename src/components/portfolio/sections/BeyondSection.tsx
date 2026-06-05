import { motion } from "framer-motion";
import { CodeforcesTile } from "../CodeforcesTile";
import { GithubStatsTile } from "../GithubStatsTile";

export function BeyondSection({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <section className="mt-6 md:mt-8 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber mb-3"
      >
        Activity
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="col-span-1 md:col-span-2"
        >
          <CodeforcesTile onClick={() => onSelect("codeforces")} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="col-span-1 md:col-span-2"
        >
          <GithubStatsTile onClick={() => onSelect("github")} />
        </motion.div>
      </div>
    </section>
  );
}
