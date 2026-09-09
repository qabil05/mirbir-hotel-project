"use client";

import { X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";

export function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src ? (
        <motion.div
          key="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph"
          className="fixed inset-0 z-[50] flex items-center justify-center bg-[rgba(18,19,18,0.92)] p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center text-ivory"
            onClick={onClose}
          >
            <X size={28} />
          </button>
          <motion.img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? false : { opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="max-h-[90dvh] max-w-[min(1200px,100%)] object-contain"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
