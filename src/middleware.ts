import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/forgot-password/verify-otp",
  "/forgot-password/create-password",
];

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    const url = new URL("/login", request.nextUrl.origin);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/*).*)"],
};
