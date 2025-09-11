import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="text-6xl font-bold text-red-600 mb-2">404</div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
