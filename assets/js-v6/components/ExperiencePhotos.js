"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "/assets/vendor-v6/react-jsx-runtime.js";
import { useState } from "/assets/vendor-v6/react.js";
import { Lightbox } from "./Lightbox.js";
import { Reveal } from "./Reveal.js";
import { ZoomImage } from "./ZoomImage.js";
const rail = [
    ["/images/dining.jpg", "Sunset dining", "A table on the terrace as the cove turns violet."],
    ["/images/spa.jpg", "Spa ritual", "Heat, oil, and an hour that belongs to no one else."],
    ["/images/breakfast.jpg", "Grove walk", "Olives, thyme, and the kitchen garden at first light."],
    ["/images/pool.jpg", "Poolside day", "Shade, still water, and lunch sent down from Defne."],
];
export function ExperiencePhotos() {
    const [open, setOpen] = useState(null);
    return (_jsxs(_Fragment, { children: [_jsx("section", { className: "py-24", children: _jsx("div", { className: "mx-auto w-[min(1400px,calc(100%-48px))]", children: _jsx("div", { className: "grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto", children: rail.map(([src, title, copy]) => (_jsxs("article", { className: "relative flex min-h-[420px] items-end overflow-hidden rounded-lg", children: [_jsx(ZoomImage, { src: src, alt: title, className: "absolute inset-0 h-full w-full", onOpen: (s, a) => setOpen({ src: s, alt: a }) }), _jsxs("div", { className: "pointer-events-none relative z-[1] w-full bg-gradient-to-t from-[rgba(18,19,18,0.82)] p-6", children: [_jsx("h3", { className: "font-display text-2xl", children: title }), _jsx("p", { className: "text-sm text-ivory-soft", children: copy })] })] }, title))) }) }) }), _jsx("section", { className: "pb-24", children: _jsxs("div", { className: "mx-auto grid w-[min(1400px,calc(100%-48px))] gap-6 md:grid-cols-2", children: [_jsxs(Reveal, { children: [_jsx(ZoomImage, { src: "/images/dining.jpg", alt: "Chef table at dusk", className: "h-[360px] w-full rounded-lg", onOpen: (src, alt) => setOpen({ src, alt }) }), _jsx("h3", { className: "mt-4 font-display text-[22px]", children: "Chef's table" }), _jsx("p", { className: "text-muted", children: "Eight seats in the kitchen. The catch, the oil, a slow service." })] }), _jsxs(Reveal, { delay: 0.08, children: [_jsx(ZoomImage, { src: "/images/hero-cove.jpg", alt: "Cove path", className: "h-[360px] w-full rounded-lg", onOpen: (src, alt) => setOpen({ src, alt }) }), _jsx("h3", { className: "mt-4 font-display text-[22px]", children: "Local discovery" }), _jsx("p", { className: "text-muted", children: "Knidos at closing hour, a village bakery, a boat around the headland." })] })] }) }), _jsx(Lightbox, { src: open?.src ?? null, alt: open?.alt ?? "", onClose: () => setOpen(null) })] }));
}
