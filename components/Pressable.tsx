"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const tap = { scale: 0.98 };
const hover = { y: -1 };
const MotionLink = motion.create(Link);

type Common = {
  children: ReactNode;
  className?: string;
};

export function PressLink({
  href,
  children,
  className = "",
}: Common & { href: string }) {
  const reduce = useReducedMotion();
  return (
    <MotionLink
      href={href}
      className={`inline-flex ${className}`}
      whileHover={reduce ? undefined : hover}
      whileTap={reduce ? undefined : tap}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </MotionLink>
  );
}

export function PressButton({
  children,
  className = "",
  type = "button",
  onClick,
  disabled,
}: Common & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={reduce || disabled ? undefined : hover}
      whileTap={reduce || disabled ? undefined : tap}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center min-h-11 px-5 rounded-lg bg-ivory text-bg text-[15px] whitespace-nowrap transition-colors duration-200 hover:bg-bronze hover:text-ivory";
export const btnGhost =
  "inline-flex items-center justify-center min-h-11 px-5 rounded-lg border border-sand/40 text-ivory text-[15px] whitespace-nowrap transition-colors duration-200 hover:border-bronze";
