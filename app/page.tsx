"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Lightbox } from "@/components/Lightbox";
import { PressLink, btnGhost, btnPrimary } from "@/components/Pressable";
import { Reveal } from "@/components/Reveal";
import { StayFinder } from "@/components/StayFinder";
import { StayHoverCard } from "@/components/StayHoverCard";
import { ZoomImage } from "@/components/ZoomImage";
import { journal, rooms } from "@/lib/data";

const featured = rooms;

export default function HomePage() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  return (
    <main id="main">
      <Hero />

      <section id="finder" className="border-b border-ivory/10 bg-bg-2 py-10">
        <div className="mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]">
          <p className="mb-4 text-[12px] tracking-[0.2em] text-muted">Your stay</p>
          <StayFinder hidePackages />
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] items-end gap-12 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <p className="m-0 text-[12px] tracking-[0.22em] text-bronze">The art of slow living</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(36px,5.5vw,72px)] leading-[0.95]">
              There are places designed to be visited. And places designed to be remembered.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[42ch] text-lg leading-relaxed text-ivory-soft">
              MIRBIR belongs to the latter. A private cove on the Datca peninsula, where stone, olive and salt air set the pace. Days shaped by warm light and long tables.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 grid w-[min(1400px,calc(100%-32px))] gap-4 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-[1.4fr_.8fr]">
          <Reveal>
            <ZoomImage src="/images/corridor.jpg" alt="Stone corridor opening to a courtyard of light" className="h-[420px] w-full rounded-lg md:h-[640px]" onOpen={(src, alt) => setOpen({ src, alt })} />
          </Reveal>
          <Reveal delay={0.1} className="md:mt-24">
            <ZoomImage src="/images/coffee.jpg" alt="Morning coffee on a stone terrace among olive trees" className="h-[320px] w-full rounded-lg md:h-[420px]" onOpen={(src, alt) => setOpen({ src, alt })} />
            <p className="mt-6 max-w-[36ch] text-ivory-soft">Arrive slowly. Stay longer. The quiet side of the Mediterranean.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]">
          <Reveal>
            <h2 className="mb-10 font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">Featured stays</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((r, i) => (
              <StayHoverCard key={r.id} room={r} tall={i === 0} />
            ))}
          </div>
          <div className="mt-8">
            <PressLink href="/stay" className={btnGhost}>All rooms</PressLink>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] items-center gap-12 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="text-[12px] tracking-[0.22em] text-bronze">Plan your stay</p>
            <h2 className="mt-3 font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">The cost of days on the hill</h2>
            <p className="mt-5 max-w-[46ch] text-lg text-ivory-soft">A quiet ledger: room, nights, how you are hosted, and the extras you actually want. No marketplace grid. A total, then a hold.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Garden", "Room only", "18% below listed"],
                ["Cove", "Breakfast included", "Listed nightly rate"],
                ["Olive", "Hammam and sunset table", "22% above listed"],
              ].map(([name, what, price]) => (
                <div key={name} className="border-t border-ivory/15 pt-4">
                  <p className="font-display text-2xl leading-none">{name}</p>
                  <p className="mt-2 text-sm text-ivory-soft">{what}</p>
                  <p className="mt-1 text-[12px] text-bronze">{price}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <PressLink href="/plan" className={btnPrimary}>Plan stay</PressLink>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <img src="/images/olive-terrace.jpg" alt="Olive Suite terrace above the groves" className="h-[420px] w-full rounded-lg object-cover md:h-[560px]" />
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-[80dvh] overflow-hidden">
        <img src="/images/grove-path.jpg" alt="Path through olive groves toward the Aegean" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(18,19,18,0.38)]" />
        <div className="relative z-[1] mx-auto flex min-h-[80dvh] w-[min(1400px,calc(100%-32px))] items-end pb-16 md:w-[min(1400px,calc(100%-48px))]">
          <h2 className="max-w-[14ch] font-display text-[clamp(40px,7vw,88px)] leading-[0.95]">Where the sea slows time.</h2>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]">
          <Reveal>
            <h2 className="mb-12 font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">Hours that do not hurry</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["/images/sunset.jpg", "Sunset ritual", "Oil lamps, the last light, a table for two above the water.", "/experience"],
              ["/images/plated.jpg", "The table", "Fish from Datca, oil from our trees, bread from the village oven.", "/dining"],
              ["/images/spa.jpg", "Wellness journey", "Heat, water, and the old cistern under the house.", "/wellness"],
            ].map(([src, title, copy, href]) => (
              <a key={title} href={href} className="group block">
                <div className="overflow-hidden rounded-lg">
                  <img src={src} alt={title} className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-[28px] leading-none">{title}</h3>
                <p className="mt-2 text-ivory-soft">{copy}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] items-center gap-12 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">Datca, a private bay</h2>
            <p className="mt-5 max-w-[42ch] text-lg text-ivory-soft">South of the main road, above a cove with no through traffic. Knidos is forty minutes west. The harbour is twelve.</p>
            <div className="mt-6">
              <PressLink href="/location" className={btnGhost}>How to arrive</PressLink>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ZoomImage src="/images/sunset.jpg" alt="Evening over the cove and stone jetty" className="h-[420px] w-full rounded-lg md:h-[560px]" onOpen={(src, alt) => setOpen({ src, alt })} />
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[0.95]">Journal</h2>
            <PressLink href="/journal" className={btnGhost}>All stories</PressLink>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(journal ?? []).slice(0, 3).map((story) => (
              <a key={story.slug} href="/journal" className="group relative block min-h-[420px] overflow-hidden rounded-lg">
                <img src={story.image} alt={story.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,19,18,0.85)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-[28px] leading-none">{story.title}</h3>
                  <p className="mt-2 text-sm text-ivory-soft">{story.dek}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Lightbox src={open?.src ?? null} alt={open?.alt ?? ""} onClose={() => setOpen(null)} />
    </main>
  );
}
