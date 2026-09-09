import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { journal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from MIRBIR: olive groves, Aegean days, architecture, and the table.",
};

export default function JournalPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/grove-path.jpg"
        alt="Olive grove path toward the Aegean"
        title="Journal"
        text="Notes from the house. Slow mornings, long tables, and the architecture of quiet."
      />
      <section className="py-24">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 md:w-[min(1400px,calc(100%-48px))] md:grid-cols-2">
          {journal.map((story, i) => (
            <article key={story.slug} className={`group relative overflow-hidden rounded-lg ${i === 0 ? "md:col-span-2 min-h-[560px]" : "min-h-[420px]"}`}>
              <img src={story.image} alt={story.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,19,18,0.86)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h2 className="max-w-[16ch] font-display text-[clamp(28px,4vw,52px)] leading-none">{story.title}</h2>
                <p className="mt-3 max-w-[42ch] text-ivory-soft">{story.dek}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
