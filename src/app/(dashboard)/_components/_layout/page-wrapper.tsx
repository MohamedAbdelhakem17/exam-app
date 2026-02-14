import AppBreadcrumb from "@/components/shared/breadcrumb";
import PageHeader from "@/components/shared/page-header";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type PageWrapperProps = {
  paths?: {
    name: string;
    href?: string;
  }[];
  children: React.ReactNode;
  headerOptions: {
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    back?: boolean;
    backHref?: string;
  };
};

export default function PageWrapper({
  paths,
  headerOptions,
  children,
}: PageWrapperProps) {
  return (
    <section className="flex flex-col  min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-50 space-y-3">
        {/* Breadcrumb  */}
        <AppBreadcrumb paths={paths} />

        {/* Page header  */}
        <PageHeader {...headerOptions} />

        {/*  */}
        <br className="pb-0.5" />
      </header>

      {/* Content */}
      <section className="px-6 pb-6 flex gap-x-6 flex-1 justify-center">
        {children}
      </section>
    </section>
  );
}
