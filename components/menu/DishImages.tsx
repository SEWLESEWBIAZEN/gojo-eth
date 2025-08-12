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

      {/* Fullscreen Modal */}
      {fullscreenSrc && (
        <div
          className="fixed inset-0 bg-primary bg-opacity-90 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setFullscreenSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <Image
            src={fullscreenSrc}
            alt={dish.name || "Fullscreen image"}
            width={800}
            height={600}
            className="object-contain max-h-full max-w-full"
            unoptimized
          />
         
          <Button
            variant="outline"
            className="absolute top-4 right-4"
            onClick={() => setFullscreenSrc(null)}
          >
            <X />
          </Button>
        </div>
      )}
    </>
  );
}
