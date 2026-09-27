import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
export default function Loading() {
    return (_jsxs("main", { className: "grid min-h-[70dvh] place-items-center bg-bg text-ivory", "aria-busy": "true", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "font-display text-[13px] tracking-[0.28em]", children: "MIRBIR" }), _jsx("div", { className: "mx-auto mt-5 h-px w-20 overflow-hidden bg-ivory/10", children: _jsx("span", { className: "block h-full w-1/2 animate-[loadingBar_900ms_ease-in-out_infinite] bg-ivory/70" }) })] }), _jsx("style", { children: `@keyframes loadingBar{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}` })] }));
}
