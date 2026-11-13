import { describe, expect, it } from "vitest";
import { BowlingGame } from "./BowlingGame.js";

describe("BowlingGame", () => {
  it.each([{roll: "12345123451234512345", expectedPoints: 60},
    {roll: "XXXXXXXXXXXX", expectedPoints: 300},
    {roll: "9-9-9-9-9-9-9-9-9-9-", expectedPoints: 90},
    {roll: "5/5/5/5/5/5/5/5/5/5/5", expectedPoints: 150},
  ])
  ("calculates score correctly", ({roll, expectedPoints}) => {
    const game = new BowlingGame();

    expect(game.getGameResults(roll)).toBe(expectedPoints);
  });
});
