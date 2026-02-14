import { getToken } from "@/lib/utils/get-token";
import { GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";
import PageWrapper from "./../_components/_layout/page-wrapper";
import SubjectsList from "./_components/subjects-list";

export default async function SubjectPage() {
  // Navigation
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  return (
    <PageWrapper
      headerOptions={{
        Icon: GraduationCap,
        title: "Diplomas",
        back: false,
      }}
    >
      {/* Content */}

      <SubjectsList />
    </PageWrapper>
  );
}
