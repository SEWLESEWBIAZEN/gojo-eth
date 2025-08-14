"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/menu/MenuSection";
import StorySection from "@/components/StorySection";
import VisitUsSection from "@/components/VisitUsSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
   
        {/* Hero */}
        <HeroSection />

        {/* Menu */}
        <MenuSection />

        {/* About */}
        <StorySection />

        {/* Visit */}
        <VisitUsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
