import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { PressLink, btnPrimary } from "__MIRBIR_BASE__assets/js-v8/components/Pressable.js";
export default function NotFound() {
    return (_jsx("main", { id: "main", className: "flex min-h-[70dvh] items-center", children: _jsxs("div", { className: "mx-auto w-[min(1400px,calc(100%-48px))]", children: [_jsx("h1", { className: "mb-4 font-display text-[clamp(40px,6vw,68px)] leading-[1.08]", children: "This path has no room" }), _jsx("p", { className: "mb-6 max-w-[65ch] text-lg text-ivory-soft", children: "The page is not on the house map. Return to the cove, or ask stay@mirbir.com." }), _jsx(PressLink, { href: "__MIRBIR_BASE__", className: btnPrimary, children: "Home" })] }) }));
}
