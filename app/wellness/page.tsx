import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Wellness",
  description: "Spa, hammam, and pool at MIRBIR on the Datca peninsula.",
};

export default function WellnessPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/spa.jpg"
        alt="Vaulted stone spa treatment room"
        title="Wellness"
        text="Heat, water, and the old cistern under the house."
      />
      <section className="py-24">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] items-center gap-12 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <Image src="/images/pool.jpg" alt="Infinity pool at dusk" width={1400} height={900} sizes="(max-width: 768px) 100vw, 50vw" className="h-[360px] w-full rounded-lg object-cover md:h-[560px]" loading="lazy" />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">The hammam, the pool, the hour with no clock</h2>
            <p className="mt-5 max-w-[48ch] text-lg text-ivory-soft">
              Treatments use olive oil, salt, and slow heat. Book a private ritual with your stay, or spend the afternoon in the water.
            </p>
            <div className="mt-8 grid gap-5">
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Hammam</strong>Private hours from 10:00 to 18:00.</div>
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Pool</strong>Open from first light until 21:00.</div>
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Movement</strong>Morning stretch on the upper terrace, weather allowing.</div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
