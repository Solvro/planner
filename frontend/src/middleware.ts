import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com https://fonts.gstatic.com ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""};
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""} https://analytics.solvro.pl;
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: https://avatars.githubusercontent.com https://wit.pwr.edu.pl https://cms.solvro.pl https://apps.usos.pwr.edu.pl;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replaceAll(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const nextResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  nextResponse.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const tokens = {
    token: request.cookies.get("access_token")?.value,
    secret: request.cookies.get("access_token_secret")?.value,
  };

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/plans/account");
  const user = await auth(tokens);

  if (!isProtectedRoute) {
    return nextResponse;
  }

  if (user === null) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return nextResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
