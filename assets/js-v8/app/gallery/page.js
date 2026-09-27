import { jsx as _jsx, jsxs as _jsxs } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
import { GalleryGrid } from "__MIRBIR_BASE__assets/js-v8/components/GalleryGrid.js";
import { PageHero } from "__MIRBIR_BASE__assets/js-v8/components/PageHero.js";
export const metadata = {
    title: "Gallery",
    description: "Photographs of MIRBIR rooms, dining, wellness, and the Datca cove.",
};
export default function GalleryPage() {
    return (_jsxs("main", { id: "main", children: [_jsx(PageHero, { image: "__MIRBIR_BASE__images/hero-cove.jpg", alt: "MIRBIR above the cove", title: "Gallery", text: "Stone, water, and the rooms in still light. Click any photograph to open it." }), _jsx("section", { className: "py-24", children: _jsx("div", { className: "mx-auto w-[min(1400px,calc(100%-48px))]", children: _jsx(GalleryGrid, {}) }) })] }));
}
