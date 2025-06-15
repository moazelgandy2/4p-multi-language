import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { localApi } from "../localUrl";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req) {
  const allCookies = cookies();
  const userDetailsCookie = allCookies.get("userDetails");
  const locale = req.nextUrl.pathname.split("/")[1] || "en";
  const requestedPath = req.nextUrl.pathname;

  const authPaths = [`/${locale}/login`, `/${locale}/register`];
  const isGoingToAuthPath = authPaths.includes(requestedPath);

  const restrictedPaths = [`/${locale}/setting`];
  const isGoingToRestrictedPath = restrictedPaths.some((path) =>
    requestedPath.startsWith(path)
  );

  if (!userDetailsCookie) {
    if (isGoingToRestrictedPath) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
    return intlMiddleware(req);
  }

  try {
    const userDetails = JSON.parse(userDetailsCookie.value);
    const token = userDetails?.token;

    if (!token) {
      const response = intlMiddleware(req);
      response.cookies.delete("userDetails");
      if (isGoingToRestrictedPath) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
      }
      return response;
    }

    const profileRes = await fetch(`${localApi}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!profileRes.ok) {
      const response = intlMiddleware(req);
      response.cookies.delete("userDetails");
      if (isGoingToRestrictedPath) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
      }
      console.log("profileRes", profileRes);
      return response;
    }

    const profileData = await profileRes.json();
    const isVerified = profileData?.data?.email_verified_at;

    if (!isVerified) {
      console.log("isVerified", isVerified);
      if (requestedPath !== `/${locale}/register`) {
        return NextResponse.redirect(new URL(`/${locale}/register`, req.url));
      }
    } else {
      if (isGoingToAuthPath) {
        console.log("isGoingToAuthPath", isGoingToAuthPath);
        return NextResponse.redirect(new URL(`/${locale}`, req.url));
      }
    }
  } catch (e) {
    console.error("Middleware error:", e);
    const response = intlMiddleware(req);
    response.cookies.delete("userDetails");
    if (isGoingToRestrictedPath) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
    return response;
  }

  return intlMiddleware(req);
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
