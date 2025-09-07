import Link from "next/link";
import { ChevronLeft, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface PageHeaderProps {
    Icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    back?: boolean;
    backHref?: string;
}

export default function PageHeader({
    Icon,
    title,
    back = false,
    backHref = "/",
}: PageHeaderProps) {
    return (
        <header className="flex gap-x-2.5 mb-6">
            {/* Back Button */}
            {back && (
                <Link
                    href={backHref}
                    className="flex items-center justify-center border border-blue-600 text-blue-600 px-2"
                >
                    <ChevronLeft className="w-6 h-6 " />
                </Link>
            )}

            {/* Left Section (icon + title) */}
            <div className="flex items-center gap-3 bg-blue-600 p-5  flex-1">
                <Icon className="w-11 h-11 text-white " />
                <h2 className="text-3xl text-white font-inter font-semibold ">
                    {title}
                </h2>
            </div>
        </header>
    );
}
