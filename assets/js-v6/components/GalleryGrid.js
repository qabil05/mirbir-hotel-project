"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "/assets/vendor-v6/react-jsx-runtime.js";
import { useState } from "/assets/vendor-v6/react.js";
import { gallery } from "/assets/js-v6/lib/data.js";
import { Lightbox } from "./Lightbox.js";
import { PressButton } from "./Pressable.js";
import { ZoomImage } from "./ZoomImage.js";
const filters = [
    { id: "all", label: "All" },
    { id: "stay", label: "Suites" },
    { id: "dining", label: "Dining" },
    { id: "wellness", label: "Wellness" },
    { id: "land", label: "Nature" },
];
export function GalleryGrid() {
    const [filter, setFilter] = useState("all");
    const [open, setOpen] = useState(null);
    const items = gallery.filter((g) => filter === "all" || g.cat === filter);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-8 flex flex-wrap gap-2", children: filters.map((f) => (_jsx(PressButton, { className: `min-h-10 rounded-lg border px-3.5 text-ivory-soft ${filter === f.id ? "border-ivory text-ivory" : "border-ivory/20"}`, onClick: () => setFilter(f.id), children: f.label }, f.id))) }), _jsx("div", { className: "columns-1 gap-3 sm:columns-2 lg:columns-3", children: items.map((item) => (_jsx("figure", { className: "mb-3 break-inside-avoid", children: _jsx(ZoomImage, { src: item.src, alt: item.alt, className: "w-full rounded-lg", onOpen: (src, alt) => setOpen({ src, alt }) }) }, item.src))) }), _jsx(Lightbox, { src: open?.src ?? null, alt: open?.alt ?? "", onClose: () => setOpen(null) })] }));
}
