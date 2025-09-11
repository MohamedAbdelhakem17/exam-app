import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-sm rounded-lg flex flex-col gap-10">
      <div className="flex gap-10">
        {/* Left side (Chart + Stats) */}
        <div className="flex flex-col items-center gap-6 w-1/3">
          {/* Title */}
          <Skeleton className="h-6 w-32" />

          {/* Donut Chart */}
          <Skeleton className="h-48 w-48 rounded-full" />

          {/* Stats */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        {/* Right side (Questions + Answers) */}
        <div className="flex-1 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Question */}
              <Skeleton className="h-6 w-2/3" />
              {/* Answer blocks */}
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between items-center mt-8">
        <Skeleton className="h-12 w-40 rounded-md" />
        <Skeleton className="h-12 w-40 rounded-md" />
      </div>
    </div>
  );
}
