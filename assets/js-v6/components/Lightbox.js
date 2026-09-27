"use client";
import { jsx as _jsx, jsxs as _jsxs } from "/assets/vendor-v6/react-jsx-runtime.js";
import Image from "/assets/js-v6/shims/next-image.js";
import { XIcon } from "/assets/js-v6/lib/icons.js";
import { AnimatePresence, motion, useReducedMotion } from "/assets/js-v6/lib/motion-lite.js";
import { useEffect } from "/assets/vendor-v6/react.js";
export function Lightbox({ src, alt, onClose, }) {
    const reduce = useReducedMotion();
    useEffect(() => {
        if (!src)
            return;
        const onKey = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [src, onClose]);
    return (_jsx(AnimatePresence, { children: src ? (_jsxs(motion.div, { role: "dialog", "aria-modal": "true", "aria-label": "Photograph", className: "fixed inset-0 z-[50] flex items-center justify-center bg-[rgba(18,19,18,0.92)] p-6", initial: reduce ? false : { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, children: [_jsx("button", { type: "button", "aria-label": "Close", className: "absolute right-4 top-4 grid h-11 w-11 place-items-center text-ivory", onClick: onClose, children: _jsx(XIcon, { size: 28 }) }), _jsx(motion.div, { onClick: (e) => e.stopPropagation(), initial: reduce ? false : { opacity: 0, scale: 0.92, y: 18 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: reduce ? undefined : { opacity: 0, scale: 0.96 }, transition: { type: "spring", stiffness: 220, damping: 24 }, className: "relative h-[90dvh] w-[min(1200px,100%)]", children: _jsx(Image, { src: src, alt: alt, fill: true, sizes: "(max-width: 768px) 100vw, 1200px", className: "object-contain" }) })] }, "lb")) : null }));
}
