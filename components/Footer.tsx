import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="border-t py-8">
        <div className="container text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <p>© {new Date().getFullYear()} Gojo Ethiopian Restaurant</p>
          <nav className="flex gap-4">
            <a href="#menu" className="hover:underline">
              Menu
            </a>
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#visit" className="hover:underline">
              Visit
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default Footer
