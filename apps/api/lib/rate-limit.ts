import { type MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

// Simple in-memory rate limiter
const rateLimiter = new Map<string, { count: number; lastReset: number }>();

export const rateLimit = (options: {
  limit: number;
  windowMs: number;
}): MiddlewareHandler => {
  return async (c, next) => {
    // Use CF-Connecting-IP for Cloudflare, fallback to remote address or unknown
    const ip = c.req.header("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    const record = rateLimiter.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > options.windowMs) {
      record.count = 0;
      record.lastReset = now;
    }

    if (record.count >= options.limit) {
      throw new HTTPException(429, { message: "Too Many Requests" });
    }

    record.count++;
    rateLimiter.set(ip, record);

    await next();
  };
};
