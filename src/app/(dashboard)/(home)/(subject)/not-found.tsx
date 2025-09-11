import Link from "next/link";

export default function DiplomasNotFound({ message }: { message: string }) {
  return (
    <div className="px-6 pb-6">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Content */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Not Found Data</h1>
          <p className="text-gray-500 mt-2">{message}</p>
          <Link
            href="/"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
