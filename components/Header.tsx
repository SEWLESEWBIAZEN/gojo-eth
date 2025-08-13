import React from 'react'
import { Button } from './ui/Button'
import { MenuIcon, Phone, X } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between px-4">
        <Link href="/#home" className="flex items-center gap-2">

          <Image
            src="/logo.png"
            alt="Gojo Ethiopian Restaurant"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-lg font-bold tracking-tight">Gojo</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/#menu" className="text-sm story-link">
            Menu
          </Link>
          <Link href="/#about" className="text-sm story-link">
            About
          </Link>
          <Link href="/#visit" className="text-sm story-link">
            Visit
          </Link>
          <Link href="/gallery" className="text-sm  bg-accent hover:bg-accent/60 px-3 py-1 rounded-sm">
            Gallery
          </Link>
        </div>

        {/* Call button & mobile menu toggle */}
        <div className="flex items-center gap-3">
          <Button asChild variant="hero" size="sm">
            <Link href="tel:+14082959546">
              <Phone className="mr-1 w-4 h-4" /> Call
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
              Gallery
            </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  )
}

export default Header
