
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Download, ArrowUpRight } from "lucide-react";

const Hero = () => {
  const [showName, setShowName] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const springY = useSpring(mouseY, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const handleMouseMove = (e) => {
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setShowName(true);
  };

  return (
    <section className="w-full overflow-hidden bg-black px-3 pt-3 sm:px-5 md:px-6 md:pt-5">
      <div
        className="group relative w-full isolate min-h-[480px] overflow-hidden rounded-xl sm:min-h-[540px] md:min-h-0 md:aspect-video md:max-h-[85dvh] lg:rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowName(false)}
      >
        {/* Background image */}
        <motion.img
          src="/mobile.jpeg"
          alt="Developer workspace"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute block md:hidden inset-0 h-full w-full object-cover object-center"
        />
          <motion.img
          src="/pc.jpeg"
          alt="Developer workspace"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute hidden md:block inset-0 h-full w-full object-cover object-center"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 md:bg-gradient-to-r md:from-black/90 md:via-black/55 md:to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[480px] items-end px-4 pb-8 pt-20 sm:min-h-[540px] sm:px-7 sm:pb-10 md:min-h-0 md:h-full md:items-center md:px-[6%] md:py-12 lg:px-[7%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="w-full max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-red-500 sm:text-xs sm:tracking-[0.3em]"
            >
              Developer Portfolio
            </motion.p>

            <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Full-Stack
              <span className="block text-gray-300">
                AI Engineer
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-left text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 md:mt-5">
              Full-stack developer skilled in React, Next.js,
              Node.js, MongoDB, and Python, exploring AI and
              building modern, intelligent digital experiences.
            </p>

            {/* Responsive buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-6 flex w-full flex-col gap-3 min-[400px]:flex-row sm:mt-7 sm:w-fit"
            >
              <a
                href="/resume.pdf"
                download
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200 active:scale-[0.98] sm:min-w-36"
              >
                Resume
                <Download size={17} />
              </a>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 active:scale-[0.98] sm:min-w-36"
              >
                Contact
                <ArrowUpRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Cursor-following name: desktop only */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
          style={{
            x: springX,
            y: springY,
            opacity: showName ? 1 : 0,
            scale: showName ? 1 : 0.8,
          }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/70 px-4 py-2 text-sm font-medium tracking-wide text-white shadow-xl backdrop-blur-md">
            Prajwal Neupane
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
