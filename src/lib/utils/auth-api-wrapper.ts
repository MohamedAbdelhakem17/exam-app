import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type Handler = (req: NextRequest, token: JWT | null) => Promise<NextResponse>;

export function authApiWrapper(handler: Handler) {
  return async (req: NextRequest) => {
    // Get Token from the request
    const token = await getToken({ req });

    // If no token is found, return an unauthorized response
    if (!token?.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If token is found, proceed to the handler
    return handler(req, token);
  };
}
