"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/kampuang", label: "Kampuang" },
  { href: "/studio", label: "Studio" },
  { href: "/dapur", label: "Dapur" },
  { href: "/curhat", label: "Curhat" },
  { href: "/peta", label: "Peta" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-amber-600">⏰</span>
          <span>MainkoBukittinggi</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden gap-1 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1 p-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        >
          <span
            className={cn(
              "h-0.5 w-5 bg-zinc-700 transition-transform dark:bg-zinc-300",
              menuOpen && "translate-y-1.5 rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 bg-zinc-700 transition-opacity dark:bg-zinc-300",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 bg-zinc-700 transition-transform dark:bg-zinc-300",
              menuOpen && "-translate-y-1.5 -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="flex flex-col border-t border-zinc-200 px-4 pb-4 dark:border-zinc-800 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === href
                      ? "text-amber-700 dark:text-amber-400"
                      : "text-zinc-600 dark:text-zinc-300"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
