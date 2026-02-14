"use client";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Lock, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkType } from "../../_components/sidebar/menu";

const MenuLinks = ({ path, label, Icon, isActive }: LinkType) => {
  return (
    <Link
      href={path}
      className={`flex items-center gap-2.5 ease-linear font-normal text-base p-2  md:mb-2.5 h-full md:h-fit
        ${
          isActive
            ? "text-blue-600 bg-blue-50"
            : "text-gray-500  hover:text-blue-600 hover:bg-blue-50"
        }
        `}
    >
      <Icon className="w-6 h-6" />
      <span className="hidden md:block">{label}</span>
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
    <aside className="md:w-72 w-full flex md:flex-col flex-row justify-between md:p-6 p-2 bg-white md:h-full">
      {/* Menu */}
      <ul className="md:block flex gap-x-3 items-center">
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
      <Button
        variant={"red"}
        className="flex items-center justify-start py-6 w-fit md:w-full"
      >
        {/* Icon */}
        <LogOutIcon className="rotate-180" />

        {/* Label */}
        <span className="hidden md:block">Logout</span>
      </Button>
    </aside>
  );
}
