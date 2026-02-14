"use client";

import LINKS from "@/lib/constants/navigation.constant";
import SYSTEM_ROLES from "@/lib/constants/system-roles";
import { LucideProps } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import ProfileMenu from "./profile-menu";

export type LinkType = {
  path: string;
  label: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  isActive?: boolean;
};

const MenuLinks = ({ path, label, Icon, isActive }: LinkType) => {
  return (
    <Link
      href={path}
      className={`flex items-center gap-2.5  ease-linear text-gray-500 font-medium text-base px-4 py-2 border mb-2
        ${
          isActive
            ? " border-blue-500 bg-blue-100 text-blue-500 "
            : "border-transparent  hover:border-blue-200 hover:bg-blue-100 hover:text-blue-500"
        }
        `}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Link>
  );
};

export default function Menu() {
  // Navigation
  const pathname = usePathname();

  const { data: session } = useSession();

  const role = session?.role as keyof typeof SYSTEM_ROLES | undefined;
  return (
    <div className="flex-1  flex flex-col justify-between">
      {/* Links */}
      <ul>
        {LINKS.filter((link) => role && link.roles.includes(role)).map(
          (link, index) => {
            const isActive =
              link.path === "/"
                ? pathname === "/" || !pathname.startsWith("/account")
                : pathname.startsWith(link.path);

            return (
              // Link
              <li key={index}>
                <MenuLinks {...link} isActive={isActive} />
              </li>
            );
          },
        )}
      </ul>

      {/* Profile */}
      <ProfileMenu />
    </div>
  );
}
