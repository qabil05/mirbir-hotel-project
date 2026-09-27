"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import Image from "__MIRBIR_BASE__assets/js-v8/shims/next-image.js";
import dynamic from "__MIRBIR_BASE__assets/js-v8/shims/next-dynamic.js";
import { useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
const Lightbox = dynamic(() => import("./Lightbox.js").then((m) => m.Lightbox), { ssr: false });
export function ZoomImage({ src, alt, className = "", onOpen, }) {
    const [localOpen, setLocalOpen] = useState(false);
    const handleOpen = () => {
        if (onOpen)
            onOpen(src, alt);
        else
            setLocalOpen(true);
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", onClick: handleOpen, className: `group relative block overflow-hidden ${className}`, children: _jsx("span", { className: "absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.02]", children: _jsx(Image, { src: src, alt: alt, fill: true, sizes: "(max-width: 768px) 100vw, 70vw", className: "object-cover", loading: "lazy" }) }) }), !onOpen && localOpen ? _jsx(Lightbox, { src: src, alt: alt, onClose: () => setLocalOpen(false) }) : null] }));
}
