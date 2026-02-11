import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import SERVER_ENV from "@/lib/env/server";
import { authApiWrapper } from "@/lib/utils/auth-api-wrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = authApiWrapper(async (req: NextRequest, token) => {
  // Extract query parameters from the request URL
  const params = req.nextUrl.searchParams;

  // Encode the query parameters to be appended to the API URL
  const encodedParameters = new URLSearchParams({
    limit: params.get("limit") || "10",
    page: params.get("page") || "1",
  }).toString();

  // Make a GET request to the external API with the encoded query parameters and the token in the headers
  const response = await fetch(
    `${SERVER_ENV.BASE_API_URL}/subjects?${encodedParameters}`,
    {
      method: "GET",
      headers: {
        token: token?.token as string,
        ...REQUEST_HEADERS,
      },
    },
  );

  // Check if the response status is not 200 (OK) and return an error response if it's not
  if (response.status !== 200) {
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: response.status },
    );
  }

  //  Parse the JSON response from the external API and return it as a NextResponse
  const payload: ApiResponse<SubjectsResponse> = await response.json();

  // Return the parsed response as a JSON response to the client
  return NextResponse.json(payload);
});
