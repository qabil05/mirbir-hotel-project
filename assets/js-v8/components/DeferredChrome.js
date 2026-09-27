"use client";
import { jsx as _jsx } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import dynamic from "__MIRBIR_BASE__assets/js-v8/shims/next-dynamic.js";
import { useEffect, useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
const CookieBar = dynamic(() => import("__MIRBIR_BASE__assets/js-v8/components/CookieBar.js").then((m) => m.CookieBar), { ssr: false, loading: () => null });
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
    return ready ? _jsx(CookieBar, {}) : null;
}
