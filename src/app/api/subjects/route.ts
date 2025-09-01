import { REQUEST_HEADERS } from '@/lib/constants/request-headers.constant';
import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const limit = params.get("limit");
    const page = params.get("page");

    const url = `${process.env.BASE_API_URL}/subjects?limit=${limit}&page=${page}`;

    const token = await getToken({ req });

    console.log("Token === ", token?.token)

    if (!token?.token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            token: token?.token,
            ...REQUEST_HEADERS,
        },
    });

    if (response.status !== 200) {
        console.log("here")
        return NextResponse.json({ error: "Failed to fetch subjects" }, { status: response.status });
    }

    const payload = await response.json();
    console.log(payload)
    return NextResponse.json(payload);
}
