"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function PageHero({
  image,
  alt,
  title,
  text,
  compact = false,
}: {
  image: string;
  alt: string;
  title: string;
  text: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48]);

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden pb-12 ${
        compact ? "min-h-[42dvh]" : "min-h-[62dvh]"
      }`}
    >
      <motion.img style={{ y }} src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,19,18,0.45)] via-[rgba(18,19,18,0.55)] to-[rgba(18,19,18,0.92)]" />
      <div className="relative z-[1] mx-auto w-[min(1400px,calc(100%-48px))]">
        <motion.h1
          className="mb-3 max-w-[12ch] font-display text-[clamp(40px,6vw,68px)] leading-[1.08] tracking-[-0.03em] text-ivory drop-shadow-[0_2px_18px_rgba(18,19,18,0.65)]"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="m-0 max-w-[42ch] text-ivory drop-shadow-[0_1px_12px_rgba(18,19,18,0.7)]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
