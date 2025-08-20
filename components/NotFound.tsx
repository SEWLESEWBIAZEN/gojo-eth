"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Search, Home } from "lucide-react";
import { motion } from "framer-motion";

interface NotFoundProps {
  message?: string;
  menu?: boolean;
}

const NotFound = ({ message, menu }: NotFoundProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[calc(100vh-20rem)] px-4 text-center ${
        menu ? "backdrop-blur-lg text-primary" : "text-gray-800"
      }`}
    >
      {/* Animated big 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`text-7xl sm:text-8xl font-extrabold mb-4 ${
          menu ? "text-primary/70" : "text-gray-900"
        }`}
      >
        404
      </motion.h1>

      {/* Title */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl font-semibold mb-3"
      >
        {message ?? "Your"} Search Is Not Found
      </motion.h2>

      {/* Special case for Cuisine */}
      {message === "Cuisine" && (
        <p className="mb-3 text-lg opacity-80">Or today’s menu isn’t ready 🍽️</p>
      )}

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 opacity-70"
      >
        Adjust your search and try again.
      </motion.p>

      {/* Call to Actions */}
      <div className="flex gap-3">
        <Button
          variant={menu ? "secondary" : "default"}
          className="rounded-2xl px-6 shadow-lg"
          onClick={() => window.location.reload()}
        >
          <Search className="w-4 h-4 mr-2" /> Try Again
        </Button>
        <Button
          variant="outline"
          className="rounded-2xl px-6 shadow-lg"
          onClick={() => (window.location.href = "/")}
        >
          <Home className="w-4 h-4 mr-2" /> Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
