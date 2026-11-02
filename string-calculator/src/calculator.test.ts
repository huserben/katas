import { describe, expect, it } from "vitest";
import { Calculator } from "./calculator.js";

describe("calculator", () => {
  it("empty input returns 0", () => {
    const calculator = new Calculator();

    expect(calculator.add("")).toBe(0);
  });

  it("single 0 returns 0", () => {
    const calculator = new Calculator();

    expect(calculator.add("0")).toBe(0);
  });

  it("single number returns same number", () => {
    const calculator = new Calculator();

    expect(calculator.add("7")).toBe(7);
  });

  it.each(
    [[2, 6, 8],
    [6, 2, 8],
    [0, 3, 3],
    [-5, -3, -8],
    [99, -1, 98]]
  )("adds %s and %s correctly to %s", (a, b, expected) => {
    const calculator = new Calculator();

    const input = `${a},${b}`;
    expect(calculator.add(input)).toBe(expected);
  });

  it("should add 3 numbers together", () => {
    const calculator = new Calculator();

    expect(calculator.add("2,4,5")).toBe(11);
  })

  it("should handle spaces in string", () => {
    const calculator = new Calculator();

    expect(calculator.add(" 2, 4 ")).toBe(6);
  })
});
