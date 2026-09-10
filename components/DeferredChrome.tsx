"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieBar = dynamic(
  () => import("@/components/CookieBar").then((m) => m.CookieBar),
  { ssr: false, loading: () => null },
);

export function DeferredChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2600 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(start, 1600);
    return () => window.clearTimeout(id);
  }, []);

  return ready ? <CookieBar /> : null;
}
