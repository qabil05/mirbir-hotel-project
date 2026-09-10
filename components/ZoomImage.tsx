"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), { ssr: false });

export function ZoomImage({
  src,
  alt,
  className = "",
  onOpen,
}: {
  src: string;
  alt: string;
  className?: string;
  onOpen?: (src: string, alt: string) => void;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const handleOpen = () => {
    if (onOpen) onOpen(src, alt);
    else setLocalOpen(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`group relative block overflow-hidden ${className}`}
      >
        <span className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.02]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover"
            loading="lazy"
          />
        </span>
      </button>
      {!onOpen && localOpen ? <Lightbox src={src} alt={alt} onClose={() => setLocalOpen(false)} /> : null}
    </>
  );
}
