"use client";
import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import Link from "__MIRBIR_BASE__assets/js-v8/shims/next-link.js";
import { useEffect, useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
export function CookieBar() {
    const [on, setOn] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (window.localStorage.getItem("mirbir-cookies"))
            return;
        setOn(true);
    }, []);
    useEffect(() => {
        if (!on)
            return;
        const id = window.requestAnimationFrame(() => setVisible(true));
        return () => window.cancelAnimationFrame(id);
    }, [on]);
    if (!on)
        return null;
    return (_jsxs("div", { role: "dialog", "aria-label": "Cookies", className: `mirbir-cookiebar ${visible ? "mirbir-cookiebar--visible" : ""}`, children: [_jsxs("p", { className: "m-0 text-sm text-ivory-soft", children: ["We use quiet cookies to remember booking dates on this device.", " ", _jsx(Link, { href: "__MIRBIR_BASE__privacy/", className: "underline", children: "Privacy" })] }), _jsx("button", { type: "button", className: "inline-flex min-h-10 items-center rounded-lg bg-ivory px-4 text-sm text-bg transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]", onClick: () => {
                    window.localStorage.setItem("mirbir-cookies", "1");
                    setVisible(false);
                    window.setTimeout(() => setOn(false), 180);
                }, children: "Accept" })] }));
}
