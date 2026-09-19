import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// For local dev fallback
// const configuredAuthUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(/\/+$/, "") || process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
// const baseURL = configuredAuthUrl
//   ? configuredAuthUrl.endsWith("/api/auth")
//     ? configuredAuthUrl
//     : `${configuredAuthUrl}/api/auth`
//   : "http://localhost:5000/api/auth"; 

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000/api/auth",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
