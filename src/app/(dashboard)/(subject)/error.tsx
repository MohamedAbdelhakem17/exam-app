"use client";

import { useTransition } from "react";

export default function DiplomasError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      reset();
      window.location.reload();
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="rounded-lg border border-red-200 bg-white shadow-sm max-w-md w-full">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <h2 className="text-lg font-semibold">{error.message}</h2>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-gray-600 mb-6">
            We couldn’t load the page. Please try again.
          </p>

          <button
            onClick={handleClick}
            disabled={isPending}
            className={`px-4 py-2 rounded-lg transition ${
              isPending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isPending ? "Retrying..." : "Retry"}
          </button>
        </div>
      </div>
    </div>
  );
}
