import Image from "next/image";
import { PressLink, btnGhost, btnPrimary } from "./Pressable";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden pb-16">
      <div className="mirbir-hero-image absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-cove.jpg"
          alt="Stone suites terraced above a private Aegean cove at golden hour"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,19,18,0.28)] via-[rgba(18,19,18,0.22)] to-[rgba(18,19,18,0.82)]" />
      <div className="relative z-[1] mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]">
        <p className="hero-kicker m-0 text-[12px] tracking-[0.32em] text-ivory">MIRBIR</p>
        <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(40px,7vw,88px)] font-normal leading-[0.95] tracking-[-0.03em] text-balance">
          A private escape shaped by sea, stone and silence.
        </h1>
        <p className="hero-copy mt-5 max-w-[38ch] text-lg text-ivory">
          A secluded retreat where architecture, nature and slow living meet.
        </p>
        <div className="hero-actions mt-8 flex flex-wrap gap-3">
          <PressLink href="/book" className={btnPrimary}>Book your stay</PressLink>
          <PressLink href="#finder" className={btnGhost}>Explore MIRBIR</PressLink>
        </div>
      </div>
    </section>
  );
}
