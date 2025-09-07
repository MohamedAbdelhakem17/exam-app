"use server";

import { getToken } from "@/lib/utils/get-token";
import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { cookies } from "next/headers";

export async function checkQuestions(data: AnswerCheck) {
  const token = await getToken();
  if (!token) {
    return null;
  }
  const url = process.env.BASE_API_URL + "/questions/check";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      token: token.token as string,
      ...REQUEST_HEADERS,
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();
  return payload;
}

/**
 * @summary Mark exam as completed by setting a cookie.
 */
export async function handleGoToExamResult() {
  cookies().set("examCompleted", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 5,
  });
}

/**
 * @summary Clear the exam completion cookie.
 */
export async function handleExamResult() {
  cookies().delete("examCompleted");
}
