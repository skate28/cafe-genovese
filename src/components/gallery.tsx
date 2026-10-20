"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { focusRing } from "@/components/styles";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";
import { photoDimensions } from "@/lib/photos";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((index) => (index === null ? index : (index + 1) % photos.length));
      if (event.key === "ArrowLeft") setOpen((index) => (index === null ? index : (index - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, index) => {
          const size = photoDimensions(photo);
          return (
            <li key={photo.src} className={index === 0 ? "col-span-2 sm:col-span-1" : undefined}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                className={cn("group relative block w-full overflow-hidden rounded-2xl bg-linen", focusRing)}
                aria-label={`View photo: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={size.width}
                  height={size.height}
                  sizes="(min-width: 640px) 30vw, 50vw"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </button>
            </li>
          );
        })}
      </ul>
      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-roast/90 p-4" role="dialog" aria-modal="true" aria-label={current.alt}>
          <button type="button" className={cn("absolute right-4 top-4 rounded-full bg-linen p-3 text-ink", focusRing)} onClick={() => setOpen(null)} aria-label="Close photo">
            <X className="size-5" />
          </button>
          <Image
            src={current.src}
            alt={current.alt}
            {...photoDimensions(current)}
            sizes="90vw"
            className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
          />
        </div>
      )}
    </>
  );
}
