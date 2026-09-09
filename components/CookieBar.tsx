"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PressButton } from "./Pressable";

export function CookieBar() {
  const reduce = useReducedMotion();
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("mirbir-cookies")) setOn(true);
  }, []);

  return (
    <AnimatePresence>
      {on ? (
        <motion.div
          role="dialog"
          aria-label="Cookies"
          initial={reduce ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 16, opacity: 0 }}
          className="fixed inset-x-0 bottom-0 z-[55] flex items-center justify-between gap-4 border-t border-ivory/10 bg-[rgba(27,29,24,0.94)] px-6 py-2.5"
        >
          <p className="m-0 text-sm text-ivory-soft">
            We use quiet cookies to remember booking dates on this device.{" "}
            <Link href="/privacy" className="underline">Privacy</Link>
          </p>
          <PressButton
            className="inline-flex min-h-10 items-center rounded-lg bg-ivory px-4 text-sm text-bg"
            onClick={() => {
              localStorage.setItem("mirbir-cookies", "1");
              setOn(false);
            }}
          >
            Accept
          </PressButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
