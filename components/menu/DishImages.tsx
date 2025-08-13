'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

interface Dish {
  name?: string;
  images?: string[];
}

interface Props {
  dish: Dish;
}

export default function DishImages({ dish }: Props) {
  const [fullscreenSrc, setFullscreenSrc] = useState<string | null>(null);

  // Close fullscreen on ESC key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setFullscreenSrc(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div
        className="mt-2 px-4 pb-3 text-sm text-gray-600 leading-relaxed
          overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-thin
          scrollbar-thumb-orange-400 scrollbar-track-orange-100"
      >
        {dish?.images?.map((src, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden cursor-pointer shadow-md"
            onClick={() => setFullscreenSrc(src)}
          >
            <Image
              src={src}
              alt={`${dish.name} image ${i + 1}`}
              width={256}
              height={160}
              className="object-cover w-full h-full"
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>
      {/* Overlay */}
      {fullscreenSrc && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center 
               bg-black/70 backdrop-blur-2xl cursor-zoom-out h-auto w-auto max-h-[90vh] max-w-[90vw]"
          onClick={() => setFullscreenSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Container that sizes to image */}
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullscreenSrc}
              alt={dish.name || "Fullscreen image"}
              width={0} // Let Next.js Image size dynamically
              height={0}
              sizes="100vw"
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] animate-scaleIn"
              unoptimized
              onClick={() => setFullscreenSrc(null)}
            />

            <Button
              variant="outline"
              className="absolute top-2 right-2 bg-red-800 text-white"
            onClick={() => setFullscreenSrc(null)}
            >
              <X />
            </Button>
          </div>
        </div>
      )}


    </>
  );
}
