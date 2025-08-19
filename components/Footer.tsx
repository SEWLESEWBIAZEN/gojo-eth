import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (    
      <footer className="border-t py-8">
        <div className="container text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <p>© {new Date().getFullYear()} Gojo Ethiopian Restaurant</p>
          <nav className="flex gap-4">
            <Link href="/#menu" className="story-link">
              Menu
            </Link>
            <Link href="/#about" className="story-link">
              About
            </Link>
            <Link href="/#visit" className="story-link">
              Visit
            </Link>
            <Link
              href="/gallery"
              className="text-sm inline-block bg-accent hover:bg-accent/60 px-3 py-1 rounded-sm transition-colors duration-200 story-link"
            >
              Food Gallery
            </Link>
          </nav>
        </div>
      </footer>    
  )
}

export default Footer
