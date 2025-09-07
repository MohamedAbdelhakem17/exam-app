import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { REQUEST_HEADERS } from "@/lib/constants/request-headers.constant";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });

    if (!token?.token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = req.nextUrl.searchParams;
    const limit = params.get("limit");
    const page = params.get("page");
    const subject = params.get("subject");

    const url = `${process.env.BASE_API_URL}/exams?limit=${limit}&page=${page}&subject=${subject}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            token: token?.token,
            ...REQUEST_HEADERS
        }
    })

    const payload: ApiResponse<ExamResponse> = await response.json()

    return NextResponse.json(payload);

}
