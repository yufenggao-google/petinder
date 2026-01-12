/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { defineWorkspace } from "vitest/config";

/**
 * Inline Vitest configuration for all workspaces.
 *
 * @see https://vitest.dev/guide/workspace
 */
export default defineWorkspace([
  "apps/app",
]);
