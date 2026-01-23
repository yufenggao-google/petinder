import { describe, expect, it } from "vitest";
import { getSafeRedirectUrl, isValidRedirectUrl } from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should return true for valid relative URLs", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/profile/settings")).toBe(true);
    });

    it("should return false for absolute URLs", () => {
      expect(isValidRedirectUrl("https://example.com")).toBe(false);
      expect(isValidRedirectUrl("http://evil.com")).toBe(false);
    });

    it("should return false for protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//evil.com")).toBe(false);
    });

    it("should return false for invalid URLs", () => {
      expect(isValidRedirectUrl("javascript:alert(1)")).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return the URL if it is valid", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return '/' if the URL is invalid", () => {
      expect(getSafeRedirectUrl("https://example.com")).toBe("/");
      expect(getSafeRedirectUrl("//evil.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
    });
  });
});
