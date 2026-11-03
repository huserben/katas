// End-to-end: start the real program, pipe stdin, check stdout. Keep these few.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const main = fileURLToPath(new URL("./main.ts", import.meta.url));

function cli(stdin: string, args: string[] = []): string {
  return execFileSync(process.execPath, [main, ...args], {
    input: stdin,
    encoding: "utf8",
  });
}

describe("main (end to end)", () => {
  it("reads args and stdin, writes stdout", () => {
    expect(cli("world", ["hello"])).toBe("hello world\n");
  });
});
