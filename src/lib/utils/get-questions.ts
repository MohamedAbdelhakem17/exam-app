"use server";

import "server-only";
import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { getToken } from "@/lib/utils/get-token";

export async function getExamQuestions(
  examId: string
): Promise<ExamData | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const url = `${process.env.BASE_API_URL}/questions?exam=${examId}`;

  const response = await fetch(url, {
    headers: {
      token: token.token as string,
      ...REQUEST_HEADERS,
    },
    cache: "no-store",
  });

  const payload: ApiResponse<QuestionsResponse> = await response.json();

  if ("code" in payload) {
    return null;
  }

  if (payload.questions.length === 0) return null;

  return {
    subjectName: payload.questions[0]?.subject?.name || null,
    examName: payload.questions[0]?.exam?.title || null,
    duration: payload.questions[0]?.exam?.duration || null,
    questions: payload.questions.map(
      (q: QuestionType): QuestionType => ({
        question: q.question,
        _id: q._id,
        createdAt: q.createdAt,
        answers: q.answers,
        correct: q.correct,
      })
    ),
  };
}
