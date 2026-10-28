
"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
// import {  contactInfo } from "../lib/contact";
import HorizontalScroll from "./HorizontalScrolls";
import { contacts , contactInfo } from "../lib/contacts";

export default function Contacts() {
  return (
    <section className="overflow-hidden bg-black py-12 sm:py-16">
      <HorizontalScroll
        title={contactInfo.title}
        subtitle={contactInfo.subtitle}
      >
        {contacts.map((contact, index) => {
          const Icon = contact.icon;

          return (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={
                contact.href.startsWith("mailto:")
                  ? undefined
                  : "_blank"
              }
              rel="noopener noreferrer"
              aria-label={contact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
              }}
              whileHover={{ y: -6 }}
              className="group flex w-[220px] shrink-0 flex-col rounded-xl border border-white/10 bg-zinc-950 p-5 transition-colors hover:border-white/25 hover:bg-zinc-900 sm:w-[250px] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] transition-colors group-hover:bg-white/10"
                >
                  <Icon
                    size={26}
                    style={{ color: contact.color }}
                    aria-hidden="true"
                  />
                </div>

                <ArrowUpRight
                  size={19}
                  className="text-gray-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {contact.name}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {contact.description}
              </p>

              <span className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                {contact.label}
              </span>
            </motion.a>
          );
        })}
      </HorizontalScroll>

      {/* Direct contact CTA */}
      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
              Have an opportunity?
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Let's build something great.
            </h3>

            <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
              I'm open to discussing projects, collaborations,
              and opportunities in web development and AI.
            </p>
          </div>

          <a
            href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(contactInfo.emailSubject)}`}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            <Mail size={17} />
            Contact Me
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
