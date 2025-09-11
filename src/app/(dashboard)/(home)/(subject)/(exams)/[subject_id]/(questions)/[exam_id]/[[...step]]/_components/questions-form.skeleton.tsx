import { Skeleton } from "@/components/ui/skeleton";

export default function QuizQuestionSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-sm rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-28" />
      </div>

      {/* Question */}
      <Skeleton className="h-8 w-3/4 mb-6" />

      {/* Options */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-8">
        <Skeleton className="h-12 w-32 rounded" />

        {/* Timer circle */}
        <div className="flex items-center justify-center">
          <Skeleton className="h-14 w-14 rounded-full" />
        </div>

        <Skeleton className="h-12 w-32 rounded" />
      </div>
    </div>
  );
}
