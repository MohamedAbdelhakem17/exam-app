import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { authApiWrapper } from "@/lib/utils/auth-api-wrapper";
import { NextRequest, NextResponse } from "next/server";
import SERVER_ENV from "./../../../lib/env/server";

export const GET = authApiWrapper(async (req: NextRequest, token) => {
  // Extract query parameters from the request URL
  const params = req.nextUrl.searchParams;

  // Encode the query parameters to be appended to the API URL
  const encodedParameters = new URLSearchParams({
    limit: params.get("limit") || "",
    page: params.get("page") || "",
    subject: params.get("subject") || "",
  }).toString();

  // Make a GET request to the external API with the encoded query parameters and the token in the headers
  const response = await fetch(
    `${SERVER_ENV.BASE_API_URL}/exams?${encodedParameters}`,
    {
      method: "GET",
      headers: {
        token: token?.token as string,
        ...REQUEST_HEADERS,
      },
    },
  );

  // Parse the JSON response from the external API and return it as a NextResponse
  const payload: ApiResponse<ExamResponse> = await response.json();

  // Return the parsed response as a JSON response to the client
  return NextResponse.json(payload);
});
