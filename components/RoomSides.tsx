"use client";

import Image from "next/image";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Lightbox } from "./Lightbox";

export function RoomSides({
  images,
  className = "",
  heightClass = "h-[320px] md:h-[520px]",
}: {
  images: { src: string; alt: string; side: string }[];
  className?: string;
  heightClass?: string;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  useEffect(() => {
    if (reduce || paused || total < 2) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % total), 5200);
    return () => window.clearInterval(t);
  }, [paused, reduce, total]);

  const current = images[i] ?? images[0];
  if (!current) return null;

  function prev() {
    setPaused(true);
    setI((n) => (n - 1 + total) % total);
  }
  function next() {
    setPaused(true);
    setI((n) => (n + 1) % total);
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${heightClass} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.button
          key={current.src}
          type="button"
          className="absolute inset-0 h-full w-full cursor-zoom-in"
          onClick={() => setOpen({ src: current.src, alt: current.alt })}
          initial={reduce ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -18 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={current.src} alt={current.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="h-full w-full object-cover" loading="lazy" />
        </motion.button>
      </AnimatePresence>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photograph"
            className="absolute left-3 top-1/2 z-[2] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/30 bg-[rgba(18,19,18,0.55)] text-ivory backdrop-blur-sm"
          >
            <CaretLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photograph"
            className="absolute right-3 top-1/2 z-[2] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/30 bg-[rgba(18,19,18,0.55)] text-ivory backdrop-blur-sm"
          >
            <CaretRight size={20} />
          </button>
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between bg-gradient-to-t from-[rgba(18,19,18,0.7)] p-4">
        <span className="text-sm text-ivory-soft">
          {current.side} · {i + 1} of {total}
        </span>
        <div className="pointer-events-auto flex gap-1">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              aria-label={img.side}
              onClick={() => {
                setPaused(true);
                setI(idx);
              }}
              className={`h-2 w-2 rounded-full ${idx === i ? "bg-ivory" : "bg-ivory/30"}`}
            />
          ))}
        </div>
      </div>
      <Lightbox src={open?.src ?? null} alt={open?.alt ?? ""} onClose={() => setOpen(null)} />
    </div>
  );
}
