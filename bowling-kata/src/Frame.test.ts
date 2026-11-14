import { describe, expect, it } from "vitest";
import { Frame } from "./Frame.js";

describe("Frame", () => {
  it("add roll adds correct score to frame", () => {
    const frame = new Frame();

    frame.addRoll("5");

    expect(frame.getScore()).toBe(5);
  });

  it("adds second roll correctly to frame", () => {
    const frame = new Frame();
    frame.addRoll("5");
    frame.addRoll("4");

    expect(frame.getScore()).toBe(9);
  });

  it("adds Strike correctly to frame", () => {
    const frame = new Frame();
    frame.addRoll("X");

    expect(frame.getScore()).toBe(10);
  });

  it("adds Spare correctly to frame", () => {
    const frame = new Frame();
    frame.addRoll("5");
    frame.addRoll("/");

    expect(frame.getScore()).toBe(10);
  });

  it("detects strike", () => {
    const frame = new Frame();

    frame.addRoll("X");

    expect(frame.getType()).toBe("Strike");
  });

  it("detects spare", () => {
    const frame = new Frame();

    frame.addRoll("5");
    frame.addRoll("/");

    expect(frame.getType()).toBe("Spare");
  });

  it("detects regular frame", () => {
    const frame = new Frame();

    frame.addRoll("5");
    frame.addRoll("4");

    expect(frame.getType()).toBe("Regular");
  });

  it("detects incomplete frame", () => {
    const frame = new Frame();

    frame.addRoll("5");

    expect(frame.getType()).toBe("Incomplete");
  });

  it("gets individual shot score correctly", () => {
    const frame = new Frame();

    frame.addRoll("5");
    frame.addRoll("4");

    expect(frame.getShotScore(0)).toBe(5);
    expect(frame.getShotScore(1)).toBe(4);
  });

  it("allows two rolls in bonus frame independent of score", () => {
    const frame = new Frame(10);

    frame.addRoll("X");

    expect(frame.getType()).toBe("Bonus");
  });

  it("gets individual shot score correctly for spare", () => {
    const frame = new Frame();

    frame.addRoll("4");
    frame.addRoll("/");

    expect(frame.getShotScore(0)).toBe(4);
    expect(frame.getShotScore(1)).toBe(6);
  });

  it("should say it can't hold more rolls if it is a strike", () => {
    const frame = new Frame();

    frame.addRoll("X");

    expect(frame.canHoldMoreRolls()).toBe(false);
  });

  it("should say it can't hold more rolls if it is a spare", () => {
    const frame = new Frame();

    frame.addRoll("5");
    frame.addRoll("/");

    expect(frame.canHoldMoreRolls()).toBe(false);
  });

  it("should say it can hold more rolls if it is an incomplete frame", () => {
    const frame = new Frame();

    frame.addRoll("5");

    expect(frame.canHoldMoreRolls()).toBe(true);
  });

  it("should say it can't hold more rolls if it is a regular frame and has two rolls", () => {
    const frame = new Frame();

    frame.addRoll("5");
    frame.addRoll("4");

    expect(frame.canHoldMoreRolls()).toBe(false);
  });

  it("should say it can hold more rolls if it is a bonus frame", () => {
    const frame = new Frame(10);

    frame.addRoll("X");

    expect(frame.canHoldMoreRolls()).toBe(true);
  });

  it("should say it can't hold more rolls if it is a bonus frame and has two rolls", () => {
    const frame = new Frame(10);

    frame.addRoll("X");
    frame.addRoll("5");

    expect(frame.canHoldMoreRolls()).toBe(false);
  });
});
