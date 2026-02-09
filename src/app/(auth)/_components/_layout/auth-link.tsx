import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type AuthLinkProps = {
  message?: string;
  linkText: string;
  href: string;
};

export default function AuthLink({ message, linkText, href }: AuthLinkProps) {
  return (
    <div
      className={cn(
        "mt-9 text-sm font-medium text-gray-500",
        message ? "text-center" : "text-end",
      )}
    >
      {/* Message */}
      {message && <span>{message}</span>}

      {/* Link */}
      <Link
        href={href}
        className="block mt-3 mb-4 text-blue-600 hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
}
