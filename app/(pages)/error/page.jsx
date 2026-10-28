
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass } from "lucide-react";

const usefulLinks = [
  {
    id: 1,
    title: "Explore My Projects",
    description: "Discover web apps and things I've built.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    link: "/projects",
  },
  {
    id: 2,
    title: "Technical Skills",
    description: "Explore my development tools and technologies.",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    link: "/skills",
  },
  {
    id: 3,
    title: "Let's Connect",
    description: "Get in touch for projects and collaborations.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
    link: "/contact",
  },
  {
    id: 4,
    title: "GitHub",
    description: "Explore my repositories and code.",
    img: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/prajwal003-web-developer",
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen overflow-hidden bg-black px-4 pb-16 pt-24 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Error hero */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 px-5 py-14 text-center sm:px-10 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_60%)]" />

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-500">
              Error 404
            </p>

            <h1 className="mt-4 text-7xl font-black tracking-tighter sm:text-8xl md:text-9xl">
              4<span className="text-red-500">0</span>4
            </h1>

            <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
              Looks like you're lost.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
              This page doesn't exist or may have moved.
              Let's get you back on track.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>
          </div>
        </motion.section>

        {/* Useful links */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                Find your way
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Explore instead
              </h2>
            </div>

            <Compass
              size={28}
              className="mb-1 text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {usefulLinks.map((item, index) => {
              const isExternal = item.link.startsWith("http");

              const cardContent = (
                <>
                  <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-white">
                        {item.title}
                      </h3>

                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-gray-500 transition-colors group-hover:text-white"
                      />
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                >
                  {isExternal ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 transition-colors hover:border-white/25 hover:bg-zinc-900"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <Link
                      href={item.link}
                      className="group block h-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 transition-colors hover:border-white/25 hover:bg-zinc-900"
                    >
                      {cardContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
