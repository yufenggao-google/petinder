/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, expect, it } from "vitest";
import {
  getSafeRedirectUrl,
  isValidRedirectUrl,
  shouldRefreshSession,
} from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should allow relative URLs", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/settings/profile")).toBe(true);
    });

    it("should reject absolute URLs with different origin", () => {
      expect(isValidRedirectUrl("https://example.com")).toBe(false);
      expect(isValidRedirectUrl("http://evil.com/login")).toBe(false);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//example.com")).toBe(false);
    });

    it("should reject URLs not starting with /", () => {
      expect(isValidRedirectUrl("dashboard")).toBe(false);
    });

    it("should reject absolute URLs even if matching origin", () => {
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:5173";
      // authConfig initializes allowedRedirectOrigins using window.location.origin.
      expect(isValidRedirectUrl(`${origin}/dashboard`)).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return the URL if valid", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return root if invalid", () => {
      expect(getSafeRedirectUrl("https://example.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
    });
  });

  describe("shouldRefreshSession", () => {
    it("should return true if session is expiring soon", () => {
      const now = Date.now();
      // 5 minutes from now (threshold is 10 min)
      const expiresAt = new Date(now + 5 * 60 * 1000);
      expect(shouldRefreshSession(expiresAt)).toBe(true);
    });

    it("should return false if session is valid for a long time", () => {
      const now = Date.now();
      // 20 minutes from now
      const expiresAt = new Date(now + 20 * 60 * 1000);
      expect(shouldRefreshSession(expiresAt)).toBe(false);
    });

    it("should return false if session is already expired", () => {
      const now = Date.now();
      const expiresAt = new Date(now - 1000);
      expect(shouldRefreshSession(expiresAt)).toBe(false);
    });

    it("should return false if expiresAt is missing", () => {
      expect(shouldRefreshSession(undefined)).toBe(false);
    });
  });
});
