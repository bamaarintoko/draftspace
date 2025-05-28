import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname === "/" && token) {
    const redirectTo = role === "Admin" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // ✅ Sudah login, tapi masuk halaman auth → redirect
  if (token && isAuthPage) {
    const redirectTo = role === "Admin" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // 🚫 Belum login, tapi masuk halaman proteksi → redirect ke login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 🛡️ Proteksi role
  if (pathname.startsWith("/admin") && role !== "Admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/user") && role !== "User") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/admin/:path*",
    "/user/:path*",
    "/dashboard/:path*",
  ],
};
