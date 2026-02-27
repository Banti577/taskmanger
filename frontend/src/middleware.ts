import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next()
  }

  const refreshToken = req.cookies.get("token")?.value

  if (pathname.startsWith("/dashboard")) {
    if (!refreshToken) return NextResponse.redirect(new URL("/login", req.url))

    try {

      console.log('secret decode hua', secret)
      jwtVerify(refreshToken, secret)
      return NextResponse.next()
    } catch (err) {
      console.error("Token verification failed:", err)
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}