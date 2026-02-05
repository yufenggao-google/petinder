import { describe, it, expect } from "vitest";
import { isValidRedirectUrl } from "./auth-config";

describe("isValidRedirectUrl", () => {
  it("allows valid relative paths", () => {
    expect(isValidRedirectUrl("/dashboard")).toBe(true);
    expect(isValidRedirectUrl("/settings/profile")).toBe(true);
  });

  it("rejects absolute URLs with different origin", () => {
    expect(isValidRedirectUrl("https://evil.com")).toBe(false);
    expect(isValidRedirectUrl("http://evil.com")).toBe(false);
  });

  it("rejects protocol-relative URLs", () => {
    expect(isValidRedirectUrl("//evil.com")).toBe(false);
  });

  it("should reject backslashes to prevent open redirects", () => {
    // This is the security fix we need to implement
    expect(isValidRedirectUrl("/\\evil.com")).toBe(false);
    expect(isValidRedirectUrl("\\\\evil.com")).toBe(false);
    // This case currently passes (returns true) in HappyDOM but should be rejected for security
    expect(isValidRedirectUrl("/foo\\bar")).toBe(false);
  });
});
