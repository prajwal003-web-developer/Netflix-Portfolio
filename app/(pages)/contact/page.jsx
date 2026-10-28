
"use client";

import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { contacts, contactInfo } from "../../lib/contacts";

export default function ContactPage() {
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
            Get in touch
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {contactInfo.title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            {contactInfo.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-white/10 bg-zinc-950 p-5 transition-colors hover:border-white/25 hover:bg-zinc-900 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
                    <Icon
                      size={25}
                      style={{ color: contact.color }}
                    />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-gray-500 transition group-hover:text-white"
                  />
                </div>

                <h2 className="mt-6 text-lg font-semibold">
                  {contact.name}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {contact.description}
                </p>

                <p className="mt-5 border-t border-white/10 pt-4 text-sm text-gray-300 group-hover:text-white">
                  {contact.label}
                </p>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 sm:p-8 md:flex-row md:items-center"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
              Have an idea?
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Let's make it happen.
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Reach out to discuss a project, collaboration,
              or development opportunity.
            </p>
          </div>

          <a
            href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(contactInfo.emailSubject)}`}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            <Mail size={17} />
            Email Me
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
