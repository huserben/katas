import { describe, expect, it } from "vitest";
import { cut, TransactionService } from "./transactionService.ts";

describe("TransactionService", () => {
  const service = new TransactionService();

  it.skip("settles a single line", () => {
    const input = "Anna paid 90 for dinner, split between Anna, Ben";

    expect(service.split(input)).toBe("Ben pays Anna 45.00");
  });

  it("parses Payer correctly from statement", () => {
    const input = "Anna paid 90 for dinner, split between Anna, Ben";

    const transaction = service.parseTransaction(input);

    expect(transaction).toMatchObject({
      ok: true,
      transaction: { payer: "Anna" },
    });
  });

  it("parses amount correctly from statement", () => {
    const input = "Anna paid 90 for dinner, split between Anna, Ben";

    const transaction = service.parseTransaction(input);

    expect(transaction).toMatchObject({
      ok: true,
      transaction: { amount: 90 },
    });
  });

  it("parses beneficiaries correctly from statement", () => {
    const input = "Anna paid 90 for dinner, split between Anna, Ben";

    const transaction = service.parseTransaction(input);

    expect(transaction).toMatchObject({
      ok: true,
      transaction: { beneficiaries: ["Anna", "Ben"] },
    });
  });

  it("keeps decimals in the amount", () => {
    const line = "Anna paid 90.50 for dinner, split between Anna, Ben";

    expect(service.parseTransaction(line)).toMatchObject({
      ok: true,
      transaction: { amount: 90.5 },
    });
  });

  it("rejects a line it cannot read", () => {
    expect(service.parseTransaction("hello")).toMatchObject({
      ok: false,
      error: expect.stringContaining("hello"),
    });
  });

  it("rejects an amount that is not a number", () => {
    const line = "Anna paid lots for dinner, split between Anna, Ben";
    expect(service.parseTransaction(line)).toMatchObject({
      ok: false,
      error: expect.stringContaining("lots"),
    });
  });

  it("rejects an amount that is partially a number", () => {
    const line = "Anna paid 90abc for dinner, split between Anna, Ben";
    expect(service.parseTransaction(line)).toMatchObject({
      ok: false,
      error: expect.stringContaining("90abc"),
    });
  });

  it("allows commas in the description", () => {
    const line = "Anna paid 30 for wine, cheese, split between Anna, Ben";
    expect(service.parseTransaction(line)).toMatchObject({
      ok: true,
      transaction: {
        beneficiaries: ["Anna", "Ben"],
      },
    });
  });
});

describe("cut", () => {
  it("splits text around the first marker", () => {
    expect(cut("Anna paid 90", " paid ")).toEqual(["Anna", "90"]);
  });

  it("returns undefined when the marker is missing", () => {
    expect(cut("Anna gave 90", " paid ")).toBeUndefined();
  });
});
