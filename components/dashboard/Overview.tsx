import Link from 'next/link'
import React from 'react'

const Overview = () => {
    return (
        <>
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Dashboard
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Quick overview and controls for menus, inquiries, gallery, reservations, and feedback.
                </p>
            </div>
            {/* Cards grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 cursor-pointer">
                {[
                    { title: 'Menus', desc: 'Manage your menu items and categories.',link:"/dashboard/menu-management" },
                    { title: 'Gallery', desc: 'Upload, tag, and organize images & videos.' ,link:"/dashboard/gallery"},
                    { title: 'Table Reservations', desc: 'Approve, assign, and schedule tables.' ,link:"/dashboard/reservations"},
                    { title: 'Feedback Analytics', desc: 'Sentiment, trends, and NPS insights.' ,link:"/dashboard/"},
                    { title: 'More', desc: 'Integrations, roles, and settings.' ,link:"/dashboard/"},
                ].map((c, i) => (
                    <Link
                    href={c.link}
                        key={i}
                        className="
                  group rounded-2xl border border-neutral-200 dark:border-neutral-800
                  bg-white/80 dark:bg-neutral-900/80 backdrop-blur
                  p-6 shadow-sm transition
                  hover:shadow-xl hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-500/40
                "
                    >
                        <h3 className="text-base font-semibold text-indigo-600 dark:text-indigo-300">
                            {c.title}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{c.desc}</p>

                        {/* Subtle progress / accent */}
                        <div className="mt-4 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                            <div className="h-full w-[0%] group-hover:w-full transition-all duration-500 bg-indigo-500/70" />
                        </div>
                    </Link>
                ))}
            </div>

        </>
  )
}

export default Overview
