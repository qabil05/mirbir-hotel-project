"use client";
import { jsx as _jsx } from "/assets/vendor-v6/react-jsx-runtime.js";
import dynamic from "/assets/js-v6/shims/next-dynamic.js";
import { useEffect, useState } from "/assets/vendor-v6/react.js";
const CookieBar = dynamic(() => import("/assets/js-v6/components/CookieBar.js").then((m) => m.CookieBar), { ssr: false, loading: () => null });
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
