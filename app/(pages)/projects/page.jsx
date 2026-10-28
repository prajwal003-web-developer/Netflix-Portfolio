
"use client";

import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,

  ExternalLink,
  FolderCode,
} from "lucide-react";
import Link from "next/link";
import { projects } from "../../lib/Projects";
import { FaGithub } from "react-icons/fa6";

export default function ProjectsPage() {
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
            My work
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Featured Projects
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
            A collection of applications and experiments I've
            worked on while learning, building, and solving
            practical problems.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
            <FolderCode size={16} />
            {projects.length} projects
          </div>
        </motion.div>

        {projects.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
                }}
                whileHover={{ y: -5 }}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 transition-colors hover:border-white/25 hover:bg-zinc-900/70"
              >
                {/* Screenshot */}
                <div className="relative aspect-video overflow-hidden bg-zinc-900">
                  <img
                    src={project.image}
                    alt={`${project.name} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/70 px-3 py-1.5 text-xs text-gray-200 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-semibold">
                      {project.name}
                    </h2>

                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-gray-500 transition-colors group-hover:text-white"
                    />
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5 text-xs text-gray-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-auto flex gap-3 pt-6">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-sm font-medium transition hover:bg-white/10"
                      >
                        <FaGithub size={16} />
                        Source Code
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
                      >
                        Live Demo
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 px-6 py-16 text-center">
            <FolderCode
              size={36}
              className="mx-auto text-gray-500"
            />
            <h2 className="mt-4 text-xl font-semibold">
              Projects coming soon
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Check back soon for new projects.
            </p>
          </div>
        )}

        <div className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
            More on GitHub
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            There's more to explore.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">
            Explore my repositories, experiments, and ongoing
            development work.
          </p>

          <a
            href="https://github.com/prajwal003-web-developer"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            <FaGithub size={17} />
            Visit GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </main>
  );
}
