import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  
  // Use environment variables for the API URL, default to localhost for dev
  const configuredAuthUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(/\/+$/, "") 
    || process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")
    || "http://localhost:5000";
    
  const authUrl = configuredAuthUrl.endsWith("/api/auth") 
    ? configuredAuthUrl 
    : `${configuredAuthUrl}/api/auth`;

  try {
    const res = await fetch(`${authUrl}/get-session`, {
      headers: {
        cookie: cookieHeader,
      },
    });
    
    if (!res.ok) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    const session = await res.json();
    if (!session || !session.session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    
  } catch (err) {
    // If the server is down or we can't connect, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
