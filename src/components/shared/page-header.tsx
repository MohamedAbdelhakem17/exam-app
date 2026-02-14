import { ChevronLeft, LucideProps } from "lucide-react";
import Link from "next/link";
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
    <header className="flex gap-x-2.5 mb-6 px-6 sticky top-12 z-10 ">
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
      <div className="flex items-center gap-3 bg-blue-600 px-5 py-2  flex-1">
        <Icon className="md:size-11 size-8 text-white " />
        <h2 className="md:text-3xl text-xl text-white font-inter font-semibold ">
          {title}
        </h2>
      </div>
    </header>
  );
}
