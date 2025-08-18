'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, ClipboardList, Image as ImageIcon, ChartBar, SettingsIcon } from 'lucide-react'
import React from 'react'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const nav = [
  {
    heading: 'Admin Panel',
    items: [
      { href: '/dashboard', label: 'Overview', icon: Home },
      { href: '/dashboard/menu-management', label: 'Menu Management', icon: SettingsIcon },
      { href: '/dashboard/reservations', label: 'Table Reservations', icon: ClipboardList },
      { href: '/dashboard/inquiries', label: 'User Inquiries', icon: Users },
    ],
  },
  {
    heading: 'Dashboard & Analytics',
    items: [
      { href: '/dashboard/gallery', label: 'Gallery Management', icon: ImageIcon },
      { href: '/dashboard/feedback', label: 'Feedback Analytics', icon: ChartBar },
    ],
  },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop for mobile/tablet */}
      <div
        className={`
          fixed inset-0 pt-4 z-40 bg-black/30 backdrop-blur-sm transition-opacity
          lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden={!open}
        onClick={onClose}
      />

      {/* Drawer / Static sidebar */}
      <aside
        className={`
          fixed pt-16 inset-y-0 left-0 z-50 w-64
          bg-white/40 dark:bg-neutral-900/90 backdrop-blur
          border-r border-neutral-200 dark:border-neutral-800
          p-4 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          shadow-xl lg:shadow-none
        `}
        role="navigation"
        aria-label="Sidebar"
      >
        {nav.map((group) => (
          <div key={group.heading} className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider
                           text-neutral-500 dark:text-neutral-400 mb-3">
              {group.heading}
            </h2>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-xl
                        transition
                        ${active
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                          : 'text-neutral-700 hover:text-indigo-700 hover:bg-indigo-50 dark:text-neutral-300 dark:hover:text-indigo-200 dark:hover:bg-indigo-500/10'}
                      `}
                      onClick={onClose}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-indigo-600 dark:text-indigo-300' : 'text-indigo-500'}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </aside>
    </>
  )
}
