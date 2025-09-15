import SubjectsList from "./_components/subjects-list";
import { GraduationCap } from "lucide-react";
import { AppBreadcrumb, PageHeader } from "@/components/shared";
import DiplomasNotFound from "./not-found";
import { getSubjects } from "@/lib/apis/subjects.api";

export default async function SubjectPage() {
  // Variables
  const subjects = await getSubjects();

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
        {"code" in subjects ? (
          // Not found case
          <DiplomasNotFound message={subjects.message || "We couldn’t find any subject."} />
        ) : (
          // Include data
          <SubjectsList />
        )}
      </div>
    </section>
  );
}
