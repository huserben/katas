import { describe, expect, it } from "vitest";
import { run } from "./app.ts";

describe("run", () => {
  it("echoes stdin", () => {
    expect(run("hello")).toBe("hello");
  });

  it("puts args before stdin", () => {
    expect(run("world", ["hello"])).toBe("hello world");
  });
});
