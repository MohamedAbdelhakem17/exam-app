"use client";

import { cn } from "@/lib/utils/cn";
import { Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import Menu from "./menu";
import SideBarHeader from "./side-bar-heder";

export default function SideBar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpenSidebar((prev) => {
      return !prev;
    });
  };
  console.log(isOpenSidebar);
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 right-4 z-40 p-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="Open menu"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Backdrop Overlay for Mobile */}
      {isOpenSidebar && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-blue-50 h-full w-md p-10 flex flex-col gap-y-16 lg:relative lg:translate-x-0 fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out",
          isOpenSidebar
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={toggleMenu}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-blue-100 rounded-md transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <SideBarHeader />

        {/* Menu */}
        <Menu />
      </aside>
    </>
  );
}
