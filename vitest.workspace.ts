/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { defineWorkspace } from "vitest/config";

/**
 * Vitest configuration for workspaces.
 *
 * @see https://vitest.dev/guide/workspace
 */
export default defineWorkspace([
  "apps/*",
  "packages/*",
]);
