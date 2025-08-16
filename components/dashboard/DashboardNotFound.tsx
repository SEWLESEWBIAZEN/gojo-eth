"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
export default function DashboardNotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-center px-6 overflow-hidden">    
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-7xl md:text-9xl font-extrabold text-indigo-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Chef Mascot Emoji */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-7xl md:text-8xl mt-2"
      >
        👨‍🍳❓
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-4 text-lg md:text-xl text-gray-600 max-w-md"
      >
        Our chef got lost in the kitchen... The page you’re looking for doesn’t
        exist or may have been moved.
      </motion.p>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>

      {/* Decorative Background Shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    </div>
  );
}
