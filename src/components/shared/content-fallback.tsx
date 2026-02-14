import { ImageNotFound } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { MessageSquareWarning } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ContentFallbackProps = {
  title: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
};

export default function ContentFallback({
  title,
  description,
  link,
}: ContentFallbackProps) {
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
          No data
        </span>
      </div>

      {/* Image */}
      <Image
        src={ImageNotFound}
        alt="not found"
        width="280"
        height="280"
        className="mt-4 aspect-square rounded-xl  p-3 shadow-sm"
      />

      {/* Title */}
      <h3 className="mt-4 text-2xl font-bold text-slate-900">{title}</h3>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 text-pretty ">
        {description}
      </p>

      {/* Back to home action */}
      <Button className="mt-6 bg-slate-900 text-white hover:bg-slate-800">
        <Link href={link.href}>{link.label}</Link>
      </Button>
    </div>
  );
}
