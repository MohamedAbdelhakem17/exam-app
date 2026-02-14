import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import SERVER_ENV from "@/lib/env/server";
import { authApiWrapper } from "@/lib/utils/auth-api-wrapper";

import { NextRequest, NextResponse } from "next/server";

export const GET = authApiWrapper(async (req: NextRequest, token) => {
  // Extract the "exam" query parameter
  const encodedExam = new URLSearchParams(req.nextUrl.search).get("exam");

  //  Fetch questions from the external API
  const response = await fetch(
    `${SERVER_ENV.BASE_API_URL}/questions?exam=${encodedExam}`,
    {
      method: "GET",
      headers: {
        ...REQUEST_HEADERS,
        token: token?.token as string,
      },
    },
  );

  // Check if the response status is not 200 (OK) and return an error response if it's not
  if (response.status !== 200) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: response.status },
    );
  }

  // Parse the JSON response from the external API and return it as a NextResponse
  const payload = await response.json();

  // Return the parsed response as a JSON response to the client
  return NextResponse.json(payload);
});
