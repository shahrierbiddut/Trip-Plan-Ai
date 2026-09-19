/**
 * Central API URL utility
 * Uses NEXT_PUBLIC_API_URL env variable in production
 * Falls back to localhost:5000 for local development
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");
