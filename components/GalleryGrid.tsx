"use client";

import { useState } from "react";
import { gallery } from "@/lib/data";
import { Lightbox } from "./Lightbox";
import { PressButton } from "./Pressable";
import { ZoomImage } from "./ZoomImage";

const filters = [
  { id: "all", label: "All" },
  { id: "stay", label: "Suites" },
  { id: "dining", label: "Dining" },
  { id: "wellness", label: "Wellness" },
  { id: "land", label: "Nature" },
];

export function GalleryGrid() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  const items = gallery.filter((g) => filter === "all" || g.cat === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <PressButton
            key={f.id}
            className={`min-h-10 rounded-lg border px-3.5 text-ivory-soft ${
              filter === f.id ? "border-ivory text-ivory" : "border-ivory/20"
            }`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </PressButton>
        ))}
      </div>
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <figure key={item.src} className="mb-3 break-inside-avoid">
            <ZoomImage
              src={item.src}
              alt={item.alt}
              className="w-full rounded-lg"
              onOpen={(src, alt) => setOpen({ src, alt })}
            />
          </figure>
        ))}
      </div>
      <Lightbox src={open?.src ?? null} alt={open?.alt ?? ""} onClose={() => setOpen(null)} />
    </>
  );
}
