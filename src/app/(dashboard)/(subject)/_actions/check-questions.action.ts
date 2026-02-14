"use server";

import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import SERVER_ENV from "@/lib/env/server";
import { getToken } from "@/lib/utils/get-token";

export async function checkQuestions(data: AnswerCheck) {
  // Get Token
  const token = await getToken();

  // check if user already logged in
  if (!token) {
    return {
      code: 401,
      message: "not authorize login to continue",
    };
  }
  // Call API
  const response = await fetch(SERVER_ENV.BASE_API_URL + "/questions/check", {
    method: "POST",
    headers: {
      token: token.token as string,
      ...REQUEST_HEADERS,
    },
    body: JSON.stringify(data),
  });

  // Parse response
  const payload = await response.json();

  // Error case
  if (!response.ok) {
    return {
      code: response.status,
      message: payload.message || "Something went wrong",
    };
  }

  // Success case
  return payload;
}
