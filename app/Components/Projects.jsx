
"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import HorizontalScroll from "./HorizontalScrolls";
import { projects } from "../lib/Projects";

export default function Projects() {
  return (
    <section className="overflow-hidden bg-black py-10 sm:py-14">
      <HorizontalScroll
        title="Featured Projects"
        subtitle="Things I've built while exploring web development and AI."
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            whileHover={{ y: -5 }}
            className="group w-[260px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 transition-colors hover:border-white/25 sm:w-[310px] md:w-[340px]"
          >
            {/* Project image */}
            <div className="relative aspect-video overflow-hidden bg-zinc-900">
              <img
                src={project.image}
                alt={`${project.name} project preview`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />

              <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-xs text-gray-200 backdrop-blur-md">
                {project.category}
              </span>
            </div>

            {/* Project information */}
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {project.name}
                </h3>

                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-gray-500 transition-colors group-hover:text-white"
                />
              </div>

              <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-400">
                {project.description}
              </p>

              {/* Technology tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md bg-white/[0.06] px-2 py-1 text-xs text-gray-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* Action links */}
              <div className="mt-5 flex gap-3 border-t border-white/10 pt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {/* <Github size={16} /> */}
                    Code
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
                  >
                    Live Demo
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </HorizontalScroll>
    </section>
  );
}
