import { AppBreadcrumb, PageHeader } from "@/components/shared";
import { BookOpenCheck } from "lucide-react";
import React from "react";
import ExamList from "./_components/exam-list";

export default function ExamPage({
  params: { subject_id },
}: {
  params: { subject_id: string };
}) {
  return (
    <section className="flex flex-col gap-6 ">
      <AppBreadcrumb paths={[{ name: "Exams" }]} />
      <div>
        <PageHeader
          Icon={BookOpenCheck}
          title="Exams"
          back={true}
          backHref="/"
        />
      </div>

      <ExamList subject={subject_id} />
    </section>
  );
}
