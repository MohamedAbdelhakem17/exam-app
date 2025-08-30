"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import profileImage from "./profile-image.jpg";
import { EllipsisVertical, LogOut, UserRound } from "lucide-react";

export default function ProfileMenu() {
  // State to control dropdown menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ref to detect clicks outside the menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Session data from next-auth
  const { data: session } = useSession() as {
    data: {
      firstName?: string;
      email?: string;
    };
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="flex items-center justify-between w-full relative"
    >
      {/* User Profile Section */}
      <div className="flex items-center gap-2.5">
        {/* Profile Image */}
        <Image
          src={profileImage}
          alt={session?.firstName || "Profile picture"}
          width={56}
          height={56}
          className="w-14 h-14 border border-blue-600"
        />

        {/* User Info */}
        <div className="flex flex-col w-48">
          <p className="text-blue-600 font-medium text-base">
            {session?.firstName}
          </p>
          <p className="text-gray-500 text-sm break-words leading-snug">
            {session?.email}
          </p>
        </div>
      </div>

      {/* Dropdown Toggle Button */}
      <button
        type="button"
        aria-label="Open menu options"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="ml-2"
      >
        <EllipsisVertical className="w-5 h-5 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <ul className="absolute bottom-full left-full mt-2 w-64 bg-white z-50 border divide-y-2">
          {/* Account Link */}
          <li>
            <Link
              href="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center text-sm text-gray-800 p-4 gap-1.5 hover:bg-gray-50"
            >
              <UserRound className="mr-2 h-4 w-4 text-gray-500" />
              <span>Account</span>
            </Link>
          </li>

          {/* Logout Button */}
          <li>
            <button
              type="button"
              onClick={() => signOut()}
              className="flex items-center w-full text-sm text-red-600 p-4 gap-1.5 hover:bg-gray-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
