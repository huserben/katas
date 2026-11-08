import { beforeEach, describe, expect, it } from "vitest";
import { PointOfSaleService } from "./PointOfSaleService.ts";
import { type PriceList, TestPriceList } from "./PriceList.ts";

/*
  Apple -> 0.5 (3 for 1.3)
  Banana -> 0.3 (2 for 0.45)
  Milk -> 1.2
  Bread -> 2.5
 */

describe("Point of Sale Service", () => {
  let testPriceList: PriceList;

  beforeEach(() => {
    testPriceList = new TestPriceList();
  });

  it.each([
    { product: "APPLE", price: 0.5 },
    { product: "BANANA", price: 0.3 },
    { product: "MILK", price: 1.2 },
    { product: "BREAD", price: 2.5 },
  ])("Scans $product correctly", ({ product, price }) => {
    const posService = new PointOfSaleService(testPriceList);

    const scanResult = posService.scan(product);

    expect(scanResult).toEqual({ ok: true, itemPrice: price });
  });
});
