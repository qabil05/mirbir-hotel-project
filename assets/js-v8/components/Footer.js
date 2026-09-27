import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import Image from "__MIRBIR_BASE__assets/js-v8/shims/next-image.js";

export function Footer() {
    return (_jsxs("footer", { className: "relative overflow-hidden", children: [
        _jsx(Image, { src: "__MIRBIR_BASE__images/sunset.jpg", alt: "Evening light over the MIRBIR cove", fill: true, sizes: "100vw", className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }),
        _jsx("div", { className: "absolute inset-0 bg-[rgba(18,19,18,0.62)]" }),
        _jsxs("div", { className: "relative z-[1] mx-auto w-[min(1400px,calc(100%-32px))] py-24 md:w-[min(1400px,calc(100%-48px))] md:py-32", children: [
            _jsx("p", { className: "m-0 max-w-[14ch] font-display text-[clamp(40px,7vw,88px)] leading-[0.95]", children: "Come a little closer to the sea." }),
            _jsx("div", { className: "mt-8", children: _jsx("a", { href: "__MIRBIR_BASE__book/", className: "inline-flex min-h-11 items-center justify-center rounded-lg bg-ivory px-5 text-[15px] whitespace-nowrap text-bg transition-[background-color,color] duration-200 hover:bg-bronze hover:text-ivory", children: "Book your stay" }) }),
            _jsxs("div", { className: "mt-16 grid gap-8 border-t border-ivory/15 pt-8 md:grid-cols-[1.4fr_1fr_1fr]", children: [
                _jsxs("div", { children: [
                    _jsx("p", { className: "m-0 font-display text-[12px] tracking-[0.28em]", children: "MIRBIR" }),
                    _jsx("p", { className: "mt-2 max-w-[36ch] text-ivory-soft", children: "Boutique Hotel & Resort. Datca peninsula, the quiet side of the Mediterranean." })
                ] }),
                _jsxs("ul", { className: "grid gap-2 p-0 text-ivory-soft", children: [
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__stay/", children: "Stay" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__experience/", children: "Experience" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__dining/", children: "Dining" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__wellness/", children: "Wellness" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__journal/", children: "Journal" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__plan/", children: "Plan stay" }) })
                ] }),
                _jsxs("ul", { className: "grid gap-2 p-0 text-ivory-soft", children: [
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__gallery/", children: "Gallery" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__location/", children: "Location" }) }),
                    _jsx("li", { children: _jsx("a", { href: "mailto:stay@mirbir.com", children: "stay@mirbir.com" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__privacy/", children: "Privacy" }) }),
                    _jsx("li", { children: _jsx("a", { href: "__MIRBIR_BASE__terms/", children: "Terms" }) })
                ] })
            ] }),
            _jsx("p", {
                className: "mt-10 border-t border-ivory/20 pt-8 text-ivory-soft",
                style: { fontSize: "clamp(15px, 1.15vw, 17px)", lineHeight: "1.65", maxWidth: "900px", fontWeight: 500 },
                children: "This website was created as a design template and concept showcase. It does not represent a real company, brand or products. Nothing is offered for sale."
            }),
            _jsx("small", { className: "mt-8 block text-[13px] text-muted", children: "© 2026 MIRBIR. Datca, Turkiye." })
        ] })
    ] }));
}
