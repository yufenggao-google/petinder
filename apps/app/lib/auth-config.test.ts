
import { describe, expect, test } from "vitest";
import { isValidRedirectUrl } from "./auth-config";

describe("isValidRedirectUrl", () => {
  // Uses default happy-dom origin (http://localhost:3000)

  test("allows valid relative paths", () => {
    expect(isValidRedirectUrl("/dashboard")).toBe(true);
    expect(isValidRedirectUrl("/settings/profile")).toBe(true);
    expect(isValidRedirectUrl("/")).toBe(true);
  });

  test("rejects absolute URLs", () => {
    expect(isValidRedirectUrl("https://example.com")).toBe(false);
    expect(isValidRedirectUrl("http://evil.com")).toBe(false);
  });

  test("rejects protocol-relative URLs", () => {
    expect(isValidRedirectUrl("//evil.com")).toBe(false);
  });

  test("rejects URLs with backslashes", () => {
    expect(isValidRedirectUrl("/\\evil.com")).toBe(false);
    expect(isValidRedirectUrl("\\evil.com")).toBe(false);
    expect(isValidRedirectUrl("/foo\\bar")).toBe(false);
  });
});
