import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PressLink, btnPrimary } from "@/components/Pressable";
import { Reveal } from "@/components/Reveal";
import { RoomSides } from "@/components/RoomSides";
import { rooms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stay",
  description: "Rooms at MIRBIR, from the Boathouse at the waterline to the Signature Villa on the rock.",
};

export default function StayPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/boathouse.jpg"
        alt="Timber boathouse bedroom facing open water"
        title="Stay"
        text="Six rooms on one hill. Water, grove, court, ridge, glass, and rock."
      />
      <section className="py-24">
        <div className="mx-auto grid w-[min(1400px,calc(100%-48px))] gap-20">
          {rooms.map((r, i) => (
            <Reveal key={r.id}>
              <article className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                <RoomSides images={r.images} />
                <div>
                  <p className="mb-2 text-sm text-bronze">{r.aspect}</p>
                  <h2 className="mb-3 font-display text-[clamp(32px,4.4vw,56px)] leading-[1.1]">{r.name}</h2>
                  <p className="mb-4 flex flex-wrap gap-4 text-sm text-muted">
                    <span>{r.guests} guests</span>
                    <span>{r.size} m²</span>
                    <span className="text-ivory">from EUR {r.price.toLocaleString()}/night</span>
                  </p>
                  <p className="mb-6 max-w-[65ch] text-lg text-ivory-soft">{r.long}</p>
                  <PressLink href={`/stay/${r.id}`} className={btnPrimary}>
                    View room
                  </PressLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
