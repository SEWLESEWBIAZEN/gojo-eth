"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Utensils, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  "/carousel/location.webp",
  "/carousel/beyaynet.avif",  
  "/carousel/yetetebabese.webp",
  "/carousel/tibsa-tibs.jpg",
  "/carousel/beyaynet-2.webp",
  "/carousel/atint-tbs.jpg",
  "/carousel/beyaynet-3.jpg",
  "/carousel/wotoch.webp",
  "/carousel/gored-gored.webp",
  "/carousel/beyaynet.jpeg",
  "/carousel/injera.webp",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {images?.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={src}
            alt={`Hero image ${index + 1}`}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      ))}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-8">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Gojo Ethiopian Restaurant — Authentic Ethiopian Cuisine
        </h1>
        <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-6 text-justify max-w-5xl bg-white/30 p-4 rounded-lg">
          Savor Ethiopia’s flavors: warm injera, rich stews, and a welcoming
          table. Dine in, takeout, or catering. Try today’s specials or explore
          our menu — your perfect dish awaits!
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href="#menu">
              <Utensils className="mr-2 w-4 h-4" /> View Menu
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#visit">Plan Your Visit</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
