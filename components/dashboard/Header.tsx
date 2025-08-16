'use client';
import { HeaderProps } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header
      className="
        sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur
        border-b border-neutral-200 dark:border-neutral-800
        lg:ml-64
      "
    >
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Mobile toggle + Logo + Title */}
        <div className="flex items-center gap-3">
          <button
            className="
              lg:hidden inline-flex items-center justify-center p-2 rounded-xl
              hover:bg-neutral-100 dark:hover:bg-neutral-800 transition
            "
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle sidebar"
            aria-expanded={mobileMenuOpen}
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/">
            <Image src="/logo.png" alt="Gojo Logo" width={40} height={40} className="rounded-full" />
          </Link>

          {/* Dashboard Title */}
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
            Gojo Dashboard
          </h1>
        </div>

        {/* Right: Quick actions */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#settings"
            className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
          >
            Settings
          </Link>
          <Link
            href="/#profile"
            className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
