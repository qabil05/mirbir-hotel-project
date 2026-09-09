import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "House terms for stays at MIRBIR.",
};

export default function TermsPage() {
  return (
    <main id="main">
      <article className="mx-auto max-w-[68ch] px-6 pb-20 pt-36">
        <h1 className="mb-6 font-display text-[40px]">Terms</h1>
        <p className="text-ivory-soft">
          A reservation is confirmed when you receive a MIRBIR reference. Cove rate stays may be changed or cancelled up to 7 days before arrival. Olive inclusive stays up to 14 days. Later changes follow the rate you chose.
        </p>
        <p className="mt-4 text-ivory-soft">
          The house is for guests listed on the reservation. Quiet hours begin at 23:00. Open flame is only allowed at staffed fire pits. MIRBIR is not responsible for weather on the water.
        </p>
      </article>
    </main>
  );
}
