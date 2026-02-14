"use server";

import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import SERVER_ENV from "@/lib/env/server";
import { getToken } from "@/lib/utils/get-token";
import "server-only";

export async function getExamQuestions(examId: string): Promise<
  | ExamData
  | {
      message: string;
      code: number;
    }
> {
  // Get the authentication token
  const token = await getToken();

  // If no token is found
  if (!token) {
    return {
      message: "Unauthorized",
      code: 401,
    };
  }

  // Make a GET request to the external API to fetch questions
  const response = await fetch(
    `${SERVER_ENV.BASE_API_URL}/questions?exam=${examId}`,
    {
      headers: {
        token: token.token as string,
        ...REQUEST_HEADERS,
      },
      cache: "no-store",
    },
  );

  // Check if the response status is not 200 (OK)
  const payload: ApiResponse<QuestionsResponse> = await response.json();

  // Check if the payload contains an error
  if ("code" in payload) {
    return {
      message: payload.message,
      code: payload.code,
    };
  }

  // Check if the questions array in the payload is empty
  if (payload.questions.length === 0) {
    return {
      message: "No questions found",
      code: 404,
    };
  }

  // return the exam data extracted from the payload
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
      }),
    ),
  };
}
