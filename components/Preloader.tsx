"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hideAfter = window.setTimeout(() => setLeaving(true), prefersReduced ? 60 : 520);
    const removeAfter = window.setTimeout(() => setShow(false), prefersReduced ? 120 : 980);

    return () => {
      window.clearTimeout(hideAfter);
      window.clearTimeout(removeAfter);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`mirbir-preloader ${leaving ? "mirbir-preloader--leaving" : ""}`}
    >
      <div className="text-center">
        <p className="m-0 font-display text-[13px] tracking-[0.28em]">MIRBIR</p>
        <p className="mt-3 text-[11px] tracking-[0.22em] text-muted">DATCA / MEDITERRANEAN</p>
        <div className="mirbir-preloader__line" />
      </div>
    </div>
  );
}
