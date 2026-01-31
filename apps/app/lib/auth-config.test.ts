import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { isValidRedirectUrl, getSafeRedirectUrl } from "./auth-config";

describe("auth-config security", () => {
  const originalWindow = global.window;

  beforeEach(() => {
    // Mock window.location for client-side tests
    global.window = {
      location: {
        origin: "http://localhost:5173",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  describe("isValidRedirectUrl", () => {
    it("accepts valid relative paths", () => {
      expect(isValidRedirectUrl("/dashboard")).toBe(true);
      expect(isValidRedirectUrl("/settings/profile")).toBe(true);
      expect(isValidRedirectUrl("/?foo=bar")).toBe(true);
    });

    it("rejects absolute URLs", () => {
      expect(isValidRedirectUrl("https://example.com")).toBe(false);
      expect(isValidRedirectUrl("http://example.com")).toBe(false);
      expect(isValidRedirectUrl("ftp://example.com")).toBe(false);
    });

    it("rejects protocol-relative URLs", () => {
      expect(isValidRedirectUrl("//example.com")).toBe(false);
      expect(isValidRedirectUrl("//localhost:5173")).toBe(false);
    });

    it("rejects URLs with backslashes to prevent open redirects", () => {
      // These are the cases we expect to fail but currently might pass if the check is missing
      expect(isValidRedirectUrl("/\\example.com")).toBe(false);
      expect(isValidRedirectUrl("\\example.com")).toBe(false);
      expect(isValidRedirectUrl("/foo\\bar")).toBe(false);
    });

    it("handles SSR (no window)", () => {
      const tempWindow = global.window;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;

      // When window is undefined, window.location.origin throws,
      // so it goes to catch block and returns false.
      expect(isValidRedirectUrl("/dashboard")).toBe(false);

      global.window = tempWindow;
    });
  });

  describe("getSafeRedirectUrl", () => {
    it("returns default for invalid URLs", () => {
      expect(getSafeRedirectUrl("https://evil.com")).toBe("/");
      expect(getSafeRedirectUrl("//evil.com")).toBe("/");
      expect(getSafeRedirectUrl(null)).toBe("/");
      expect(getSafeRedirectUrl(undefined)).toBe("/");
    });

    it("returns the URL for valid inputs", () => {
      expect(getSafeRedirectUrl("/dashboard")).toBe("/dashboard");
    });
  });
});
