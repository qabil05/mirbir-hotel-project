import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { Suspense } from "__MIRBIR_BASE__assets/vendor-v6/react.js";
import { BookingFlow } from "__MIRBIR_BASE__assets/js-v8/components/BookingFlow.js";
import { PageHero } from "__MIRBIR_BASE__assets/js-v8/components/PageHero.js";
export const metadata = {
    title: "Book",
    description: "Book your stay at MIRBIR Boutique Hotel & Resort on the Datca peninsula.",
};
export default function BookPage() {
    return (_jsxs("main", { id: "main", children: [_jsx(PageHero, { image: "__MIRBIR_BASE__images/horizon.jpg", alt: "Living room facing the Aegean at blue hour", title: "Your stay", text: "Arrival, departure, guests, and a room above the water.", compact: true }), _jsx("section", { className: "py-24", children: _jsx("div", { className: "mx-auto w-[min(1400px,calc(100%-48px))]", children: _jsx(Suspense, { fallback: _jsx("p", { className: "text-muted", children: "Loading your stay\u2026" }), children: _jsx(BookingFlow, {}) }) }) })] }));
}
