import SubjectsCard from "./_components/subjects-card"
import { GraduationCap } from "lucide-react"
import { AppBreadcrumb, PageHeader } from "@/components/shared"

export default function Home() {
  return (
    <section className="flex flex-col gap-6 ">
      <AppBreadcrumb />

      <div className=" px-6">
        <PageHeader
          Icon={GraduationCap}
          title="Diplomas"
        />
        <SubjectsCard />
      </div>
    </section>
  )
}
