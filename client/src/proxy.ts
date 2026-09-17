import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";

  const configuredAuthUrl =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(/\/+$/, "") ||
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
    "http://localhost:5000";

  const authUrl = configuredAuthUrl.endsWith("/api/auth")
    ? configuredAuthUrl
    : `${configuredAuthUrl}/api/auth`;

  try {
    const response = await fetch(`${authUrl}/get-session`, {
      headers: {
        cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      return redirectToLogin(request);
    }

    const session = await response.json();

    if (!session?.session) {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch {
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);

  loginUrl.searchParams.set(
    "redirect",
    request.nextUrl.pathname,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};