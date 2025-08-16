"use client";
import Link from "next/link";
import { Home } from "lucide-react";

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <h1 className="text-7xl font-extrabold text-primary">404</h1>
      <div className="text-6xl mt-2">👨‍🍳❓</div>
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        Our chef got lost in the kitchen... The page you’re looking for doesn’t exist.
      </p>
      <Link href="/" className="mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80">
        <Home className="inline w-5 h-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}
