"use client";
import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { useState } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
import { Lightbox } from "./Lightbox.js";
import { ZoomImage } from "./ZoomImage.js";
export function RoomGallery({ cover, alt }) {
    const [open, setOpen] = useState(null);
    return (_jsxs("section", { className: "pb-24", children: [_jsxs("div", { className: "mx-auto grid w-[min(1400px,calc(100%-48px))] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]", children: [_jsx(ZoomImage, { src: cover, alt: alt, className: "min-h-[220px] rounded-lg lg:row-span-2 lg:min-h-[452px]", onOpen: (src, a) => setOpen({ src, alt: a }) }), _jsx(ZoomImage, { src: "__MIRBIR_BASE__images/bathroom.jpg", alt: "Stone soaking tub", className: "min-h-[220px] rounded-lg", onOpen: (src, a) => setOpen({ src, alt: a }) }), _jsx(ZoomImage, { src: "__MIRBIR_BASE__images/pool.jpg", alt: "Resort pool at dusk", className: "min-h-[220px] rounded-lg", onOpen: (src, a) => setOpen({ src, alt: a }) }), _jsx(ZoomImage, { src: "__MIRBIR_BASE__images/hero-cove.jpg", alt: "The cove below the rooms", className: "min-h-[220px] rounded-lg sm:col-span-2", onOpen: (src, a) => setOpen({ src, alt: a }) })] }), _jsx(Lightbox, { src: open?.src ?? null, alt: open?.alt ?? "", onClose: () => setOpen(null) })] }));
}
