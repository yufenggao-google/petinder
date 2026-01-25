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

    it("should reject absolute URLs", () => {
      expect(isValidRedirectUrl("https://google.com")).toBe(false);
      expect(isValidRedirectUrl("http://localhost:3000")).toBe(false);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//google.com")).toBe(false);
    });

    it("should reject URLs without leading slash", () => {
      expect(isValidRedirectUrl("dashboard")).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return valid URLs as is", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should fallback to root for invalid URLs", () => {
      expect(getSafeRedirectUrl("https://google.com")).toBe("/");
      expect(getSafeRedirectUrl("//google.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
    });
  });

  describe("shouldRefreshSession", () => {
    it("should return false if no expiry", () => {
      expect(shouldRefreshSession(undefined)).toBe(false);
    });

    it("should return false if expired", () => {
      const expired = new Date(Date.now() - 1000);
      expect(shouldRefreshSession(expired)).toBe(false);
    });

    it("should return true if expiring soon", () => {
      // authConfig.session.refreshThreshold is 10 min
      const expiringSoon = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
      expect(shouldRefreshSession(expiringSoon)).toBe(true);
    });

    it("should return false if not expiring soon", () => {
      const notExpiring = new Date(Date.now() + 20 * 60 * 1000); // 20 mins
      expect(shouldRefreshSession(notExpiring)).toBe(false);
    });
  });
});
