import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    <footer className="border-t py-8 mt-10 ">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        {/* Copyright */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Gojo Ethiopian Restaurant. All rights reserved.
        </p>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-6 items-center">
          <Link href="/" className={` transition-colors uppercase  ${!isDashboard ? 'text-primary hover:text-primary' : 'text-indigo-900  hover:text-indigo-800'}`}>
            Home
          </Link>
          <Link href="/#menu" className={` transition-colors uppercase  ${!isDashboard ? 'text-primary hover:text-primary' : 'text-indigo-900  hover:text-indigo-800'}`}>
            Menu
          </Link>
          <Link href="/#about" className={` transition-colors uppercase  ${!isDashboard ? 'text-primary hover:text-primary' : 'text-indigo-900  hover:text-indigo-800'}`}>
            About
          </Link>
          <Link href="/#visit" className={` transition-colors uppercase  ${!isDashboard ? 'text-primary hover:text-primary' : 'text-indigo-900  hover:text-indigo-800'}`}>
            Visit
          </Link>
          <Link
            href="/gallery"
            className={`text-sm inline-block text-center px-3 py-1 transition-colors uppercase duration-200 ${!isDashboard ? 'text-primary hover:text-primary' : 'text-indigo-900  hover:text-indigo-800'}`}
          >
            Food Gallery
          </Link>
          <Link 
            href="#home"
            className={`border border-accent border-4 px-4 py-2  border-t border-t-4 pt-2  rounded-xl text-white text-md ${!isDashboard ? 'bg-primary border-t-primary' : 'bg-indigo-900 border-t-indigo-900'}`}
          >
            Order Now
          </Link>
        </nav>
      </div>

      {/* Social Links */}
      <div className="mt-8 text-center flex-1 border-t-2 pt-4">
        <p className="mb-3 font-medium">Find us on</p>
        <div className="flex justify-center gap-4">
          <Link
            href="https://www.facebook.com/people/Gojo-Ethiopian-restaurant/61559731198758/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full ${!isDashboard ? 'bg-primary/10 hover:bg-primary/20' : 'bg-indigo-900/10 hover:bg-indigo-900/20'} transition-colors`}
          >
            <Facebook className={`w-5 h-5 ${!isDashboard ? 'text-primary' : 'text-indigo-900'}`} />
          </Link>

          <Link
            href="https://www.instagram.com/explore/locations/124599994303682/gojo-ethiopian-restaurant/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
          >
            <Instagram className="w-5 h-5 text-pink-500" />
          </Link>

          <Link
            href="https://www.yelp.com/biz/gojo-ethiopian-restaurant-san-jose-2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <span className="font-semibold text-red-500">Y</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
