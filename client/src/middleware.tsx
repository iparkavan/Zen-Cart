import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = [
  "/signin",
  "/signup",
  "/",
  "/products",
  "/products/",
  /^\/products\/[^/]+$/,
];

const AUTH_REQUIRED_PATHS = ["/cart", "/checkout", "/orders"];

const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.some((path) =>
    typeof path === "string" ? pathname === path : path.test(pathname)
  );

const isAuthRequiredPath = (pathname: string) =>
  AUTH_REQUIRED_PATHS.some((path) => pathname.startsWith(path));

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // If the user is already logged in and visits /signin or /signup (directly)
  if (
    token &&
    (pathname === "/signin" || pathname === "/signup") &&
    !searchParams.get("redirect")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protected routes
  if (isAuthRequiredPath(pathname)) {
    if (!token) {
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // try {
    //   const secret = process.env.NEXT_PUBLIC_JWT_SECRET!;
    //   jwt.verify(token, secret);
    //   return NextResponse.next(); // valid token
    // } catch {
    //   const redirectUrl = new URL("/signin", request.url);
    //   redirectUrl.searchParams.set("redirect", pathname);
    //   return NextResponse.redirect(redirectUrl);
    // }
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
