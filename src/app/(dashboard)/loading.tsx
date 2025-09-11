import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Main loading spinner */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="bg-white rounded-lg border border-blue-200 p-6">
            <Skeleton className="h-8 w-48 mb-4 bg-blue-100" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <Skeleton className="h-6 w-full mb-3 bg-emerald-100" />
                <Skeleton className="h-4 w-full mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-2/3 mb-4 bg-gray-200" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 bg-blue-100" />
                  <Skeleton className="h-8 w-16 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32 bg-gray-200" />
              <Skeleton className="h-10 w-24 bg-blue-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
