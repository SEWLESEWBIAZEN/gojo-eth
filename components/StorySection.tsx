import React from 'react'
import Image from 'next/image'

const StorySection = () => {
    return (
        <section id="about" className="py-12 px-4 relative">
            <Image
                src="/images/bg-1.png"
                alt="Restaurant background"
                fill
                priority
                className="object-cover object-center -z-10 opacity-20"
            />
            <div className="container grid md:grid-cols-2 gap-10 items-start">
                <div>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
                        Our Story
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                        Gojo is a celebration of Ethiopian hospitality. We share meals
                        on injera, gather with friends, and slow down for the coffee
                        ceremony. Every dish is prepared with heritage spices and care.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    <div className="rounded-lg border p-4 text-center">
                        <span className="block text-3xl font-semibold">100%</span>
                        <span className="text-muted-foreground text-sm">
                            Halal meats
                        </span>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                        <span className="block text-3xl font-semibold">Vegan</span>
                        <span className="text-muted-foreground text-sm">
                            friendly options
                        </span>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                        <span className="block text-3xl font-semibold">Catering</span>
                        <span className="text-muted-foreground text-sm">
                            for events
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StorySection
