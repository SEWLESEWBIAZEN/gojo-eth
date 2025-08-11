import { Clock, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Button } from './ui/Button'

const VisitUsSection = () => {
  return (
    <section id="visit" className="py-12 px-4 border-t">
      <div className="container grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
            Visit Us
          </h2>
          <p className="text-muted-foreground mb-6">
            We look forward to welcoming you.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1" />
                <div>
                  <p>1261 W San Carlos St</p>
                  <p>San Jose, CA 95126</p>
                  <p>4082959546</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Clock className="mt-1" />
                <div>
                  <p>Tues–Sun: 11:00AM–9:00PM</p>                  
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
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
        <aside className="md:col-span-1 rounded-xl border p-6 bg-secondary">
          <h3 className="font-semibold mb-3">Good to know</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
            <li>Family-style platters available</li>
            <li>Gluten-free injera upon request</li>
            <li>Parking on site</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default VisitUsSection
