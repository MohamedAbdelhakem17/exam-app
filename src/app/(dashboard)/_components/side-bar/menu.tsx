"use client"

import { GraduationCap, LucideProps, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import ProfileMenu from "./profile-menu";

type LinkType = {
    path: string;
    label: string;
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    isActive?: boolean;
};

const MenuLinks = ({ path, label, Icon, isActive }: LinkType) => {
    return (
        <Link href={path} className={`flex items-center gap-2.5  ease-linear text-gray-500 font-medium text-base p-4 border mb-2.5
        ${isActive ? " border-blue-500 bg-blue-100 text-blue-500 " : "border-transparent  hover:border-blue-200 hover:bg-blue-100 hover:text-blue-500"}
        `}>
            <Icon className="w-6 h-6" />
            <span>{label}</span>
        </Link>
    );
};

export default function Menu() {
    const pathname = usePathname();

    const LINKS: Omit<LinkType, 'isActive'>[] = [
        {
            path: "/",
            label: "Diplomas",
            Icon: GraduationCap
        },
        {
            path: "/profile",
            label: "Account Settings",
            Icon: UserRound
        }
    ];

    return (
        <div className="flex-1  flex flex-col justify-between">
            {/* Links */}
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

            {/* Profile */}
            <ProfileMenu />
        </div>
    );
}
