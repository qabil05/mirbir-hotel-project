import type { Metadata } from "next";
import localFont from "next/font/local";
import { CookieBar } from "@/components/CookieBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/georgia.ttf", weight: "400", style: "normal" },
    { path: "./fonts/georgiab.ttf", weight: "700", style: "normal" },
    { path: "./fonts/georgiai.ttf", weight: "400", style: "italic" },
    { path: "./fonts/georgiaz.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-mirbir-display",
  display: "swap",
});

const ui = localFont({
  src: [
    { path: "./fonts/calibri.ttf", weight: "400", style: "normal" },
    { path: "./fonts/calibrib.ttf", weight: "700", style: "normal" },
    { path: "./fonts/calibrii.ttf", weight: "400", style: "italic" },
    { path: "./fonts/calibriz.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-mirbir-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mirbir.com"),
  title: {
    default: "MIRBIR Boutique Hotel & Resort",
    template: "%s | MIRBIR",
  },
  description:
    "A private escape on the Datca peninsula, shaped by sea, stone and silence.",
  openGraph: {
    images: ["/images/hero-cove.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Preloader />
        <div className="grain" aria-hidden />
        <div data-nav-sentinel className="absolute top-0 h-px w-px" />
        <Header />
        {children}
        <Footer />
        <CookieBar />
      </body>
    </html>
  );
}
