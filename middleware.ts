import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the JWT token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;

  // Allow access to auth pages if not logged in
  if (pathname.startsWith("/auth/")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Check if user has superAdmin role
    const adminRoles = token?.adminRoles ? token.adminRoles.split(",") : [];
    const hasAdminAccess = adminRoles.includes("superAdmin");
    if (!hasAdminAccess) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/auth/:path*"],
};
