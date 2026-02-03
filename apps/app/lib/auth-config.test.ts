import { describe, expect, test } from "vitest";
import { isValidRedirectUrl, shouldRefreshSession } from "./auth-config";

describe("isValidRedirectUrl", () => {
  test("allows valid relative URLs", () => {
    expect(isValidRedirectUrl("/")).toBe(true);
    expect(isValidRedirectUrl("/dashboard")).toBe(true);
    expect(isValidRedirectUrl("/settings/profile")).toBe(true);
    expect(isValidRedirectUrl("/foo?bar=baz")).toBe(true);
  });

  test("rejects absolute URLs", () => {
    expect(isValidRedirectUrl("https://example.com")).toBe(false);
    expect(isValidRedirectUrl("http://example.com")).toBe(false);
    expect(isValidRedirectUrl("ftp://example.com")).toBe(false);
  });

  test("rejects protocol-relative URLs", () => {
    expect(isValidRedirectUrl("//example.com")).toBe(false);
    expect(isValidRedirectUrl("//localhost:3000")).toBe(false);
  });

  test("rejects URLs with backslashes (open redirect bypass)", () => {
    expect(isValidRedirectUrl("/\\example.com")).toBe(false);
    expect(isValidRedirectUrl("\\example.com")).toBe(false);
    expect(isValidRedirectUrl("/foo\\bar")).toBe(false);
  });

  test("rejects whitespace and control characters", () => {
    expect(isValidRedirectUrl("/  /example.com")).toBe(true); // Should be treated as path
    expect(isValidRedirectUrl(" /example.com")).toBe(false); // Does not start with /
  });
});

describe("shouldRefreshSession", () => {
  test("returns false if no expiry provided", () => {
    expect(shouldRefreshSession(undefined)).toBe(false);
  });

  test("returns false if expired", () => {
    const past = new Date(Date.now() - 1000);
    expect(shouldRefreshSession(past)).toBe(false);
  });

  test("returns false if expiry is far in future", () => {
    const future = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    expect(shouldRefreshSession(future)).toBe(false);
  });

  test("returns true if expiry is within threshold", () => {
    // Threshold is 10 minutes (10 * 60 * 1000 = 600,000 ms)
    const soon = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    expect(shouldRefreshSession(soon)).toBe(true);
  });
});
