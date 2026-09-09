import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/BookingFlow";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Book",
  description: "Book your stay at MIRBIR Boutique Hotel & Resort on the Datca peninsula.",
};

export default function BookPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/horizon.jpg"
        alt="Living room facing the Aegean at blue hour"
        title="Your stay"
        text="Arrival, departure, guests, and a room above the water."
        compact
      />
      <section className="py-24">
        <div className="mx-auto w-[min(1400px,calc(100%-48px))]">
          <Suspense fallback={<p className="text-muted">Loading your stay…</p>}>
            <BookingFlow />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
