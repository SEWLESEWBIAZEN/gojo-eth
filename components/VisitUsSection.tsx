'use client'

import { Clock, MapPin, Phone, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/Button'
import Image from 'next/image'
import MapEmbed from './MapEmbed'

const VisitUsSection = () => {
  const [copied, setCopied] = useState(false)
  const phoneNumber = '+14082959546'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const highlights = [
    {
      text: 'Family-style platters available',
      img:  { src: '/family-gathering-100.jpg', alt: 'Family-style platters' },
    },
    {
      text: 'Vegetarian and vegan options offered',
      img: { src: '/vegan-vegan-90.avif', alt: 'Vegan dish' },
    },
    {
      text: 'Gluten-free injera upon request',
      img: { src: '/injera-picture-100.jpg', alt: 'Gluten-free injera' },
    },
    {
      text: 'Additional parking across the street',
      img:  { src: '/car-parking-100.jpg', alt: 'Car parking' },
    },
  ]

  return (
    <section
      id="visit"
      className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t bg-gradient-to-b from-white to-neutral-50 -z-10"
    >
      {/* <Image
        src="/illustration-bg-1.png"
        alt="Restaurant background"
        fill
        priority
        className="object-cover object-center -z-50 opacity-5"
      /> */}
      <div className="container mx-auto space-y-12">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Visit Us & Experience the Warmth of Gojo
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-2">
            Step inside, where the aroma of freshly roasted coffee and the sizzle
            of heritage spices welcome you like an old friend. We can’t wait to
            share our table with you.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border shadow-lg p-4 flex items-start gap-3 bg-white/80 backdrop-blur-sm">
            <MapPin className="mt-1 text-primary flex-shrink-0" />
            <div className="text-sm sm:text-base leading-relaxed">
              <p>1261 W San Carlos St</p>
              <p>San Jose, CA 95126</p>
              <p>(408) 295-9546</p>
            </div>
          </div>
          <div className="rounded-xl border shadow-lg p-4 flex items-start gap-3 bg-white/80 backdrop-blur-sm">
            <Clock className="mt-1 text-primary flex-shrink-0" />
            <div className="text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Tuesday – Sunday</strong>
              </p>
              <p className="text-muted-foreground">11:00 AM – 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border h-64 sm:h-80 lg:h-96 shadow-md">
          <MapEmbed />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="brand"
            size="lg"
            onClick={handleCopy}
            className="flex-1 sm:flex-none"
          >
            {copied ? (
              <span className="text-green-500 flex items-center gap-2">
                <Copy className="w-4 h-4" /> Number Copied!
              </span>
            ) : (
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Reserve by Phone
              </a>
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="flex-1 sm:flex-none"
          >
            <a href="#menu">Explore Menu</a>
          </Button>
        </div>

        {/* Highlights */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border p-4 flex flex-col items-center text-center"
            >
              <div className='h-[25%]'>
              <p className="font-medium text-base mb-3 text-start">{item.text}</p>
              </div>
              <div className='h-[80%]'>
              {item.img && (
                <Image
                  src={item.img.src}
                  alt={item.img.alt}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-sm object-cover h-48 w-full"
                />
              )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  )
}

export default VisitUsSection
