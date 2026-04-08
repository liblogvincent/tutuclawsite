import { NextRequest, NextResponse } from "next/server";

const SESSION_TOKEN = "tutuclaw-admin-session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin pages (except /admin/login and /admin/api)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Also allow the secret route but still require cookie
    // Check for session cookie
    const session = request.cookies.get(SESSION_TOKEN);

    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
