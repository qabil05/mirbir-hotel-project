import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PressLink, btnPrimary } from "@/components/Pressable";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Dining",
  description: "Defne at MIRBIR. Breakfast, a short lunch, and a long dinner above the cove.",
};

export default function DiningPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/plated.jpg"
        alt="Grilled fish and olive oil at candlelight"
        title="The table"
        text="One kitchen. The boats, the groves, and a sitting that does not hurry."
      />
      <section className="py-24">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] items-center gap-12 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">From the peninsula, not a menu of elsewhere</h2>
            <p className="mt-5 max-w-[48ch] text-lg text-ivory-soft">
              Chef Deniz Arslan cooks with Datca olive oil, village cheese, and whatever the boats bring before noon. Breakfast is mezze and honey. Dinner is one sitting.
            </p>
            <div className="mt-8 grid gap-5">
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Breakfast</strong>08:00-11:00, included with Cove and above.</div>
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Lunch</strong>13:00-15:00, short and shaded.</div>
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Dinner</strong>from 19:30. Reserve a terrace table with your room.</div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Image src="/images/breakfast.jpg" alt="Morning breakfast above olive groves" width={1400} height={900} sizes="(max-width: 768px) 100vw, 50vw" className="h-[360px] w-full rounded-lg object-cover md:h-[520px]" loading="lazy" />
          </Reveal>
        </div>
      </section>
      <section className="relative min-h-[70dvh] overflow-hidden">
        <Image src="/images/dining.jpg" alt="Evening table at Defne" fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[rgba(18,19,18,0.45)]" />
        <div className="relative z-[1] mx-auto flex min-h-[70dvh] w-[min(1400px,calc(100%-32px))] items-end pb-16 md:w-[min(1400px,calc(100%-48px))]">
          <div>
            <h2 className="max-w-[12ch] font-display text-[clamp(36px,6vw,72px)] leading-[0.95]">Days shaped by salt air, warm light and long tables.</h2>
            <div className="mt-8">
              <PressLink href="/book" className={btnPrimary}>Book your stay</PressLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
