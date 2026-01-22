
import { describe, it, expect } from "vitest";
import { isValidRedirectUrl, getSafeRedirectUrl } from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should accept valid relative URLs", () => {
      expect(isValidRedirectUrl("/")).toBe(true);
      expect(isValidRedirectUrl("/login")).toBe(true);
      expect(isValidRedirectUrl("/dashboard/settings")).toBe(true);
      expect(isValidRedirectUrl("/foo-bar")).toBe(true);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//google.com")).toBe(false);
      expect(isValidRedirectUrl("//localhost:3000")).toBe(false);
    });

    it("should reject absolute URLs to external domains", () => {
      expect(isValidRedirectUrl("https://google.com")).toBe(false);
      expect(isValidRedirectUrl("http://example.com")).toBe(false);
    });

    it("should reject URLs with backslashes", () => {
      expect(isValidRedirectUrl("/\\google.com")).toBe(false);
      expect(isValidRedirectUrl("\\google.com")).toBe(false);
      expect(isValidRedirectUrl("/foo\\bar")).toBe(false);
      expect(isValidRedirectUrl("\\")).toBe(false);
    });

    it("should accept URLs with query parameters", () => {
      expect(isValidRedirectUrl("/search?q=foo")).toBe(true);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return valid URLs as is", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return / for invalid URLs", () => {
      expect(getSafeRedirectUrl("https://google.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
      expect(getSafeRedirectUrl(123)).toBe("/");
      expect(getSafeRedirectUrl("/\\evil.com")).toBe("/");
    });
  });
});
