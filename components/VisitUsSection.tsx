import { Clock, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Button } from './ui/Button'
import Image from 'next/image'
import MapEmbed from './MapEmbed'

const VisitUsSection = () => {
  return (
    <section id="visit" className="py-12 px-4 border-t">
      <div className="container grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Heading */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold">
              Visit Us
            </h2>
            <p className="text-muted-foreground">
              We look forward to welcoming you.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 flex items-start gap-3">
              <MapPin className="mt-1 text-brand" />
              <div>
                <p>1261 W San Carlos St</p>
                <p>San Jose, CA 95126</p>
                <p>(408) 295-9546</p>
              </div>
            </div>

            <div className="rounded-lg border p-4 flex items-start gap-3">
              <Clock className="mt-1 text-brand" />
              <div>
                <p>Tues–Sun: 11:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden border">
            <MapEmbed />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="brand" size="lg" asChild>
              <a href="tel:+14082959546">
                <Phone className="mr-2 w-4 h-4" /> Reserve by Phone
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#menu">Explore Menu</a>
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-1 rounded-xl border p-6 relative overflow-hidden">
          <h3 className="font-semibold mb-3">Good to know</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
            <li>Family-style platters available</li>
            <li>Gluten-free injera upon request</li>
          </ul>
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/images/aside-bg-1.jpg"
              alt="Good to know background"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </aside>
      </div>
    </section>

  )
}

export default VisitUsSection
