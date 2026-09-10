import Image from "next/image";

export function PageHero({ image, alt, title, text, compact = false }: { image: string; alt: string; title: string; text: string; compact?: boolean }) {
  return (
    <section className={`page-hero relative flex items-end overflow-hidden pb-12 ${compact ? "min-h-[42dvh]" : "min-h-[62dvh]"}`}>
      <div className="page-hero__media absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,19,18,0.45)] via-[rgba(18,19,18,0.55)] to-[rgba(18,19,18,0.92)]" />
      <div className="relative z-[1] mx-auto w-[min(1400px,calc(100%-48px))]">
        <h1 className="page-hero__title mb-3 max-w-[12ch] font-display text-[clamp(40px,6vw,68px)] leading-[1.08] tracking-[-0.03em] text-ivory drop-shadow-[0_2px_18px_rgba(18,19,18,0.65)]">{title}</h1>
        <p className="page-hero__copy m-0 max-w-[42ch] text-ivory drop-shadow-[0_1px_12px_rgba(18,19,18,0.7)]">{text}</p>
      </div>
    </section>
  );
}
