import { CircleX } from "lucide-react";

export default function ApiError({ children }: { children: string }) {
  return (
    <div className="border border-red-600 bg-red-50 text-red-600 py-2 text-center relative my-9">
      <CircleX
        strokeWidth={1}
        className="absolute w-5 h-15 top-0 left-1/2 -translate-x-2/4 -translate-y-2/4 z-30  fill-white"
      />
      <p>{children}</p>
    </div>
  );
}
