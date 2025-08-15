"use client";
import React from "react";
import { Play } from "lucide-react";

const shimmer =
  "relative overflow-hidden bg-neutral-200 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent";

export default function GallerySkeleton({ gallery, items = 8 }: { gallery: 'image' | 'video'; items?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      {Array.from({ length: items }).map((_, idx) => {
        
        return (
          <div
            key={idx}
            className={`aspect-video rounded-lg ${shimmer}`}
          >
            {gallery === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="text-neutral-400 w-10 h-10 opacity-70" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
