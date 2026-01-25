
import { describe, expect, it } from "vitest";
import { isValidRedirectUrl, authConfig } from "./auth-config";

describe("isValidRedirectUrl", () => {
  it("should allow valid relative paths", () => {
    expect(isValidRedirectUrl("/dashboard")).toBe(true);
    expect(isValidRedirectUrl("/profile/settings")).toBe(true);
    expect(isValidRedirectUrl("/")).toBe(true);
  });

  it("should reject absolute URLs", () => {
    expect(isValidRedirectUrl("https://google.com")).toBe(false);
    expect(isValidRedirectUrl("http://example.com")).toBe(false);
    expect(isValidRedirectUrl("ftp://example.com")).toBe(false);
  });

  it("should reject protocol-relative URLs", () => {
    expect(isValidRedirectUrl("//google.com")).toBe(false);
    expect(isValidRedirectUrl("//localhost:3000")).toBe(false);
  });

  it("should reject URLs with backslashes", () => {
    // These should be rejected to prevent open redirect vulnerabilities
    // arising from inconsistent parsing of backslashes in different browsers/environments.

    // Construct a URL that might be accepted if interpreted as relative path but dangerous if interpreted as protocol-relative
    const allowedOrigin = authConfig.security.allowedRedirectOrigins[0];
    // Remove protocol to get host
    const host = allowedOrigin.replace(/^https?:\/\//, "");

    expect(isValidRedirectUrl(`/\\${host}`)).toBe(false);
    expect(isValidRedirectUrl("/\\google.com")).toBe(false);
    expect(isValidRedirectUrl("/path\\with\\backslashes")).toBe(false);
  });
});
