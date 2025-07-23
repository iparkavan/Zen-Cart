import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_PATHS,
  RootRoute,
  SignInRoute,
} from "./lib/routes";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

const isProtectedRoutes = (pathname: string) =>
  PROTECTED_ROUTES.some((path) => pathname.startsWith(path));

const isAuthRoutes = (pathname: string) =>
  AUTH_ROUTES.some((path) => pathname.startsWith(path));

const verifyToken = async (token: string): Promise<any | null> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    console.log("JWT secret:", secret);
    const { payload } = await jwtVerify(token, secret);
    console.log("JWT payload:", payload);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const secret = process.env.JWT_SECRET!;

  // If the user is already logged in and visits /signin or /signup (directly)
  if (token && isAuthRoutes(pathname) && !searchParams.get("redirect")) {
    return NextResponse.redirect(new URL(RootRoute, request.url));
  }

  // Protected routes
  if (isProtectedRoutes(pathname)) {
    if (!token) {
      const redirectUrl = new URL(SignInRoute, request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const verified = await verifyToken(token);

    if (!verified) {
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next(); // everything else
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// export function middleware(request: NextRequest) {
//   const { nextUrl } = request;
//   const token = request.cookies.get("token")?.value;

//   const isToken = !!token;

//   console.log("Middleware token:", isToken, nextUrl.pathname);

//   const isPublicPath =
//     (PUBLIC_PATHS.find((route) => nextUrl.pathname.startsWith(route)) ||
//       nextUrl.pathname === "/") &&
//     !AUTH_REQUIRED_PATHS.find((route) => nextUrl.pathname.startsWith(route));

//   console.log("Is public path:", isPublicPath);

//   if (!isToken && !isPublicPath) {
//     console.log("No token found, redirecting to /signin");
//     return NextResponse.redirect(new URL("/signin", nextUrl));
//   }

//   return NextResponse.next();
// }
