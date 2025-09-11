import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ExamCardSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-12 w-40 " />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-4 w-40" />
    </div>
  );
}
