import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Location",
  description: "Arrive at MIRBIR via Dalaman, Bodrum, or Datca harbour on the Datca peninsula.",
};

export default function LocationPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/sunset.jpg"
        alt="Stone jetty at sunset on the Datca peninsula"
        title="Location"
        text="A private bay on the south coast of the Datca peninsula."
      />
      <section className="py-24">
        <div className="mx-auto grid w-[min(1400px,calc(100%-48px))] items-start gap-12 md:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <h2 className="mb-4 font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">A private bay, south of the road</h2>
            <p className="mb-8 max-w-[65ch] text-lg text-ivory-soft">
              We sit south of the Datca-Knidos road, above a cove with no through traffic. The last stretch is graded stone. Tell us your flight and we will meet you.
            </p>
            <div className="grid gap-5">
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Dalaman (DLM)</strong>2 hours 10 minutes by private transfer.</div>
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Bodrum (BJV)</strong>2 hours 40 minutes, or a seasonal boat to our jetty.</div>
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Datca harbour</strong>12 minutes. We collect guests from the square.</div>
              <div className="border-t border-ivory/10 pt-4"><strong className="mb-1 block text-[13px] font-normal text-bronze">Knidos</strong>40 minutes west, best at closing hour.</div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <img src="/images/hero-cove.jpg" alt="MIRBIR terraces above the cove" className="h-[360px] w-full rounded-lg object-cover md:h-[560px]" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
