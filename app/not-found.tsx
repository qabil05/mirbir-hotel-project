import { PressLink, btnPrimary } from "@/components/Pressable";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[70dvh] items-center">
      <div className="mx-auto w-[min(1400px,calc(100%-48px))]">
        <h1 className="mb-4 font-display text-[clamp(40px,6vw,68px)] leading-[1.08]">This path has no room</h1>
        <p className="mb-6 max-w-[65ch] text-lg text-ivory-soft">The page is not on the house map. Return to the cove, or ask stay@mirbir.com.</p>
        <PressLink href="/" className={btnPrimary}>Home</PressLink>
      </div>
    </main>
  );
}
