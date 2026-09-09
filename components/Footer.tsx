import Link from "next/link";
import { PressLink, btnPrimary } from "./Pressable";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <img
        src="/images/sunset.jpg"
        alt="Evening light over the MIRBIR cove"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(18,19,18,0.62)]" />
      <div className="relative z-[1] mx-auto w-[min(1400px,calc(100%-32px))] py-24 md:w-[min(1400px,calc(100%-48px))] md:py-32">
        <p className="m-0 max-w-[14ch] font-display text-[clamp(40px,7vw,88px)] leading-[0.95]">
          Come a little closer to the sea.
        </p>
        <div className="mt-8">
          <PressLink href="/book" className={btnPrimary}>
            Book your stay
          </PressLink>
        </div>
        <div className="mt-16 grid gap-8 border-t border-ivory/15 pt-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="m-0 font-display text-[12px] tracking-[0.28em]">MIRBIR</p>
            <p className="mt-2 max-w-[36ch] text-ivory-soft">Boutique Hotel & Resort. Datca peninsula, the quiet side of the Mediterranean.</p>
          </div>
          <ul className="grid gap-2 p-0 text-ivory-soft">
            <li><Link href="/stay">Stay</Link></li>
            <li><Link href="/experience">Experience</Link></li>
            <li><Link href="/dining">Dining</Link></li>
            <li><Link href="/wellness">Wellness</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/plan">Plan stay</Link></li>
          </ul>
          <ul className="grid gap-2 p-0 text-ivory-soft">
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/location">Location</Link></li>
            <li><a href="mailto:stay@mirbir.com">stay@mirbir.com</a></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
        <small className="mt-8 block text-[13px] text-muted">&copy; 2026 MIRBIR. Datca, Turkiye.</small>
      </div>
    </footer>
  );
}
