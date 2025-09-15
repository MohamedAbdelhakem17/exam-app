import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/signin", "/signup", "/forgot-password"];

export default async function middleware(request: NextRequest) {
  // Retrieves the JWT token from the request to check for an active session.
  const token = await getToken({ req: request });

  // Checks if the requested path is a public route.
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    // If the user is already logged in, redirect them from public pages (like /signin) to the homepage.
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allows the request to proceed for unauthenticated users on public routes.
    return NextResponse.next();
  }

  // If the user is not authenticated and the route is not public, redirect to sign-in.
  if (!token) {
    const url = new URL("/signin", request.nextUrl.origin);
    // Appends the original URL as a callback parameter for redirection after successful login.
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);

    // Redirects the user to the sign-in page.
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and accessing a protected route, allow the request to proceed.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/*).*)"],
};
