import { AppBreadcrumb, PageHeader } from "@/components/shared";
import { BookOpenCheck } from "lucide-react";
import React from "react";
import ExamList from "./_components/exam-list";
import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { getToken } from "@/lib/utils/get-token";
import { redirect } from "next/navigation";
import DiplomasNotFound from "../../not-found";

type PageProps = {
  params: { subject_id: string };
};

export default async function ExamPage({ params: { subject_id } }: PageProps) {
  // Navigation
  const token = await getToken();
  if (!token) {
    redirect("/signin");
  }

  // Query
  const response = await fetch(
    `${process.env.BASE_API_URL}/exams?limit=6&page=1&subject=${subject_id}`,
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
    <section className="flex flex-col gap-6">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-50 space-y-6">
        {/* Breadcrumb  */}
        <AppBreadcrumb paths={[{ name: "Exams" }]} />

        {/* Page header  */}
        <PageHeader
          Icon={BookOpenCheck}
          title="Exams"
          back={true}
          backHref="/"
        />
      </header>

      {/* Content */}
      <div className="px-6 pb-6">
        {"code" in payload ? (
          // Not found case
          <DiplomasNotFound
            message={
              payload.message || "We couldn’t find any exams for this subject."
            }
          />
        ) : (
          // Include data
          <ExamList subject={subject_id} initialData={payload} />
        )}
      </div>
    </section>
  );
}
