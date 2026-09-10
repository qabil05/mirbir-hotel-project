"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieBar() {
  const [on, setOn] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("mirbir-cookies")) return;
    setOn(true);
  }, []);

  useEffect(() => {
    if (!on) return;
    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, [on]);

  if (!on) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className={`mirbir-cookiebar ${visible ? "mirbir-cookiebar--visible" : ""}`}
    >
      <p className="m-0 text-sm text-ivory-soft">
        We use quiet cookies to remember booking dates on this device.{" "}
        <Link href="/privacy" className="underline">Privacy</Link>
      </p>
      <button
        type="button"
        className="inline-flex min-h-10 items-center rounded-lg bg-ivory px-4 text-sm text-bg transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]"
        onClick={() => {
          window.localStorage.setItem("mirbir-cookies", "1");
          setVisible(false);
          window.setTimeout(() => setOn(false), 180);
        }}
      >
        Accept
      </button>
    </div>
  );
}
