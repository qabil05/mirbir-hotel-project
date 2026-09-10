import type { Metadata } from "next";
import { EstimateBoard } from "@/components/EstimateBoard";
import { PageHero } from "@/components/PageHero";
import { addDays, todayLocal } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Plan your stay",
  description: "Plan a MIRBIR stay by room, nights, and how you would like to be hosted.",
};

type PlanSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PlanPage({ searchParams }: { searchParams: Promise<PlanSearchParams> }) {
  const params = await searchParams;
  const checkin = first(params.checkin) || todayLocal();
  const checkout = first(params.checkout) || addDays(checkin, 3);

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
          <EstimateBoard
            initial={{
              room: first(params.room),
              package: first(params.package),
              checkin,
              checkout,
              adults: first(params.adults),
              guests: first(params.guests),
              children: first(params.children),
            }}
          />
        </div>
      </section>
    </main>
  );
}
