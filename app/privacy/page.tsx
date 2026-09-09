import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for MIRBIR guests.",
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <article className="mx-auto max-w-[68ch] px-6 pb-20 pt-36">
        <h1 className="mb-6 font-display text-[40px]">Privacy</h1>
        <p className="text-ivory-soft">
          MIRBIR collects the name, email, phone, and stay dates you enter so we can host you. We do not sell this information. Booking details stay on the device you used unless you ask us to keep a copy for a future stay.
        </p>
        <p className="mt-4 text-ivory-soft">
          Cookies remember only that you accepted this notice and, if you choose, your last search dates. You can write to stay@mirbir.com to ask what we hold.
        </p>
      </article>
    </main>
  );
}
