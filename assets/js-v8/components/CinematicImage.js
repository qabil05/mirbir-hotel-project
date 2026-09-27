import { jsx as _jsx } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import Image from "__MIRBIR_BASE__assets/js-v8/shims/next-image.js";
export function CinematicImage({ src, alt, className = "", }) {
    return (_jsx("div", { className: `group relative block overflow-hidden ${className}`, children: _jsx(Image, { src: src, alt: alt, fill: true, sizes: "(max-width: 768px) 100vw, 70vw", className: "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]", loading: "lazy" }) }));
}
