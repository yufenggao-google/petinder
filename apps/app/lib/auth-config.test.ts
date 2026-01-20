/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, it, expect } from "vitest";
import { isValidRedirectUrl, getSafeRedirectUrl } from "./auth-config";

describe("auth-config", () => {
  describe("isValidRedirectUrl", () => {
    it("should accept valid relative paths", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/profile/settings")).toBe(true);
    });

    it("should reject absolute URLs", () => {
      expect(isValidRedirectUrl("https://google.com")).toBe(false);
      expect(isValidRedirectUrl("http://example.com")).toBe(false);
    });

    it("should reject protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//google.com")).toBe(false);
    });

    it("should reject URLs without leading slash", () => {
      expect(isValidRedirectUrl("dashboard")).toBe(false);
    });

    it("should reject backslashes to avoid open redirects", () => {
       expect(isValidRedirectUrl("/\\google.com")).toBe(false);
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("should return the url if valid", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });

    it("should return root for invalid url", () => {
      expect(getSafeRedirectUrl("https://google.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
    });
  });
});
