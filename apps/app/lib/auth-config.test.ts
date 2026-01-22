import { describe, it, expect } from "vitest";
import { isValidRedirectUrl, getSafeRedirectUrl } from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should return true for valid relative URLs", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/settings/profile")).toBe(true);
    });

    it("should return false for absolute URLs", () => {
      expect(isValidRedirectUrl("https://example.com")).toBe(false);
      expect(isValidRedirectUrl("http://evil.com")).toBe(false);
    });

    it("should return false for protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//evil.com")).toBe(false);
    });

    it("should return false for URLs not starting with /", () => {
      expect(isValidRedirectUrl("dashboard")).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return the url if valid", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return / if url is invalid", () => {
      expect(getSafeRedirectUrl("https://evil.com")).toBe("/");
      expect(getSafeRedirectUrl("//evil.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
    });
  });
});
