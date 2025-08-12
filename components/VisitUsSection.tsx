'use client'
import { Clock, MapPin, Phone, Clipboard, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/Button'
import Image from 'next/image'
import MapEmbed from './MapEmbed'

const VisitUsSection = () => {
  const [copied, setCopied] = useState(false);
  const textToCopy = "+14082959546"; // Phone number to copy

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
<section id="visit" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t">
  <div className="container mx-auto grid gap-8 lg:grid-cols-3">
    {/* Main Content */}
    <div className="lg:col-span-2 space-y-6">
      {/* Heading */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          Visit Us
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          We look forward to welcoming you.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-blink rounded-lg shadow-lg p-4 flex items-start gap-3">
          <MapPin className="mt-1 text-primary flex-shrink-0" />
          <div className="text-sm sm:text-base">
            <p>1261 W San Carlos St</p>
            <p>San Jose, CA 95126</p>
            <p>(408) 295-9546</p>
          </div>
        </div>
        <div className="border-blink rounded-lg shadow-lg p-4 flex items-start gap-3">
          <Clock className="mt-1 text-primary flex-shrink-0" />
          <div className="text-sm sm:text-base">
            <p>
              Tuesday – Sunday:{" "}
              <span className="text-muted-foreground">
                11:00 AM – 9:00 PM
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden border h-64 sm:h-80 lg:h-96">
        <MapEmbed />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          variant="brand"
          size="lg"
          asChild
          onClick={handleCopy}
          className="flex-1 sm:flex-none"
        >
          {copied ? (
            <span className="text-green-500 flex items-center gap-2">
              <Copy /> Phone number copied!
            </span>
          ) : (
            <a href="tel:+14082959546" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Reserve by Phone
            </a>
          )}
        </Button>
        <Button variant="outline" size="lg" asChild className="flex-1 sm:flex-none">
          <a href="#menu">Explore Menu</a>
        </Button>
      </div>
    </div>

    {/* Sidebar */}
    <aside className="lg:col-span-1 rounded-xl border p-6 relative bg-white/70 backdrop-blur-sm">
      <h3 className="font-semibold mb-3 text-lg">Good to know</h3>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
        <li>Family-style platters available</li>
        <li>Gluten-free injera upon request</li>
        <li>Additional parking across the street</li>
      </ul>
      {/* Optional background image */}
      {/* 
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/images/aside-bg-1.jpg"
          alt="Good to know background"
          fill
          className="object-cover object-center"
        />
      </div> 
      */}
    </aside>
  </div>
</section>


  )
}

export default VisitUsSection
