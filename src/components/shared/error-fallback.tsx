"use client";

import { ImageError } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { MessageSquareWarning } from "lucide-react";
import Image from "next/image";

type ContentFallbackProps = {
  description: string;
};

export default function ErrorFallback({ description }: ContentFallbackProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      className={cn([
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 py-8 text-center shadow-sm h-fit my-auto",
        "after:size-40 after:absolute after:pointer-events-none  after:-top-24 after:right-0 after:rounded-full after:bg-rose-100 after:blur-3xl",
      ])}
    >
      {/* Alert  */}
      <div className="flex items-center gap-2 rounded-full border border-rose-200/70 bg-rose-50 px-3 py-1 text-rose-700">
        {/* Icon */}
        <MessageSquareWarning className="size-4" />

        {/* Label */}
        <span className="text-xs font-semibold uppercase tracking-wider">
          something wrong
        </span>
      </div>

      {/* Image */}
      <Image
        src={ImageError}
        alt="Error"
        width="400"
        height="280"
        className="mt-4 aspect-square rounded-xl  p-3 shadow-sm"
      />

      {/* Description */}
      <p className="my-5 max-w-md text-sm leading-6 text-slate-600 text-pretty ">
        {description}
      </p>

      {/* Reset and refresh action */}
      <Button type="button" onClick={handleRefresh} variant={"destructive"}>
        Reset & refresh
      </Button>
    </div>
  );
}
