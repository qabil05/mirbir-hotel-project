"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PressLink, btnGhost, btnPrimary } from "./Pressable";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-end overflow-hidden pb-16">
      <motion.div style={{ scale }} className="absolute inset-0 overflow-hidden will-change-transform">
        <img
          src="/images/hero-cove.jpg"
          alt="Stone suites terraced above a private Aegean cove at golden hour"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,19,18,0.28)] via-[rgba(18,19,18,0.22)] to-[rgba(18,19,18,0.82)]" />
      <div className="relative z-[1] mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]">
        <motion.p
          className="m-0 text-[12px] tracking-[0.32em] text-ivory"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          MIRBIR
        </motion.p>
        <motion.h1
          className="mt-4 max-w-[16ch] font-display text-[clamp(40px,7vw,88px)] font-normal leading-[0.95] tracking-[-0.03em] text-balance"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          A private escape shaped by sea, stone and silence.
        </motion.h1>
        <motion.p
          className="mt-5 max-w-[38ch] text-lg text-ivory"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          A secluded retreat where architecture, nature and slow living meet.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <PressLink href="/book" className={btnPrimary}>
            Book your stay
          </PressLink>
          <PressLink href="#finder" className={btnGhost}>
            Explore MIRBIR
          </PressLink>
        </motion.div>
      </div>
    </section>
  );
}
