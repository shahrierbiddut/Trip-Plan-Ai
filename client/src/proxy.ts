import { NextResponse, type NextRequest } from "next/server";

// Note: We cannot check session cookies in middleware for cross-domain deployments
// (e.g., client on trip-plan-client.vercel.app, server on trip-plan-server.vercel.app)
// because the session cookie is set on the server domain and is not accessible here.
// Auth protection is handled client-side in each dashboard page via useSession().
export async function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};