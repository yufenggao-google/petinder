/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, it, expect } from "vitest";
import {
  isValidRedirectUrl,
  getSafeRedirectUrl,
  shouldRefreshSession,
  authConfig,
} from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should accept valid relative URLs", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/settings/profile")).toBe(true);
      expect(isValidRedirectUrl("/?query=123")).toBe(true);
    });

    it("should reject absolute URLs even if same origin", () => {
      // The implementation explicitly checks startsWith('/')
      const origin = window.location.origin;
      expect(isValidRedirectUrl(`${origin}/dashboard`)).toBe(false);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//google.com")).toBe(false);
      expect(isValidRedirectUrl("//localhost:5173")).toBe(false);
    });

    it("should reject URLs not starting with /", () => {
      expect(isValidRedirectUrl("dashboard")).toBe(false);
      expect(isValidRedirectUrl("https://google.com")).toBe(false);
      expect(isValidRedirectUrl("javascript:alert(1)")).toBe(false);
    });

    it("should reject backslashes (open redirect check)", () => {
      // Typically URL constructor handles these, but let's see implementation.
      // Implementation: startsWith('/') check.
      // '/\google.com' starts with '/'.
      // new URL('/\\google.com', origin) -> origin//google.com ?
      // If backslash, URL parser behavior depends on browser/environment.
      // The memory said: "requires explicit string checks (e.g., url.includes('\\')) for security validation."
      // But the current implementation DOES NOT have that check!
      // "isValidRedirectUrl utility... explicitly rejects URLs containing backslashes".
      // Let's check the implementation again:
      /*
        if (!url.startsWith("/") || url.startsWith("//")) {
          return false;
        }
        try {
          const parsed = new URL(url, window.location.origin);
          return authConfig.security.allowedRedirectOrigins.includes(parsed.origin);
        } catch {
          return false;
        }
      */
      // It DOES NOT check for backslashes explicitly.
      // If I am supposed to "Restore" tests, and the tests fail because of missing implementation, I might need to fix implementation too?
      // Or maybe the memory is describing what *should* be there, and I need to add the check?
      // But the file exists and I read it. The implementation is missing the backslash check.
      // Wait, if I write a test that fails, I can fix the code.
      // The memory says: "The isValidRedirectUrl utility... explicitly rejects URLs containing backslashes".
      // This implies the code *should* have it.
      // I will write the test to expect `false` for backslashes. If it fails (returns `true`), I will update `auth-config.ts` to match the security requirement.
      expect(isValidRedirectUrl("/\\google.com")).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return url for valid input", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return / for invalid input", () => {
      expect(getSafeRedirectUrl("http://google.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
      expect(getSafeRedirectUrl(123)).toBe("/");
    });
  });

  describe("shouldRefreshSession", () => {
    const { refreshThreshold } = authConfig.session;

    it("should return false if no expiry", () => {
      expect(shouldRefreshSession(undefined)).toBe(false);
    });

    it("should return false if already expired", () => {
      const past = new Date(Date.now() - 1000);
      expect(shouldRefreshSession(past)).toBe(false);
    });

    it("should return false if expiry is far in future", () => {
      const future = new Date(Date.now() + refreshThreshold + 10000);
      expect(shouldRefreshSession(future)).toBe(false);
    });

    it("should return true if expiry is within threshold", () => {
      const soon = new Date(Date.now() + refreshThreshold - 1000);
      expect(shouldRefreshSession(soon)).toBe(true);
    });
  });
});
