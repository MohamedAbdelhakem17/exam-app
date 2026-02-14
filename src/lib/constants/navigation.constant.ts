import SYSTEM_ROLES from "@/lib/constants/system-roles";
import { GraduationCap, LucideProps, UserRound } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Role = keyof typeof SYSTEM_ROLES;

type Link = {
  path: string;
  label: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  roles: Role[];
};

const LINKS: Link[] = [
  {
    path: "/",
    label: "Diplomas",
    Icon: GraduationCap,
    roles: [SYSTEM_ROLES.USER],
  },
  {
    path: "/account",
    label: "Account Settings",
    Icon: UserRound,
    roles: [SYSTEM_ROLES.USER, SYSTEM_ROLES.ADMIN],
  },
];

export default LINKS;
