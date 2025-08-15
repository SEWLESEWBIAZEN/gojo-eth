import React from 'react'
import { Button } from './ui/Button'
import Image from 'next/image'
import { Utensils } from 'lucide-react'

const HeroSection = () => {
  return (
    <section id="home" className="relative">
      <Image
        src="/images/bg-2.png"
        alt="Restaurant background"
        fill
        priority
        className="object-cover object-center -z-10"
      />
      <div className="container flex flex-col-reverse md:flex-row justify-between gap-8 items-start py-12 md:py-20 px-4 ">
        <div className="lg:w-[60%]">
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
        <div className=" relative w-[340px] h-[300px] sm:w-[600px] sm:h-[450px] rounded-xl overflow-hidden mx-auto">
          <Image
            src="/foods-picture-200.png"
            alt="Authentic Ethiopian platter"
            fill
            className="object-cover mx-auto"
            quality={100} // keeps best quality
            sizes="(max-width: 768px) 100vw, 400px"
          
          />
        </div>


      </div>
    </section>
  )
}

export default HeroSection
