import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth(function proxy(req) {
  const isLoggedIn = !!req.auth?.user;
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  if (!isLoggedIn && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isDashboard && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
