import PageWrapper from "@/app/(dashboard)/_components/_layout/page-wrapper";
import { getExamQuestions } from "@/lib/api/questions.api";
import { CircleQuestionMark } from "lucide-react";
import QuestionsLayout from "./_components/_layout/questions-layout";

type QuestionPageProps = {
  params: {
    "exam-id": string;
    "subject-id": string;
  };
};

export default async function QuestionPage({
  params: { "exam-id": examId, "subject-id": subjectId },
}: QuestionPageProps) {
  // Query
  const data:
    | MapQuestionsResponse
    | {
        message: string;
        code: number;
      } = await getExamQuestions(examId);

  // No data
  if ("code" in data) {
    return <h2>{data.message}</h2>;
  }

  // Variables
  const { subjectName, examName } = data;

  return (
    <PageWrapper
      paths={[{ name: "Exams", href: `/${subjectId}` }, { name: "Questions" }]}
      headerOptions={{
        Icon: CircleQuestionMark,
        title: `[${examName}] Questions - ${subjectName}`,
        back: true,
        backHref: `/${subjectId}`,
      }}
    >
      <QuestionsLayout data={data} />
    </PageWrapper>
  );
}
