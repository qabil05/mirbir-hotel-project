import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import Image from "__MIRBIR_BASE__assets/js-v8/shims/next-image.js";
import { PageHero } from "__MIRBIR_BASE__assets/js-v8/components/PageHero.js";
export const metadata = {
    title: "Experience",
    description: "Sunset ritual, olive grove mornings, private table, and the Aegean by boat.",
};
const scenes = [
    { n: "01", title: "The Aegean by boat", copy: "A quiet circuit of the headland. No itinerary longer than the light.", img: "__MIRBIR_BASE__images/boathouse-deck.jpg" },
    { n: "02", title: "Sunset ritual", copy: "Oil lamps, the last light, a table for two above the water.", img: "__MIRBIR_BASE__images/sunset.jpg" },
    { n: "03", title: "Olive grove morning", copy: "First light, dry grass, and the path that always leads to water.", img: "__MIRBIR_BASE__images/grove-path.jpg" },
    { n: "04", title: "Private table", copy: "Eight seats in the kitchen. The catch, the oil, a slow service.", img: "__MIRBIR_BASE__images/plated.jpg" },
    { n: "05", title: "Coastal walk", copy: "Knidos at closing hour. The road is stone. The sea is closer than it looks.", img: "__MIRBIR_BASE__images/hero-cove.jpg" },
    { n: "06", title: "Wellness journey", copy: "Heat, water, and the old cistern under the house.", img: "__MIRBIR_BASE__images/spa.jpg" },
];
export default function ExperiencePage() {
    return (_jsxs("main", { id: "main", children: [_jsx(PageHero, { image: "__MIRBIR_BASE__images/grove-path.jpg", alt: "Olive grove path toward the Aegean", title: "Experience", text: "Days shaped by water, kitchens, and the hill behind the house." }), scenes.map((s, i) => (_jsx("section", { className: `py-20 ${i % 2 ? "bg-bg-2" : ""}`, children: _jsxs("div", { className: `mx-auto grid w-[min(1400px,calc(100%-32px))] items-center gap-10 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`, children: [_jsx(Image, { src: s.img, alt: s.title, width: 1400, height: 900, sizes: "(max-width: 768px) 100vw, 50vw", className: "h-[360px] w-full rounded-lg object-cover md:h-[520px]", loading: "lazy" }), _jsxs("div", { children: [_jsx("p", { className: "text-[12px] tracking-[0.22em] text-bronze", children: s.n }), _jsx("h2", { className: "mt-3 font-display text-[clamp(32px,5vw,56px)] leading-[0.95]", children: s.title }), _jsx("p", { className: "mt-4 max-w-[42ch] text-lg text-ivory-soft", children: s.copy })] })] }) }, s.title)))] }));
}
