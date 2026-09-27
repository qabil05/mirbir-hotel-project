import { jsx as _jsx } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
export function PressLink({ href, children, className = "" }) {
    return _jsx("a", { href: href, className: `inline-flex transition-transform duration-200 hover:-translate-y-px active:scale-[0.98] ${className}`, children: children });
}
export function PressButton({ children, className = "", type = "button", onClick, disabled, ...rest }) {
    return _jsx("button", { type: type, disabled: disabled, onClick: onClick, className: `transition-transform duration-200 hover:-translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${className}`, ...rest, children: children });
}
export const btnPrimary = "inline-flex items-center justify-center min-h-11 px-5 rounded-lg bg-ivory text-bg text-[15px] whitespace-nowrap transition-[background-color,color] duration-200 hover:bg-bronze hover:text-ivory";
export const btnGhost = "inline-flex items-center justify-center min-h-11 px-5 rounded-lg border border-sand/40 text-ivory text-[15px] whitespace-nowrap transition-[border-color] duration-200 hover:border-bronze";
