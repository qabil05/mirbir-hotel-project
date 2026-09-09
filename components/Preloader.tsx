"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), reduce ? 200 : 1200);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center">
            <p className="m-0 font-display text-[13px] tracking-[0.28em]">MIRBIR</p>
            <p className="mt-3 text-[11px] tracking-[0.22em] text-muted">DATCA / MEDITERRANEAN</p>
            <motion.div
              className="mx-auto mt-8 h-px w-24 origin-left bg-ivory/50"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
