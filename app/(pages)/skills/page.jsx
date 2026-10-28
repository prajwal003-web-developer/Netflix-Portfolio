
"use client";

import { motion } from "motion/react";
import { ArrowLeft, Code2 } from "lucide-react";
import Link from "next/link";
import { skills } from "../../lib/skill_icon";

export default function SkillsPage() {
  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            What I work with
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Technical Skills
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
            Technologies and tools I use while building web
            applications and exploring artificial intelligence.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
            <Code2 size={16} />
            {skills.length} technologies
          </div>
        </motion.div>

        <div className="mt-12 space-y-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <section key={category}>
                <div className="mb-5 flex items-center gap-3">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    {category}
                  </h2>

                  <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-xs text-gray-400">
                    {categorySkills.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {categorySkills.map((skill, index) => {
                    const Icon = skill.icon;

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.04,
                        }}
                        whileHover={{ y: -4 }}
                        className="group rounded-xl border border-white/10 bg-zinc-950 p-4 transition-colors hover:border-white/25 hover:bg-zinc-900 sm:p-5"
                      >
                        <div className="flex h-10 items-center">
                          <Icon
                            size={30}
                            style={{ color: skill.color }}
                            aria-hidden="true"
                          />
                        </div>

                        <h3 className="mt-4 break-words text-sm font-semibold text-white sm:text-base">
                          {skill.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {skill.category}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
            Always learning
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Growing beyond the stack.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400">
            I'm continuing to strengthen my backend development
            skills while learning machine learning and generative AI
            through practical projects.
          </p>
        </div>
      </div>
    </main>
  );
}
