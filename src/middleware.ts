// Public routes = ["/signin", "/signup", "/forgot-password"]
//  if token and go to Public routes redirect to "/"
//  if not token and go to Public routes complete to route
//  if not token and go to anther routes in Public redirect to "/signin"
//  if token and go to anther routes in Public   complete to route

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ["/signin", "/signup", "/forgot-password"]

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })

    if (PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (!token) {
        const url = new URL('/signin', request.nextUrl.origin)
        url.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public/*).*)',
    ],
}


