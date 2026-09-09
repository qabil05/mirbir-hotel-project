"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";

export function Header() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector("[data-nav-sentinel]");
    if (!sentinel || !("IntersectionObserver" in window)) {
      setSolid(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, [path]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <a
        href="#main"
        className="absolute left-4 top-[-48px] z-[70] rounded-lg bg-ivory px-4 py-2 text-bg focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-[60] h-16 border-b transition-[background,backdrop-filter,border-color] duration-300 ${
          open || solid
            ? "border-ivory/10 bg-[rgba(18,19,18,0.96)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-full w-[min(1400px,calc(100%-32px))] grid-cols-[1fr_auto] items-center gap-6 md:w-[min(1400px,calc(100%-48px))] lg:grid-cols-[auto_1fr_auto]">
          <Link href="/" onClick={close} className="font-display text-[12px] tracking-[0.28em]">
            MIRBIR
          </Link>
          <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] tracking-wide transition-colors ${
                  path === item.href || path.startsWith(item.href + "/")
                    ? "text-ivory"
                    : "text-ivory-soft hover:text-ivory"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-2">
            <Link
              href="/book"
              className="hidden min-h-10 items-center rounded-lg bg-ivory px-4 text-[13px] text-bg lg:inline-flex"
            >
              Book
            </Link>
            <button
              type="button"
              className="relative z-[61] grid h-11 w-11 place-items-center text-ivory lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} weight="bold" /> : <List size={24} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.nav
            key="mobile"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col overflow-y-auto bg-[rgba(18,19,18,0.98)] px-6 pb-10 pt-6 lg:hidden"
            aria-label="Mobile"
          >
            {nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className="block border-b border-ivory/10 py-3 font-display text-[36px] leading-none"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <Link href="/book" onClick={close} className="mt-6 font-display text-[36px]">
              Book
            </Link>
            <div className="mt-8 flex gap-6 text-sm text-ivory-soft">
              <Link href="/gallery" onClick={close}>
                Gallery
              </Link>
              <Link href="/location" onClick={close}>
                Location
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
