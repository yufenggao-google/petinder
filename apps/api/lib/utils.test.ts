import { describe, expect, test } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  test("merges classes correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("foo", { bar: true })).toBe("foo bar");
    expect(cn("foo", { bar: false })).toBe("foo");
  });

  test("handles tailwind conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
