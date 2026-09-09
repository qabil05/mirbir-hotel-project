import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { RoomGallery } from "@/components/RoomGallery";
import { RoomSides } from "@/components/RoomSides";
import { StayFinder } from "@/components/StayFinder";
import { rooms } from "@/lib/data";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.id === slug);
  return { title: room?.name ?? "Stay", description: room?.blurb };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.id === slug);
  if (!room) notFound();

  return (
    <main id="main">
      <PageHero image={room.image} alt={room.alt} title={room.name} text={room.blurb} />
      <section className="py-24">
        <div className="mx-auto grid w-[min(1400px,calc(100%-48px))] gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <RoomSides images={room.images} heightClass="h-[280px] md:h-[420px]" className="mb-8" />
            <p className="max-w-[65ch] text-lg text-ivory-soft">{room.long}</p>
            <ul className="my-8 grid grid-cols-2 gap-x-6 gap-y-3 p-0">
              {room.amenities.map((a) => (
                <li key={a} className="list-none border-t border-ivory/10 pt-3 text-ivory-soft">
                  {a}
                </li>
              ))}
            </ul>
            <p className="text-muted">
              Housekeeping daily. Breakfast depends on the package you take. Children are welcome from Garden Villa upward.
            </p>
          </div>
          <aside className="sticky top-24 h-fit rounded-lg border border-ivory/10 bg-bg-2 p-6">
            <p className="text-muted">
              {room.guests} guests · {room.size} m² · {room.aspect}
            </p>
            <p className="my-4 font-display text-[28px]">
              EUR {room.price.toLocaleString()} <span className="font-sans text-sm text-muted">/ night</span>
            </p>
            <StayFinder />
          </aside>
        </div>
      </section>
      <RoomGallery cover={room.image} alt={room.alt} />
    </main>
  );
}
