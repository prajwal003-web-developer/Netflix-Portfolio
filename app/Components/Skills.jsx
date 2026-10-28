"use client";

import React from "react";
import { motion } from "motion/react";

import HorizontalScroll from "./HorizontalScrolls";
import { skills } from "../lib/skill_icon";



const Skills = () => {
  return (
    <div className="px-4 text-white md:px-8">
      <HorizontalScroll
        title="Technical Skills"
        subtitle="The technologies behind the things I build."
      >
        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
              whileHover={{ y: -7, scale: 1.03 }}
              className="group relative flex h-40 w-32 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#171717] p-4 shadow-inner shadow-white/5 transition-colors hover:border-white/30 hover:bg-[#242424] sm:h-44 sm:w-36 md:w-40"
            >
              <div className="flex items-center justify-between">
                <Icon
                  size={38}
                  style={{ color: skill.color }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span className="text-xs font-semibold text-gray-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-100 sm:text-base">
                  {skill.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {skill.category}
                </p>
              </div>

              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: skill.color }}
              />
            </motion.div>
          );
        })}
      </HorizontalScroll>
    </div>
  );
};

export default Skills;