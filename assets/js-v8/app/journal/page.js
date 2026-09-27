import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import Image from "__MIRBIR_BASE__assets/js-v8/shims/next-image.js";
import { PageHero } from "__MIRBIR_BASE__assets/js-v8/components/PageHero.js";
import { journal } from "__MIRBIR_BASE__assets/js-v8/lib/data.js";
export const metadata = {
    title: "Journal",
    description: "Notes from MIRBIR: olive groves, Aegean days, architecture, and the table.",
};
export default function JournalPage() {
    return (_jsxs("main", { id: "main", children: [_jsx(PageHero, { image: "__MIRBIR_BASE__images/grove-path.jpg", alt: "Olive grove path toward the Aegean", title: "Journal", text: "Notes from the house. Slow mornings, long tables, and the architecture of quiet." }), _jsx("section", { className: "py-24", children: _jsx("div", { className: "mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-2", children: journal.map((story, i) => (_jsxs("article", { className: `group relative overflow-hidden rounded-lg ${i === 0 ? "md:col-span-2 min-h-[560px]" : "min-h-[420px]"}`, children: [_jsx(Image, { src: story.image, alt: story.title, fill: true, sizes: "(max-width: 768px) 100vw, 33vw", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105", loading: "lazy" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[rgba(18,19,18,0.86)] to-transparent" }), _jsxs("div", { className: "absolute inset-x-0 bottom-0 p-8", children: [_jsx("h2", { className: "max-w-[16ch] font-display text-[clamp(28px,4vw,52px)] leading-none", children: story.title }), _jsx("p", { className: "mt-3 max-w-[42ch] text-ivory-soft", children: story.dek })] })] }, story.slug))) }) })] }));
}
