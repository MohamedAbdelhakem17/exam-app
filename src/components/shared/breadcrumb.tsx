import React, { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from "next/link";

type BreadcrumbPath = {
    name: string;
    href?: string;
};

interface AppBreadcrumbProps {
    paths?: BreadcrumbPath[];
}

export default function AppBreadcrumb({ paths = [] }: AppBreadcrumbProps) {
    return (
        <Breadcrumb className="p-3 bg-white">

            <BreadcrumbList>
                {/* Home */}
                {
                    paths.length === 0
                        ? <BreadcrumbPage>
                            Home
                        </BreadcrumbPage>
                        : <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                }


                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1;

                    return (
                        <Fragment key={index}>
                            <BreadcrumbSeparator> / </BreadcrumbSeparator>

                            {isLast ? (
                                <BreadcrumbPage className="text-blue-600">
                                    {path.name}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={path.href as string}>{path.name as string}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
