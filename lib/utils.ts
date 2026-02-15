import { NextRequest } from "next/server";
import { env } from "./env";

/**
 * Gets the base URL of the application.
 * Prioritizes the NEXT_PUBLIC_BASE_URL environment variable,
 * but falls back to the request headers if the env var is a placeholder or missing.
 */
export function getBaseUrl(req?: NextRequest) {
  const envBaseUrl = env.NEXT_PUBLIC_BASE_URL;
  
  // If the env var is not the placeholder, use it
  if (envBaseUrl && !envBaseUrl.includes("your-app.vercel.app")) {
    return envBaseUrl;
  }

  // Fallback to request headers if available
  if (req) {
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    if (host) {
      return `${protocol}://${host}`;
    }
  }

  // Absolute fallback
  return "http://localhost:3000";
}
