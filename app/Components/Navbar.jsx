
"use client";

import Link from "next/link";
import { useState } from "react";
import { ProfileIcon } from "./ProfileIcon";
import {
  ChevronDown,
  Menu,
  X,
  UserRound,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "AI", href: "/ai" },
  { name: "Contact", href: "/contact" },
  { name: "Error", href: "/error" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/90 text-white shadow-lg backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center"
        >
          <img
            className="w-24 sm:w-28 md:w-32"
            src="/logo.png"
            alt="Prajwal Neupane"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white xl:px-4 xl:text-[15px]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right-side controls */}
        <div className="relative flex shrink-0 items-center gap-2">
          {/* Profile dropdown */}
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-label="Toggle profile menu"
            aria-expanded={profileOpen}
            className="flex h-10 items-center gap-1 rounded-lg px-2 transition hover:bg-white/10 sm:gap-2 sm:px-3"
          >
            <ProfileIcon />
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-1 shadow-2xl">
              <Link
                href="/"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <UserRound size={16} />
                My Portfolio
              </Link>

              <Link
                href="/contact"
                onClick={closeMenus}
                className="block rounded-lg px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
              >
                Get in touch
              </Link>
            </div>
          )}

          {/* Mobile/tablet menu button */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile/tablet navigation */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-black transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "max-h-[420px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenus}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              {link.name}
              <span className="text-gray-600">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
