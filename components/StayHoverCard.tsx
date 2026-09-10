import Image from "next/image";
import type { Room } from "@/lib/data";

export function StayHoverCard({ room, tall = false }: { room: Room; tall?: boolean }) {
  const next = room.images.find((img) => img.src !== room.image)?.src || room.images[1]?.src || room.image;
  return (
    <a
      href={`/stay/${room.id}`}
      className={`group relative block min-h-[380px] overflow-hidden rounded-lg ${tall ? "md:min-h-[460px]" : ""}`}
    >
      <Image src={room.image} alt={room.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
      <Image src={next} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="absolute inset-0 object-cover opacity-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-visible:opacity-100" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,19,18,0.88)] via-[rgba(18,19,18,0.25)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="inline-flex rounded-full bg-[rgba(18,19,18,0.72)] px-3 py-1 text-[12px] tracking-[0.12em] text-ivory">{room.size} m2 · {room.guests} guests</p>
        <h3 className="mt-3 font-display text-[clamp(28px,3vw,44px)] leading-none text-ivory transition-transform duration-500 group-hover:-translate-y-1">{room.name}</h3>
        <p className="mt-2 max-w-[42ch] text-ivory">{room.blurb}</p>
        <p className="mt-4 text-sm text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">Explore · from EUR {room.price}</p>
      </div>
    </a>
  );
}
