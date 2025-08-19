"use client";

import { getInitials } from "@/lib/utils";
import { useState } from "react";
import Logout from "./Logout";
import Image from 'next/image'


interface UserAvatarProps {
  user: { email: string } | null;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle user menu"
        className="relative w-10 h-10 flex items-center justify-center rounded-full border-4 border-indigo-900 bg-white overflow-hidden"
      >
        {/* Show initials fallback if no image */}
        {user?.email ? (
          <span className="text-sm font-semibold text-indigo-800">
            {getInitials(user.email)}
          </span>
        ) : (
          <Image
            src="/logo.png"
            alt="User Avatar"
            fill
            className="object-cover"
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white border rounded shadow-lg p-2 z-50">
          <p className="text-sm text-indigo-700 mb-2 break-all ">{user?.email}</p>
          <Logout />
        </div>
      )}
    </div>
  );
}
