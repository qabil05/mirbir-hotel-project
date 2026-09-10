export default function Loading() {
  return (
    <main className="grid min-h-[70dvh] place-items-center bg-bg text-ivory" aria-busy="true">
      <div className="text-center">
        <p className="font-display text-[13px] tracking-[0.28em]">MIRBIR</p>
        <div className="mx-auto mt-5 h-px w-20 overflow-hidden bg-ivory/10"><span className="block h-full w-1/2 animate-[loadingBar_900ms_ease-in-out_infinite] bg-ivory/70" /></div>
      </div>
      <style>{`@keyframes loadingBar{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}`}</style>
    </main>
  );
}
