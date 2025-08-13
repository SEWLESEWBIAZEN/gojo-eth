'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { X } from "lucide-react";
import { Dialog, DialogClose,DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { Dish } from "@/lib/utils";

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
      {/* Scrollable thumbnails */}
      <div
        className="mt-2 px-4 pb-3 text-sm text-gray-600 leading-relaxed
        overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-thin
        scrollbar-thumb-orange-400 scrollbar-track-orange-100"
      >
        {dish?.images?.map((src: string, i: number) => (
          <Dialog key={i} open={fullscreenSrc === src} onOpenChange={(open) => setFullscreenSrc(open ? src : null)}>
            <DialogTrigger asChild>
              <div
                className="snap-center flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden cursor-pointer shadow-md"
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
            </DialogTrigger>

            {/* Fullscreen Dialog */}
            <DialogContent className="bg-primary backdrop-blur-2xl border-none shadow-none p-0 flex flex-col items-center justify-center pt-6 text-white">
              <DialogTitle>{dish?.name || "Fullscreen image"}</DialogTitle>
              <DialogDescription className="text-white">{dish?.description}</DialogDescription>
              <div className="relative mt-4">
                <Image
                  src={src}
                  alt={dish.name || "Fullscreen image"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-auto max-h-[90vh] max-w-[90vw] animate-scaleIn"
                  unoptimized
                />

                <DialogClose asChild >
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-2 right-2 bg-red-800 text-white"
                    onClick={() => setFullscreenSrc(null)}
                  >
                    <X />
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}
