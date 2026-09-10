import type { CSSProperties, ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
