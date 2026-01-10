/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { defineWorkspace } from "vitest/config";
import { workspaces } from "./package.json";
import fs from "node:fs";
import path from "node:path";

/**
 * Inline Vitest configuration for all workspaces.
 *
 * @see https://vitest.dev/guide/workspace
 */
export default defineWorkspace(
  workspaces
    .filter((name) => !["scripts"].includes(name))
    .flatMap((pattern) => {
      // Handle wildcards
      if (pattern.endsWith("/*")) {
        const dir = pattern.slice(0, -2);
        if (fs.existsSync(dir)) {
          return fs
            .readdirSync(dir, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => `${dir}/${d.name}`);
        }
        return [];
      }
      return [pattern];
    })
    .filter((dir) => fs.existsSync(path.resolve(__dirname, dir, "vite.config.ts")))
    .map((name) => ({
      extends: `./${name}/vite.config.ts`,
      test: {
        name,
        root: `./${name}`,
      },
    })),
);
