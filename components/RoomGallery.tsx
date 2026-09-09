"use client";

import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { ZoomImage } from "./ZoomImage";

export function RoomGallery({ cover, alt }: { cover: string; alt: string }) {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  return (
    <section className="pb-24">
      <div className="mx-auto grid w-[min(1400px,calc(100%-48px))] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <ZoomImage src={cover} alt={alt} className="min-h-[220px] rounded-lg lg:row-span-2 lg:min-h-[452px]" onOpen={(src, a) => setOpen({ src, alt: a })} />
        <ZoomImage src="/images/bathroom.jpg" alt="Stone soaking tub" className="min-h-[220px] rounded-lg" onOpen={(src, a) => setOpen({ src, alt: a })} />
        <ZoomImage src="/images/pool.jpg" alt="Resort pool at dusk" className="min-h-[220px] rounded-lg" onOpen={(src, a) => setOpen({ src, alt: a })} />
        <ZoomImage src="/images/hero-cove.jpg" alt="The cove below the rooms" className="min-h-[220px] rounded-lg sm:col-span-2" onOpen={(src, a) => setOpen({ src, alt: a })} />
      </div>
      <Lightbox src={open?.src ?? null} alt={open?.alt ?? ""} onClose={() => setOpen(null)} />
    </section>
  );
}
