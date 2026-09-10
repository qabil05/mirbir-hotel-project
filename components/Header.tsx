import { nav } from "@/lib/data";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <>
      <a href="#main" className="absolute left-4 top-[-48px] z-[80] rounded-lg bg-ivory px-4 py-2 text-bg focus:top-4">Skip to content</a>
      <header className="fixed inset-x-0 top-0 z-[60] h-16 border-b border-ivory/10 bg-[rgba(18,19,18,0.72)] lg:bg-[rgba(18,19,18,0.48)] lg:backdrop-blur-[8px]">
        <div className="mx-auto grid h-full w-[min(1400px,calc(100%-32px))] grid-cols-[1fr_auto] items-center gap-6 md:w-[min(1400px,calc(100%-48px))] lg:grid-cols-[auto_1fr_auto]">
          <a href="/" className="font-display text-[12px] tracking-[0.28em]">MIRBIR</a>
          <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-[13px] tracking-wide text-ivory-soft transition-colors hover:text-ivory">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center justify-end gap-2 lg:flex">
            <a href="/book" className="inline-flex min-h-10 items-center rounded-lg bg-ivory px-4 text-[13px] text-bg">Book</a>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}
