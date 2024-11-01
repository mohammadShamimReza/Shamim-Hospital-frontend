import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users to the login page
  if (!currentUser && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from the login page to the homepage
  if (currentUser && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};