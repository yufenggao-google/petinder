/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

// @vitest-environment node

import { describe, it, expect } from "vitest";
import { authConfig, isValidRedirectUrl } from "./auth-config";

describe("auth-config (SSR)", () => {
  it("should use fallback origin when window is undefined", () => {
    expect(authConfig.security.allowedRedirectOrigins).toContain(
      "http://localhost:5173",
    );
  });

  it("should fail validation safely when window is undefined", () => {
    // In SSR, accessing window.location throws or is undefined.
    // The function catches the error and returns false.
    expect(isValidRedirectUrl("/dashboard")).toBe(false);
  });
});
