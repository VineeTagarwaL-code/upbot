import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoute = "/dashboard";
  const getstarted = "/getstarted";
  console.log(req.nextUrl.pathname);
  console.log(session);
  if (req.nextUrl.pathname === getstarted && session) {
    console.log("Redirecting to dashboard");
    return NextResponse.redirect(new URL(protectedRoute, req.url));
  }
  if (req.nextUrl.pathname === protectedRoute && !session) {
    return NextResponse.redirect(new URL(getstarted, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/getstarted", "/"],
};
