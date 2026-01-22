/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { defineWorkspace } from "vitest/config";

/**
 * Vitest workspace configuration.
 *
 * @see https://vitest.dev/guide/workspace
 */
export default defineWorkspace([
  "apps/app",
  "apps/api",
  "packages/ws-protocol"
]);
