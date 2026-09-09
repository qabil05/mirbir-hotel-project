import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of MIRBIR rooms, dining, wellness, and the Datca cove.",
};

export default function GalleryPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/hero-cove.jpg"
        alt="MIRBIR above the cove"
        title="Gallery"
        text="Stone, water, and the rooms in still light. Click any photograph to open it."
      />
      <section className="py-24">
        <div className="mx-auto w-[min(1400px,calc(100%-48px))]">
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
