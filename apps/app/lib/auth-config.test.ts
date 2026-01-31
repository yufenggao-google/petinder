import { describe, it, expect } from "vitest";
import {
  isValidRedirectUrl,
  getSafeRedirectUrl,
  shouldRefreshSession,
} from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should accept valid relative URLs", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/settings/profile")).toBe(true);
    });

    it("should reject absolute URLs", () => {
      expect(isValidRedirectUrl("https://example.com")).toBe(false);
      expect(isValidRedirectUrl("http://google.com")).toBe(false);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//example.com")).toBe(false);
    });

    it("should reject URLs without leading slash", () => {
      expect(isValidRedirectUrl("dashboard")).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return the URL if valid", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return / if invalid", () => {
      expect(getSafeRedirectUrl("https://example.com")).toBe("/");
      expect(getSafeRedirectUrl("//example.com")).toBe("/");
      expect(getSafeRedirectUrl("invalid")).toBe("/");
    });

    it("should return / if null or undefined", () => {
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
    });
  });

  describe("shouldRefreshSession", () => {
    it("should return true if session is expiring soon", () => {
      const now = Date.now();
      // Expiring in 5 minutes (threshold is 10 minutes)
      const expiringSoon = new Date(now + 5 * 60 * 1000);
      expect(shouldRefreshSession(expiringSoon)).toBe(true);
    });

    it("should return false if session is not expiring soon", () => {
      const now = Date.now();
      // Expiring in 20 minutes
      const notExpiringSoon = new Date(now + 20 * 60 * 1000);
      expect(shouldRefreshSession(notExpiringSoon)).toBe(false);
    });

    it("should return false if session is already expired", () => {
      const now = Date.now();
      const expired = new Date(now - 1000);
      expect(shouldRefreshSession(expired)).toBe(false);
    });

    it("should return false if expiresAt is undefined", () => {
      expect(shouldRefreshSession(undefined)).toBe(false);
    });
  });
});
