import { Skeleton } from "@/components/ui/skeleton";

export default function ExamCardSkeleton() {
  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="space-y-2 w-full">
        <Skeleton className="h-12 w-full " />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}
