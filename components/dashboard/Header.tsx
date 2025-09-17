'use client';
import { HeaderProps } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UserAvatar from '../Avatar';

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen, user }) => {
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
          {/* Sidebar toggle */}
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

          {/* Logo + Title */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/gojo-logo.png"
                alt="Gojo Ethiopian Restaurant"
                fill
                className="rounded-full object-contain"
                priority
              />
            </div>
            <h1 className="hidden sm:block text-lg sm:text-xl font-semibold tracking-tight">
              Dashboard
            </h1>
          </Link>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-4">
          {/* Avatar always visible, smaller on mobile */}
          <UserAvatar user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
