import { cn } from "@/lib/utils";
import { Facebook, Instagram, PhoneForwardedIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    <footer className="border-t  mt-10 ">
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
          {!isDashboard && <Link
            href="#home"
            className={`border border-accent border-4 px-4 py-2  border-t border-t-4 pt-2  rounded-xl text-white text-md ${!isDashboard ? 'bg-primary border-t-primary' : 'bg-indigo-900 border-t-indigo-900'}`}
          >
            Order Now
          </Link>}
        </nav>
      </div>

      {/* Social Links */}
      <div className="flex flex-col md:flex-row md:items-end relative space-y-4 md:space-y-0">
        {/* Social Links Section */}
        <div className="mt-8 flex-1 text-center border-t-2 pt-4">
          <p className="mb-3 font-medium">Find us on</p>
          <div className="flex justify-center gap-4">
            {/* Facebook */}
            <Link
              href="https://www.facebook.com/people/Gojo-Ethiopian-restaurant/61559731198758/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-2 rounded-full transition-colors",
                !isDashboard
                  ? "bg-primary/10 hover:bg-primary/20"
                  : "bg-indigo-900/10 hover:bg-indigo-900/20"
              )}
            >
              <Facebook
                className={cn(
                  "w-5 h-5",
                  !isDashboard ? "text-primary" : "text-indigo-900"
                )}
              />
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/explore/locations/124599994303682/gojo-ethiopian-restaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
            >
              <Instagram className="w-5 h-5 text-pink-500" />
            </Link>

            {/* Yelp */}
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

        {/* Developer Credit Section */}
        <div className="md:absolute mx-auto items-center w-full md:w-auto bottom-2 right-2 flex flex-col items-start gap-2 px-4 py-1 text-indigo-800 border-t md:border-t-0 md:border-s  border-red-800 text-sm">
          <p className="font-medium">Developed by: LTG</p>
          <div className="flex items-center gap-x-2">            
          <PhoneForwardedIcon className="w-4 h-4" />          
          <p>+251 961 718 044 <span className="text-green-600">(WhatsApp)</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
