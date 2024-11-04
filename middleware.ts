import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");

  console.log("Pathname:", request.nextUrl.pathname);

  // Example conditional logic
  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (token && request.nextUrl.pathname === "/login") ||
    request.nextUrl.pathname === "/signup"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
