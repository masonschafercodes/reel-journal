import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const authCookie = request.cookies.get("access_token");

    // Protect all routes except auth-related ones
    if (!request.nextUrl.pathname.startsWith("/auth") && !authCookie) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Redirect authenticated users away from auth pages
    if (request.nextUrl.pathname.startsWith("/auth") && authCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
