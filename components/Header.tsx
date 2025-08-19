import React from 'react'
import { Button } from './ui/Button'
import { LayoutDashboard, MenuIcon, Phone, X } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { HeaderProps } from '@/lib/utils';
const Header = ({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-md ">
      <nav className="container flex h-20 items-center justify-between px-4">
        <Link href="/#home" className="flex items-center gap-2">
          <div className="relative w-10 h-10 sm:w-16 sm:h-16">
            <Image
              src="/gojo-logo.png"
              alt="Gojo Ethiopian Restaurant"
              fill
              className="rounded-full object-contain"
              priority
            />
          </div>
          <span className="text-lg font-bold tracking-tight">Gojo</span>
        </Link>


        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm story-link">
            Home
          </Link>
          <Link href="/#menu" className="text-sm story-link">
            Menu
          </Link>
          <Link href="/#about" className="text-sm story-link">
            About
          </Link>
          <Link href="/#visit" className="text-sm story-link">
            Visit
          </Link>
          <Link href="/gallery" className="text-sm  bg-accent hover:bg-accent/60 px-3 py-1 rounded-sm story-link">
            Food Gallery
          </Link>
        </div>

        {/* Call button & mobile menu toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="
                flex items-center text-sm px-4 py-2 rounded
                bg-primary text-white
                hover:bg-primary/60 hover:text-slate-700
                focus:outline-none focus:ring-2 focus:ring-primary/50
                transition-colors duration-200
                "
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="ml-2 hidden sm:block">Dashboard</span>
          </Link>
          <Button asChild variant="hero" size="sm">
            <Link href="tel:+14082959546">
              <Phone className="mr-1 w-4 h-4" /> <span className="hidden sm:inline">Call</span>
            </Link>
          </Button>
          <button
            className="md:hidden p-2 rounded hover:bg-accent"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="flex flex-col p-4 gap-3">
            <Link
              href="/#menu"
              className="py-2 border-b flex flex-1 justify-end font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/#about"
              className="py-2 border-b flex flex-1 justify-end font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#visit"
              className="py-2 border-b flex flex-1 justify-end font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Visit
            </Link>
            <div>
              <Link
                href="/gallery"
                className="text-sm inline-block bg-accent hover:bg-accent/60 px-3 py-1 rounded-sm transition-colors duration-200"
              >
                Food Gallery
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  )
}

export default Header
