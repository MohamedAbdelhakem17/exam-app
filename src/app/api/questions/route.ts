import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const exam = req.nextUrl.searchParams.get("exam");
  const url = `${process.env.BASE_API_URL}/questions?exam=${exam}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...REQUEST_HEADERS,
      token: token.token,
    },
  });

  if (response.status !== 200) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: response.status }
    );
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
