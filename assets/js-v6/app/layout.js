import { jsx as _jsx, jsxs as _jsxs } from "/assets/vendor-v6/react-jsx-runtime.js";
import localFont from "/assets/js-v6/shims/next-font-local.js";
import { Footer } from "/assets/js-v6/components/Footer.js";
import { Header } from "/assets/js-v6/components/Header.js";
import { CookieNotice } from "/assets/js-v6/components/CookieNotice.js";
import "./globals.css";
const display = localFont({
    src: [{ path: "./fonts/georgia.woff2.js", weight: "400", style: "normal" }, { path: "./fonts/georgiab.woff2.js", weight: "700", style: "normal" }],
    variable: "--font-mirbir-display",
    display: "swap",
    preload: true,
});
const ui = localFont({
    src: [{ path: "./fonts/calibri.woff2.js", weight: "400", style: "normal" }, { path: "./fonts/calibrib.woff2.js", weight: "700", style: "normal" }],
    variable: "--font-mirbir-ui",
    display: "swap",
    preload: true,
});
export const metadata = {
    metadataBase: new URL("https://mirbir.com"),
    title: { default: "MIRBIR Boutique Hotel & Resort", template: "%s | MIRBIR" },
    description: "A private escape on the Datca peninsula, shaped by sea, stone and silence.",
    openGraph: { images: ["/images/hero-cove.jpg"] },
};
export default function RootLayout({ children }) {
    return (_jsx("html", { lang: "en", className: `${display.variable} ${ui.variable}`, suppressHydrationWarning: true, children: _jsxs("body", { className: "font-sans antialiased", suppressHydrationWarning: true, children: [_jsx(CookieNotice, {}), _jsx("div", { "data-nav-sentinel": true, className: "absolute top-0 h-px w-px" }), _jsx(Header, {}), children, _jsx(Footer, {})] }) }));
}
