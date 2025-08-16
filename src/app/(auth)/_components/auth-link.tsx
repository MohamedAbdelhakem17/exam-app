import Link from "next/link";

type AuthLinkProps = {
    message: string;
    linkText: string;
    href: string;
}

export default function AuthLink({ message, linkText, href }: AuthLinkProps) {
    return (
        <p className="text-sm font-medium text-center text-gray-500 mt-9">
            {message}
            <Link href={href} className="mt-3 mb-4 text-blue-600">
                {linkText}
            </Link>
        </p>
    );
}
