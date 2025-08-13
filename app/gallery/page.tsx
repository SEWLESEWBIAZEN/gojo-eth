"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ImageGallery from "@/components/gallery/ImageGallery";
import VideoGallery from "@/components/gallery/VideoGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Image, Video } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Link
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2 focus:bg-secondary focus:text-secondary-foreground"
      >
        Skip to content
      </Link>
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main id="main" className="flex-1 container mx-auto px-4">
        <Tabs defaultValue="image-gallery" className="w-full relative mt-4">
          <TabsList>
            <TabsTrigger value="image-gallery"><Image className="text-primary mr-2 h-6 w-5" /> Image Gallery</TabsTrigger>
            <TabsTrigger value="video-gallery"><Video className="text-primary mr-2 h-6 w-5" /> Video Gallery</TabsTrigger>
          </TabsList>
          <br />
          <TabsContent value="image-gallery" className="animate-enter py-4">
            <ImageGallery />
          </TabsContent>
          <TabsContent value="video-gallery" className="animate-enter py-4">
            <VideoGallery />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
