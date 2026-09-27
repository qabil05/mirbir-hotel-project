import { jsx as _jsx } from "/assets/vendor-v6/react-jsx-runtime.js";
export function Reveal({ children, className = "", delay = 0, }) {
    return (_jsx("div", { "data-reveal": true, style: { "--reveal-delay": `${delay}s` }, className: className, children: children }));
}
