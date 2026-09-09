"use client";

import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import { ZoomImage } from "./ZoomImage";

const rail = [
  ["/images/dining.jpg", "Sunset dining", "A table on the terrace as the cove turns violet."],
  ["/images/spa.jpg", "Spa ritual", "Heat, oil, and an hour that belongs to no one else."],
  ["/images/breakfast.jpg", "Grove walk", "Olives, thyme, and the kitchen garden at first light."],
  ["/images/pool.jpg", "Poolside day", "Shade, still water, and lunch sent down from Defne."],
];

export function ExperiencePhotos() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  return (
    <>
      <section className="py-24">
        <div className="mx-auto w-[min(1400px,calc(100%-48px))]">
          <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto">
            {rail.map(([src, title, copy]) => (
              <article key={title} className="relative flex min-h-[420px] items-end overflow-hidden rounded-lg">
                <ZoomImage src={src} alt={title} className="absolute inset-0 h-full w-full" onOpen={(s, a) => setOpen({ src: s, alt: a })} />
                <div className="pointer-events-none relative z-[1] w-full bg-gradient-to-t from-[rgba(18,19,18,0.82)] p-6">
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="text-sm text-ivory-soft">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto grid w-[min(1400px,calc(100%-48px))] gap-6 md:grid-cols-2">
          <Reveal>
            <ZoomImage src="/images/dining.jpg" alt="Chef table at dusk" className="h-[360px] w-full rounded-lg" onOpen={(src, alt) => setOpen({ src, alt })} />
            <h3 className="mt-4 font-display text-[22px]">Chef's table</h3>
            <p className="text-muted">Eight seats in the kitchen. The catch, the oil, a slow service.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ZoomImage src="/images/hero-cove.jpg" alt="Cove path" className="h-[360px] w-full rounded-lg" onOpen={(src, alt) => setOpen({ src, alt })} />
            <h3 className="mt-4 font-display text-[22px]">Local discovery</h3>
            <p className="text-muted">Knidos at closing hour, a village bakery, a boat around the headland.</p>
          </Reveal>
        </div>
      </section>
      <Lightbox src={open?.src ?? null} alt={open?.alt ?? ""} onClose={() => setOpen(null)} />
    </>
  );
}
