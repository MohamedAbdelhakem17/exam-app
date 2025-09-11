import { Skeleton } from "@/components/ui/skeleton";

export default function SubjectCardSkeleton() {
  return (
    <div className="col-span-1 relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Image Skeleton */}
      <div>
        <Skeleton className="h-96 w-full" />
      </div>

      {/* Description Skeleton */}
      <div className="absolute bg-blue-500/20 backdrop-blur-md bottom-3 start-3 end-3 py-5 px-4 w-[calc(100%-1.5rem)] rounded-lg">
        <Skeleton className="h-6 w-32 rounded" />
      </div>
    </div>
  );
}
