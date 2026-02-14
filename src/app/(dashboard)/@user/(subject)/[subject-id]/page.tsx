import DiplomasNotFound from "@/app/(dashboard)/@user/(subject)/not-found";
import PageWrapper from "@/app/(dashboard)/_components/_layout/page-wrapper";
import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { getToken } from "@/lib/utils/get-token";
import { BookOpenCheck } from "lucide-react";
import { redirect } from "next/navigation";
import ExamList from "./_components/exam-list";

type PageProps = {
  params: { "subject-id": string };
};

export default async function ExamPage({
  params: { "subject-id": subjectId },
}: PageProps) {
  // Navigation
  const token = await getToken();
  if (!token) {
    redirect("/signin");
  }

  // Query
  const response = await fetch(
    `${process.env.BASE_API_URL}/exams?limit=6&page=1&subject=${subjectId}`,
    {
      method: "GET",
      headers: {
        token: token?.token,
        ...REQUEST_HEADERS,
      },
    },
  );

  // Variables
  const payload = await response.json();

  return (
    <PageWrapper
      paths={[{ name: "Exams" }]}
      headerOptions={{
        Icon: BookOpenCheck,
        title: "Exams",
        back: true,
        backHref: "/",
      }}
    >
      {/* Content */}
      {"code" in payload ? (
        // Not found case
        <DiplomasNotFound
          message={
            payload.message || "We couldn’t find any exams for this subject."
          }
        />
      ) : (
        // Include data
        <ExamList subject={subjectId} />
      )}
    </PageWrapper>
  );
}
