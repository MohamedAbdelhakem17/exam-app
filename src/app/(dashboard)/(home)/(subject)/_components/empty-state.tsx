import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
};

export default function EmptyState({
  title,
  description,
  link,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="text-gray-500 mt-2">{description}</p>

      {/* Link */}
      <Link
        href={link.href}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {link.label}
      </Link>
    </div>
  );
}
