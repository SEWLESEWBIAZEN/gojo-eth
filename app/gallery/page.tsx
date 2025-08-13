"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2 focus:bg-secondary focus:text-secondary-foreground"
      >
        Skip to content
      </a>

      {/* Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      {/* Main */}
      <main id="main" className="flex-1">
        <div className="container py-6">
          <h1 className="text-4xl font-bold mb-2">Gallery</h1>
          <p className="mb-4">
            Explore our delicious Ethiopian dishes and vibrant restaurant atmosphere.
          </p>
          {/* Gallery images will be displayed here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Image
              src="/images/gallary1.jpg"
              alt="Ethiopian dish 1"
              width={500}
              height={300}
              className="object-cover"
            />
            <Image
              src="/images/gallary1.jpg"
              alt="Ethiopian dish 1"
              width={500}
              height={300}
              className="object-cover"
            />
            <Image
              src="/images/gallary1.jpg"
              alt="Ethiopian dish 1"
              width={500}
              height={300}
              className="object-cover"
            />
            <Image
              src="/images/gallary1.jpg"
              alt="Ethiopian dish 1"
              width={500}
              height={300}
              className="object-cover"
            />
            <Image
              src="/images/gallary1.jpg"
              alt="Ethiopian dish 1"
              width={500}
              height={300}
              className="object-cover"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
