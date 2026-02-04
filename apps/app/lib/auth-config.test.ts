/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, expect, it } from "vitest";
import { getSafeRedirectUrl, isValidRedirectUrl } from "./auth-config";

// Unit tests for auth configuration helpers
describe("isValidRedirectUrl", () => {
  it("should return true for valid relative URLs", () => {
    expect(isValidRedirectUrl("/")).toBe(true);
    expect(isValidRedirectUrl("/dashboard")).toBe(true);
    expect(isValidRedirectUrl("/settings/profile")).toBe(true);
    expect(isValidRedirectUrl("/users/123")).toBe(true);
  });

  it("should return false for absolute URLs", () => {
    expect(isValidRedirectUrl("https://example.com")).toBe(false);
    expect(isValidRedirectUrl("http://google.com")).toBe(false);
    expect(isValidRedirectUrl("ftp://example.com")).toBe(false);
  });

  it("should return false for protocol-relative URLs", () => {
    expect(isValidRedirectUrl("//google.com")).toBe(false);
    expect(isValidRedirectUrl("//localhost")).toBe(false);
  });

  it("should return false for URLs with backslashes", () => {
    expect(isValidRedirectUrl("/\\google.com")).toBe(false);
    expect(isValidRedirectUrl("\\\\google.com")).toBe(false);
    expect(isValidRedirectUrl("/foo\\bar")).toBe(false);
  });

  it("should return false for malformed URLs", () => {
    expect(isValidRedirectUrl("javascript:alert(1)")).toBe(false);
    expect(isValidRedirectUrl("data:text/html,Hello")).toBe(false);
  });
});

describe("getSafeRedirectUrl", () => {
  it("should return the URL if it is valid", () => {
    expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
  });

  it("should return / if the URL is invalid", () => {
    expect(getSafeRedirectUrl("https://google.com")).toBe("/");
    expect(getSafeRedirectUrl("//google.com")).toBe("/");
    expect(getSafeRedirectUrl("/\\google.com")).toBe("/");
  });

  it("should return / if the URL is not a string", () => {
    expect(getSafeRedirectUrl(null)).toBe("/");
    expect(getSafeRedirectUrl(undefined)).toBe("/");
    expect(getSafeRedirectUrl(123)).toBe("/");
    expect(getSafeRedirectUrl({})).toBe("/");
  });
});
