import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <Image
        src="/images/sunset.jpg"
        alt="Evening light over the MIRBIR cove"
        fill
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[rgba(18,19,18,0.62)]" />
      <div className="relative z-[1] mx-auto w-[min(1400px,calc(100%-32px))] py-24 md:w-[min(1400px,calc(100%-48px))] md:py-32">
        <p className="m-0 max-w-[14ch] font-display text-[clamp(40px,7vw,88px)] leading-[0.95]">
          Come a little closer to the sea.
        </p>
        <div className="mt-8">
          <a href="/book" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ivory px-5 text-[15px] whitespace-nowrap text-bg transition-[background-color,color] duration-200 hover:bg-bronze hover:text-ivory">
            Book your stay
          </a>
        </div>
        <div className="mt-16 grid gap-8 border-t border-ivory/15 pt-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="m-0 font-display text-[12px] tracking-[0.28em]">MIRBIR</p>
            <p className="mt-2 max-w-[36ch] text-ivory-soft">Boutique Hotel & Resort. Datca peninsula, the quiet side of the Mediterranean.</p>
          </div>
          <ul className="grid gap-2 p-0 text-ivory-soft">
            <li><a href="/stay">Stay</a></li>
            <li><a href="/experience">Experience</a></li>
            <li><a href="/dining">Dining</a></li>
            <li><a href="/wellness">Wellness</a></li>
            <li><a href="/journal">Journal</a></li>
            <li><a href="/plan">Plan stay</a></li>
          </ul>
          <ul className="grid gap-2 p-0 text-ivory-soft">
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/location">Location</a></li>
            <li><a href="mailto:stay@mirbir.com">stay@mirbir.com</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
          </ul>
        </div>
        <small className="mt-8 block text-[13px] text-muted">&copy; 2026 MIRBIR. Datca, Turkiye.</small>
      </div>
    </footer>
  );
}
