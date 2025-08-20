"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://www.facebook.com/people/Gojo-Ethiopian-restaurant/61559731198758/",
    icon: <Facebook className="w-6 h-6 text-primary" />,
    bg: "bg-primary/10 hover:bg-primary/20",
  },
  {
    href: "https://www.instagram.com/explore/locations/124599994303682/gojo-ethiopian-restaurant/",
    icon: <Instagram className="w-6 h-6 text-pink-500" />,
    bg: "bg-pink-500/10 hover:bg-pink-500/20",
  },
  {
    href: "https://www.yelp.com/biz/gojo-ethiopian-restaurant-san-jose-2",
    icon: <span className="font-semibold text-red-500">Y</span>,
    bg: "bg-red-500/10 hover:bg-red-500/20",
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed left-4 top-1/3 z-50 flex flex-col gap-4">
      {socialLinks.map((link, i) => (
        <motion.div
          key={i}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full transition-colors ${link.bg}`}
          >
            {link.icon}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
