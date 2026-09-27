import { jsx as _jsx, jsxs as _jsxs } from "/assets/vendor-v6/react-jsx-runtime.js";
import { PageHero } from "/assets/js-v6/components/PageHero.js";
import { PressLink, btnPrimary } from "/assets/js-v6/components/Pressable.js";
import { Reveal } from "/assets/js-v6/components/Reveal.js";
import { RoomSides } from "/assets/js-v6/components/RoomSides.js";
import { rooms } from "/assets/js-v6/lib/data.js";
export const metadata = {
    title: "Stay",
    description: "Rooms at MIRBIR, from the Boathouse at the waterline to the Signature Villa on the rock.",
};
export default function StayPage() {
    return (_jsxs("main", { id: "main", children: [_jsx(PageHero, { image: "/images/boathouse.jpg", alt: "Timber boathouse bedroom facing open water", title: "Stay", text: "Six rooms on one hill. Water, grove, court, ridge, glass, and rock." }), _jsx("section", { className: "py-24", children: _jsx("div", { className: "mx-auto grid w-[min(1400px,calc(100%-48px))] gap-20", children: rooms.map((r, i) => (_jsx(Reveal, { children: _jsxs("article", { className: `grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`, children: [_jsx(RoomSides, { images: r.images }), _jsxs("div", { children: [_jsx("p", { className: "mb-2 text-sm text-bronze", children: r.aspect }), _jsx("h2", { className: "mb-3 font-display text-[clamp(32px,4.4vw,56px)] leading-[1.1]", children: r.name }), _jsxs("p", { className: "mb-4 flex flex-wrap gap-4 text-sm text-muted", children: [_jsxs("span", { children: [r.guests, " guests"] }), _jsxs("span", { children: [r.size, " m\u00B2"] }), _jsxs("span", { className: "text-ivory", children: ["from EUR ", r.price.toLocaleString(), "/night"] })] }), _jsx("p", { className: "mb-6 max-w-[65ch] text-lg text-ivory-soft", children: r.long }), _jsx(PressLink, { href: `/stay/${r.id}/`, className: btnPrimary, children: "View room" })] })] }) }, r.id))) }) })] }));
}
