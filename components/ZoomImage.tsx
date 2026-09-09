"use client";

import { motion, useReducedMotion } from "motion/react";

export function ZoomImage({
  src,
  alt,
  className = "",
  onOpen,
}: {
  src: string;
  alt: string;
  className?: string;
  onOpen?: (src: string, alt: string) => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(src, alt)}
      className={`block overflow-hidden ${onOpen ? "cursor-zoom-in" : ""} ${className}`}
      whileTap={reduce ? undefined : { scale: 0.99 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        whileHover={reduce ? undefined : { scale: 1.05 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.button>
  );
}
