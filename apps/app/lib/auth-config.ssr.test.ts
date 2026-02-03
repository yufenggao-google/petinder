// @vitest-environment node
import { describe, expect, it } from "vitest";
import { isValidRedirectUrl } from "./auth-config";

describe("auth-config (SSR)", () => {
  it("should return true for valid relative paths in SSR using fallback origin", () => {
    // Should fallback to localhost:5173 or configured origin and pass
    expect(isValidRedirectUrl("/dashboard")).toBe(true);
  });

  it("should return false for absolute URLs in SSR", () => {
    expect(isValidRedirectUrl("https://google.com")).toBe(false);
  });
});
