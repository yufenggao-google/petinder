import { describe, expect, it } from "vitest";
import {
  authConfig,
  getSafeRedirectUrl,
  isValidRedirectUrl,
  shouldRefreshSession,
} from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should allow valid relative paths", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/settings/profile")).toBe(true);
      expect(isValidRedirectUrl("/?query=123")).toBe(true);
    });

    it("should reject absolute URLs", () => {
      expect(isValidRedirectUrl("https://google.com")).toBe(false);
      expect(isValidRedirectUrl("http://evil.com/login")).toBe(false);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//google.com")).toBe(false);
    });

    it("should reject URLs without leading slash", () => {
      expect(isValidRedirectUrl("dashboard")).toBe(false);
    });

    it("should reject backslashes (open redirect bypass)", () => {
      expect(isValidRedirectUrl("/\\google.com")).toBe(false);
      expect(isValidRedirectUrl("\\google.com")).toBe(false);
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
  });

  describe("shouldRefreshSession", () => {
    const { refreshThreshold } = authConfig.session;

    it("should return false if no expiry provided", () => {
      expect(shouldRefreshSession(undefined)).toBe(false);
    });

    it("should return false if session is already expired", () => {
      const expired = new Date(Date.now() - 1000);
      expect(shouldRefreshSession(expired)).toBe(false);
    });

    it("should return false if session is fresh (expiry > threshold)", () => {
      // 1 minute more than threshold
      const fresh = new Date(Date.now() + refreshThreshold + 60000);
      expect(shouldRefreshSession(fresh)).toBe(false);
    });

    it("should return true if session is expiring soon (expiry < threshold)", () => {
      // 1 minute less than threshold
      const expiringSoon = new Date(Date.now() + refreshThreshold - 60000);
      expect(shouldRefreshSession(expiringSoon)).toBe(true);
    });

    it("should work with string dates", () => {
      const expiringSoon = new Date(
        Date.now() + refreshThreshold - 60000,
      ).toISOString();
      expect(shouldRefreshSession(expiringSoon)).toBe(true);
    });
  });
});
