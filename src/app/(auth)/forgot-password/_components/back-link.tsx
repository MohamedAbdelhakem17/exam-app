import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function BackLink({ path }: { path: string }) {
    return (
        <div className="w-lg mb-10">
            <Link href={path} className="flex items-center justify-center w-10 h-10 border border-gray-200 self-start">
                <MoveLeft className="w-6 h-6" />
            </Link>
        </div>
    )
}
