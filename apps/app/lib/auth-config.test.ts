
import { describe, expect, it } from "vitest";
import { getSafeRedirectUrl, isValidRedirectUrl } from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should accept valid relative URLs", () => {
      expect(isValidRedirectUrl("/")).toBe(true);
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/users/123")).toBe(true);
      expect(isValidRedirectUrl("/settings?tab=profile")).toBe(true);
    });

    it("should reject absolute URLs with different origin", () => {
      expect(isValidRedirectUrl("https://google.com")).toBe(false);
      expect(isValidRedirectUrl("http://example.com")).toBe(false);
    });

    it("should reject URLs with backslashes (security)", () => {
      // These are potential open redirect vectors if handled incorrectly
      expect(isValidRedirectUrl("/\\example.com")).toBe(false);
      expect(isValidRedirectUrl("\\\\example.com")).toBe(false);
      expect(isValidRedirectUrl("/path\\with\\backslashes")).toBe(false);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//example.com")).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return the URL if valid", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return / if invalid", () => {
      expect(getSafeRedirectUrl("https://google.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
      expect(getSafeRedirectUrl(123)).toBe("/");
    });

    it("should return / for backslash URLs", () => {
      expect(getSafeRedirectUrl("/\\example.com")).toBe("/");
    });
  });
});
