'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import Footer from '@/components/Footer'
import Overview from '@/components/dashboard/Overview'

export default function DashboardPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Close on ESC (mobile)
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setMobileMenuOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
            {/* Skip link */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2
                   focus:bg-indigo-600 focus:text-white rounded"
            >
                Skip to content
            </a>
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            <div className="relative flex flex-1 overflow-hidden">
                <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
                <main
                    id="main"
                    className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64"
                >

                    <Overview />
                </main>

            </div>

            <footer className="lg:ml-64 mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
                <Footer />
            </footer>
        </div>
    )
}
