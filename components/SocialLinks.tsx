"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const socialLinks = [
  {
    href: "https://www.facebook.com/people/Gojo-Ethiopian-restaurant/61559731198758/",
    icon: <Facebook className="w-5 h-5 text-white" />,
    bg: "bg-primary hover:bg-primary/80",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/explore/locations/124599994303682/gojo-ethiopian-restaurant/",
    icon: <Instagram className="w-5 h-5 text-white" />,
    bg: "bg-pink-500 hover:bg-pink-600",
    label: "Instagram",
  },
  {
    href: "https://www.yelp.com/biz/gojo-ethiopian-restaurant-san-jose-2",
    icon: <span className="font-semibold text-white">Y</span>,
    bg: "bg-red-500 hover:bg-red-600",
    label: "Yelp",
  },
];

export default function SocialLinks() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <div className="fixed left-4 top-1/3 z-50 flex flex-col gap-4">
      {socialLinks.map((link, i) => (
        <motion.div
          key={i}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.2, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-colors ${link.bg}`}
          >
            {link.icon}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
