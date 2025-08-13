import React from 'react'
import { Button } from './ui/Button'
import Image from 'next/image'
import { Utensils } from 'lucide-react'

const HeroSection = () => {
  return (
    <section id="home" className="relative">
      <div className="container grid md:grid-cols-2 gap-8 items-center py-12 md:py-20 px-4">
        <div className="order-2 md:order-1">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold mb-4">
            Gojo Ethiopian Restaurant — Authentic Ethiopian Cuisine
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl mb-6">
            Experience the flavors of Ethiopia: warm injera, rich stews, and
            a welcoming table. Dine-in, takeout, or catering.
          </p>
          <p className=" my-2 border border-md rounded-md py-2 px-4 bg-gradient-to-r from-primary via-orange-600 to-red-800 bg-clip-text text-transparent font-semibold">
            Craving something new? Check out today’s specials or explore our full menu — your perfect dish awaits!
          </p>
          <div className="flex flex-wrap gap-3">
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

        <div className="order-1 md:order-2 relative rounded-xl overflow-hidden ">
          <Image
            // src="/og-gojo.jpg"
            src="/images/image-2c.jpg"
            // src="/uploads/e06rg4g9yaua7bp9ud0gpgk4u.jpg"
            alt="Authentic Ethiopian platter"
            width={800}
            height={600}
            className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
