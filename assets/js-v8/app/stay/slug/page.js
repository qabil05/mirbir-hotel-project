import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { notFound } from "__MIRBIR_BASE__assets/js-v8/shims/next-navigation.js";
import { PageHero } from "__MIRBIR_BASE__assets/js-v8/components/PageHero.js";
import { RoomGallery } from "__MIRBIR_BASE__assets/js-v8/components/RoomGallery.js";
import { RoomSides } from "__MIRBIR_BASE__assets/js-v8/components/RoomSides.js";
import { StayFinder } from "__MIRBIR_BASE__assets/js-v8/components/StayFinder.js";
import { rooms } from "__MIRBIR_BASE__assets/js-v8/lib/data.js";
export function generateStaticParams() {
    return rooms.map((r) => ({ slug: r.id }));
}
export async function generateMetadata({ params, }) {
    const { slug } = await params;
    const room = rooms.find((r) => r.id === slug);
    return { title: room?.name ?? "Stay", description: room?.blurb };
}
export default function RoomPage({ params, }) {
    const { slug } = params;
    const room = rooms.find((r) => r.id === slug);
    if (!room)
        notFound();
    return (_jsxs("main", { id: "main", children: [_jsx(PageHero, { image: room.image, alt: room.alt, title: room.name, text: room.blurb }), _jsx("section", { className: "py-24", children: _jsxs("div", { className: "mx-auto grid w-[min(1400px,calc(100%-48px))] gap-12 lg:grid-cols-[1.15fr_.85fr]", children: [_jsxs("div", { children: [_jsx(RoomSides, { images: room.images, heightClass: "h-[280px] md:h-[420px]", className: "mb-8" }), _jsx("p", { className: "max-w-[65ch] text-lg text-ivory-soft", children: room.long }), _jsx("ul", { className: "my-8 grid grid-cols-2 gap-x-6 gap-y-3 p-0", children: room.amenities.map((a) => (_jsx("li", { className: "list-none border-t border-ivory/10 pt-3 text-ivory-soft", children: a }, a))) }), _jsx("p", { className: "text-muted", children: "Housekeeping daily. Breakfast depends on the package you take. Children are welcome from Garden Villa upward." })] }), _jsxs("aside", { className: "sticky top-24 h-fit rounded-lg border border-ivory/10 bg-bg-2 p-6", children: [_jsxs("p", { className: "text-muted", children: [room.guests, " guests \u00B7 ", room.size, " m\u00B2 \u00B7 ", room.aspect] }), _jsxs("p", { className: "my-4 font-display text-[28px]", children: ["EUR ", room.price.toLocaleString(), " ", _jsx("span", { className: "font-sans text-sm text-muted", children: "/ night" })] }), _jsx(StayFinder, {})] })] }) }), _jsx(RoomGallery, { cover: room.image, alt: room.alt })] }));
}
