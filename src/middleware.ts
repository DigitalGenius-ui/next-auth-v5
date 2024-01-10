import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
import {
  protectedRouts,
  apiAuthPrefix,
  authRoutes,
  default_redirect,
} from "@/middlewareRoutes/index";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = protectedRouts.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(default_redirect, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
