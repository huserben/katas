import { describe, expect, it } from "vitest";
import { PointOfSaleService } from "./PointOfSaleService.ts";
import { TestPriceList } from "./PriceList.ts";

/*
  Apple -> 0.5 (3 for 1.3)
  Banana -> 0.3 (2 for 0.45)
  Milk -> 1.2
  Bread -> 2.5
 */

describe("Point of Sale Service", () => {
  it.each([
    { product: "APPLE", price: 0.5 },
    { product: "BANANA", price: 0.3 },
    { product: "MILK", price: 1.2 },
    { product: "BREAD", price: 2.5 },
  ])("Scans $product correctly", ({ product, price }) => {
    const posService = new PointOfSaleService(new TestPriceList());

    const scanResult = posService.scan(product);

    expect(scanResult).toEqual({ ok: true, itemPrice: price });
  });

  it.each([
    {
      products: ["APPLE"],
      expectedTotal: 0.5,
    },
    {
      products: ["APPLE", "BANANA"],
      expectedTotal: 0.8,
    },
    {
      products: ["APPLE", "BANANA", "BREAD"],
      expectedTotal: 3.3,
    },
  ])(
    "calculalates correct total for $products without discounts",
    ({ products, expectedTotal }) => {
      const posService = new PointOfSaleService(new TestPriceList());

      for (const product of products) {
        posService.scan(product);
      }

      const total = posService.total();

      expect(total).toBe(expectedTotal);
    },
  );
});
