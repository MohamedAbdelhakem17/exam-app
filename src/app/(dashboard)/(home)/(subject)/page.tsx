import SubjectsList from "./_components/subjects-list";
import { GraduationCap } from "lucide-react";
import { AppBreadcrumb, PageHeader } from "@/components/shared";
import { getToken } from "@/lib/utils/get-token";
import { redirect } from "next/navigation";
import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import DiplomasNotFound from "./not-found";

export default async function SubjectPage() {
  // Navigation
  const token = await getToken();
  if (!token) {
    redirect("/signin");
  }

  // Query
  const response = await fetch(
    `${process.env.BASE_API_URL}/subjects?limit=6&page==1`,
    {
      method: "GET",
      headers: {
        token: token?.token,
        ...REQUEST_HEADERS,
      },
    }
  );

  // Variables
  const payload = await response.json();

  return (
    <section className="flex flex-col gap-6 ">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-50 space-y-6">
        {/* Breadcrumb */}
        <AppBreadcrumb />

        {/* Header */}
        <PageHeader Icon={GraduationCap} title="Diplomas" />
      </header>

      {/* Content */}
      <div className="px-6 pb-6 flex gap-x-6 flex-1">
        {"code" in payload ? (
          // Not found case
          <DiplomasNotFound
            message={payload.message || "We couldn’t find any subject."}
          />
        ) : (
          // Include data
          <SubjectsList initialData={payload} />
        )}
      </div>
    </section>
  );
}
