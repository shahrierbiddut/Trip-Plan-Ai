import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Check for better-auth session cookie directly in the browser request
  // This avoids cross-domain cookie issues where the cookie is in the browser
  // but can't be forwarded to the server from a server-side middleware fetch
  const cookies = request.cookies;
  
  // better-auth uses "my_app_v2.session_token" as cookie prefix
  const sessionToken = 
    cookies.get("my_app_v2.session_token") || 
    cookies.get("better-auth.session_token") ||
    cookies.get("__Secure-my_app_v2.session_token") ||
    cookies.get("__Secure-better-auth.session_token");

  if (!sessionToken?.value) {
    return redirectToLogin(request);
  }

  // If we have a session token cookie, allow the request through
  // The page itself will validate the full session via client-side useSession()
  return NextResponse.next();
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