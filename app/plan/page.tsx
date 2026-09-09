import type { Metadata } from "next";
import { Suspense } from "react";
import { EstimateBoard } from "@/components/EstimateBoard";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Plan your stay",
  description: "Plan a MIRBIR stay by room, nights, and how you would like to be hosted.",
};

export default function PlanPage() {
  return (
    <main id="main">
      <PageHero
        image="/images/horizon-night.jpg"
        alt="Night interior looking toward the water"
        title="Plan your stay"
        text="Room, nights, and how you would like to be hosted. A total, quietly."
        compact
      />
      <section className="py-24">
        <div className="mx-auto w-[min(1400px,calc(100%-32px))] md:w-[min(1400px,calc(100%-48px))]">
          <Suspense fallback={<p className="text-muted">Working the numbers.</p>}>
            <EstimateBoard />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
