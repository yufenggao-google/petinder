/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { defineConfig } from "vitest/config";

/**
 * Vitest configuration.
 *
 * @see https://vitest.dev/config/
 */
export default defineConfig({
  cacheDir: "./.cache/vitest",
  test: {
    // Dynamically match any project with a vite.config.ts in apps/
    // This allows adding new apps without updating this file
    projects: ["apps/*/vite.config.ts"],
  },
});
