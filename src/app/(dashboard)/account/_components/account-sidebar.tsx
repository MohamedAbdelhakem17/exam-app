"use client";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Lock, LogOutIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { LinkType } from "../../_components/side-bar/menu";
import { usePathname } from "next/navigation";

const MenuLinks = ({ path, label, Icon, isActive }: LinkType) => {
  return (
    <Link
      href={path}
      className={`flex items-center gap-2.5  ease-linear font-normal text-base p-2  mb-2.5
        ${
          isActive
            ? "text-blue-600 bg-blue-50"
            : "text-gray-500  hover:text-blue-600 hover:bg-blue-50"
        }
        `}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Link>
  );
};

export default function AccountSidebar() {
  // navigation
  const pathname = usePathname();

  // Variables
  const LINKS: Omit<LinkType, "isActive">[] = [
    {
      Icon: CircleUserRound,
      label: "Profile",
      path: "/account",
    },
    {
      Icon: Lock,
      label: "Change Password",
      path: "/account/change-password",
    },
  ];

  return (
    <aside className="w-72 flex flex-col justify-between p-6 bg-white fixed bottom-6 top-side-top">
      {/* Menu */}
      <ul>
        {LINKS.map((link, index) => {
          const isActive = pathname === link.path;
          return (
            <li key={index}>
              <MenuLinks {...link} isActive={isActive} />
            </li>
          );
        })}
      </ul>

      {/* Logout button */}
      <Button variant={"red"} className="flex items-center justify-start py-6">
        <LogOutIcon className="rotate-180" />
        <span>Logout</span>
      </Button>
    </aside>
  );
}
