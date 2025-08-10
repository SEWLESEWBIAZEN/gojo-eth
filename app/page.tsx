import { Button } from "@/components/Button";
import MenuTabs from "@/components/MenuTabs";
import { Clock, MapPin, Phone, Utensils, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2 focus:bg-secondary focus:text-secondary-foreground">Skip to content</a>
          <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
            <nav className="container flex h-16 items-center justify-between">
              <a href="#home" className="flex items-center gap-2">
                <UtensilsCrossed/>
                {/* <img src="/logo.png" alt="Gojo Ethiopian Restaurant logo" className="h-8 w-auto" loading="lazy" /> */}
                <span className="text-lg font-semibold tracking-tight">Gojo</span>
              </a>
              <div className="hidden md:flex items-center gap-6">
                <a href="#menu" className="story-link text-sm">Menu</a>
                <a href="#about" className="story-link text-sm">About</a>
                <a href="#visit" className="story-link text-sm">Visit</a>
              </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="hero" size="sm">
                  <a href="tel:+15550100" aria-label="Call Gojo Ethiopian Restaurant">
                    <Phone className="mr-1" /> Call Now
                  </a>
                </Button>
              </div>
            </nav>
          </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="min-h-screen bg-background">


          <main id="main">
            {/* Hero */}
            <section id="home" className="relative">
              <div className="container grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">
                <div className="order-2 md:order-1 animate-enter">
                  <h1 className="font-display text-4xl md:text-5xl leading-tight font-semibold mb-4">
                    Gojo Ethiopian Restaurant — Authentic Ethiopian Cuisine
                  </h1>
                  <p className="text-muted-foreground text-lg md:text-xl mb-6">
                    Experience the flavors of Ethiopia: warm injera, rich stews, and a welcoming table. Dine-in, takeout, or catering.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="hero" size="lg" asChild>
                      <a href="#menu" aria-label="View Menu">
                        <Utensils className="mr-2" /> View Menu
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="#visit" aria-label="Plan your visit">Plan Your Visit</a>
                    </Button>
                  </div>
                </div>

                <div className="order-1 md:order-2 relative rounded-xl overflow-hidden border animate-scale-in shadow-[var(--shadow-elevated)]">
                  <Image
                    src="/og-gojo.jpg"
                    width={100}
                    height={100}
                    alt="Authentic Ethiopian platter (beyaynetu) with injera at Gojo Ethiopian Restaurant"
                    className="w-full h-[280px] md:h-[420px] object-cover"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10" />
                </div>
              </div>
            </section>

            {/* Menu */}
            <section id="menu" className="py-16 border-t">
              <div className="container">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">Menu</h2>
                <p className="text-muted-foreground mb-6">Browse our daily specials or the full menu.</p>
                <MenuTabs />
              </div>
            </section>

            {/* About */}
            <section id="about" className="py-16">
              <div className="container grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">Our Story</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Gojo is a celebration of Ethiopian hospitality. We share meals on injera, gather with friends, and slow down for the coffee ceremony. Every dish is prepared with heritage spices and care.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full bg-['']">
                  <div className="rounded-lg border p-4 text-center">
                    <span className="block text-3xl font-semibold text-wrap">100%</span>
                    <span className="text-muted-foreground text-sm text-wrap">Halal meats</span>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <span className="block text-3xl font-semibold text-wrap">Vegan</span>
                    <span className="text-muted-foreground text-sm text-wrap">friendly options</span>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <span className="block text-3xl font-semibold text-wrap">Catering</span>
                    <span className="text-muted-foreground text-sm text-wrap">for events</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Visit */}
            <section id="visit" className="py-16 border-t">
              <div className="container grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">Visit Us</h2>
                  <p className="text-muted-foreground mb-6">We look forward to welcoming you.</p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1" />
                        <div>
                          <p>123 Gojo Street</p>
                          <p>City, State</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="mt-1" />
                        <div>
                          <p>Mon–Fri: 11:00–21:00</p>
                          <p>Sat–Sun: 12:00–22:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button variant="brand" size="lg" asChild>
                      <a href="tel:+15550100" aria-label="Call to reserve">
                        <Phone className="mr-2" /> Reserve by Phone
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
          </main>

          <footer className="border-t py-8">
            <div className="container text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} Gojo Ethiopian Restaurant</p>
              <nav className="flex gap-4">
                <a href="#menu" className="hover:underline">Menu</a>
                <a href="#about" className="hover:underline">About</a>
                <a href="#visit" className="hover:underline">Visit</a>
              </nav>
            </div>
          </footer>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">


      </footer>
    </div>
  );
}
