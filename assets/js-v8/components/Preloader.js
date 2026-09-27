"use client";
import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { useEffect, useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
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
    if (!show)
        return null;
    return (_jsx("div", { "aria-hidden": "true", className: `mirbir-preloader ${leaving ? "mirbir-preloader--leaving" : ""}`, children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "m-0 font-display text-[13px] tracking-[0.28em]", children: "MIRBIR" }), _jsx("p", { className: "mt-3 text-[11px] tracking-[0.22em] text-muted", children: "DATCA / MEDITERRANEAN" }), _jsx("div", { className: "mirbir-preloader__line" })] }) }));
}
