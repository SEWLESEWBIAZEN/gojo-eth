'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

const StorySection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    // Attempt to play video when component mounts
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
      
        })
      }
    }
  }, [])

  return (
    <section
      id="about"
      className="relative py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-neutral-50"
    >
      {/* Background */}
      <Image
        src="/images/bg-1.png"
        alt="Restaurant background"
        fill
        priority
        className="object-cover object-center -z-10 opacity-20"
      />

      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Video & Story */}
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <video
              ref={videoRef}
              src="/videos/video2.mp4"
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            />
          </div>

          {/* Story Text */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed text-justify text-base sm:text-lg">
              Gojo is a celebration of Ethiopian hospitality. We gather around injera to
              share meals, enjoy conversations, and take time for the traditional coffee
              ceremony. Every dish is prepared with heritage spices, love, and care —
              bringing a piece of Ethiopia to your table.
            </p>
          </div>
        </div>

        {/* Info Cards & Image */}
        <div className="space-y-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { title: '100%', subtitle: 'fresh meats', img: '/halal-halal-100.jpg' },
              { title: 'Vegan', subtitle: 'friendly options', img: '/vegan-vegan-100.jpg' },
              { title: 'Catering', subtitle: 'for events', img: '/catering-catering-100.jpg' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center rounded-xl border-2 border-accent px-4 w-[240px] sm:w-[280px] md:w-[380px] text-center bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-3">
                  <span className="text-2xl sm:text-3xl font-bold block">{item.title}</span>
                  <span className="text-muted-foreground text-sm sm:text-base font-semibold block">
                    {item.subtitle}
                  </span>
                </div>
                <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={item.img}
                    alt={item.subtitle}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>

          <Image
            src="/What-Vegan-means-76.jpg"
            alt="Gojo Ethiopian Restaurant"
            width={600}
            height={400}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default StorySection
