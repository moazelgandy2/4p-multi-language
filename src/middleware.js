import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req) {
  const response = intlMiddleware(req);

  const allCookies = await cookies();
  const userDetails = await allCookies.get("userDetails");

  const token = userDetails ? JSON.parse(userDetails.value).token : null;

  const protectedPaths = [
    "/en/login",
    "/ar/login",
    "/ar/register",
    "/en/register",
  ];
  const restrictedPaths = ["/en/setting", "/ar/setting"];

  const requestedPath = req.nextUrl.pathname;

  const departmentId = req.nextUrl.searchParams.get("departmentId");
  if (departmentId) {
    req.nextUrl.searchParams.set("departmentId", departmentId);
  }

  if (token && protectedPaths.includes(requestedPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && restrictedPaths.includes(requestedPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/about",
    "/contact",
    "/login",
    "/register",
    "/vendor/:id",
    "/categories",
    "/vip-discounts",
    "/categories/:name/:id",
    "/news",
    "/news/:name/:id",
    "/setting",
    "/education/:name",
    "/education/:name/:name/:id",
    "/search",
  ],
};
