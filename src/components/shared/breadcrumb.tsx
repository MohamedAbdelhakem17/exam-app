import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

type BreadcrumbPath = {
  name: string;
  href?: string;
};

interface AppBreadcrumbProps {
  paths?: BreadcrumbPath[];
}

export default function AppBreadcrumb({ paths = [] }: AppBreadcrumbProps) {
  return (
    <Breadcrumb className="px-3 py-1 bg-white">
      <BreadcrumbList>
        {/* Home */}
        {paths.length === 0 ? (
          <BreadcrumbPage>Home</BreadcrumbPage>
        ) : (
          <BreadcrumbItem>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </BreadcrumbItem>
        )}

        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />

              {isLast ? (
                <BreadcrumbPage className="text-blue-600">
                  {path.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem>
                  <Link
                    href={path.href || "/"}
                    className="transition-colors hover:text-foreground"
                  >
                    {path.name}
                  </Link>
                </BreadcrumbItem>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
