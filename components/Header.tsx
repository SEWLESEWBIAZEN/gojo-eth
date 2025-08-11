import React from 'react'
import { Button } from './ui/Button'
import { MenuIcon, Phone, UtensilsCrossed, X } from 'lucide-react'
import Image from 'next/image';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => {
  return (
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="container flex h-16 items-center justify-between px-4">
          <a href="#home" className="flex items-center gap-2">
           
            <Image
              src="/logo.png"
              alt="Gojo Ethiopian Restaurant"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-lg font-bold tracking-tight">Gojo</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-sm story-link">
              Menu
            </a>
            <a href="#about" className="text-sm story-link">
              About
            </a>
            <a href="#visit" className="text-sm story-link">
              Visit
            </a>
          </div>

          {/* Call button & mobile menu toggle */}
          <div className="flex items-center gap-3">
            <Button asChild variant="hero" size="sm">
              <a href="tel:+14082959546">
                <Phone className="mr-1 w-4 h-4" /> Call
              </a>
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
              <a
                href="#menu"
                className="py-2 border-b flex flex-1 justify-end font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </a>
              <a
                href="#about"
                className="py-2 border-b flex flex-1 justify-end font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#visit"
                className="py-2 border-b flex flex-1 justify-end font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Visit
              </a>
            </div>
          </div>
        )}
      </header>
  )
}

export default Header
