// @vitest-environment node
import { describe, expect, test } from "vitest";
import { isValidRedirectUrl } from "./auth-config";

describe("isValidRedirectUrl (SSR)", () => {
  test("handles missing window gracefully", () => {
    // This should not throw
    expect(isValidRedirectUrl("/dashboard")).toBe(true);
  });
});
