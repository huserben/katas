import { describe, expect, it } from "vitest";
import { PointOfSaleService } from "./PointOfSaleService.ts";
import { TestPriceList } from "./PriceList.ts";

describe("Acceptance Tests", () => {
  it("Totals a simple list correctly", () => {
    const posService = new PointOfSaleService(new TestPriceList());

    posService.scan("APPLE");
    posService.scan("MILK");
    posService.scan("BREAD");

    const total = posService.total();

    expect(total).toBe(4.2);
  });

  it.skip("Totals an offering with special Pricing correctly", () => {
    const posService = new PointOfSaleService(new TestPriceList());

    posService.scan("APPLE");
    posService.scan("APPLE");
    posService.scan("BANANA");
    posService.scan("APPLE");

    const total = posService.total();

    expect(total).toBe(1.6);
  });

  it("Ignores an unknown Item in the sale", () => {
    const posService = new PointOfSaleService(new TestPriceList());

    posService.scan("APPLE");
    posService.scan("MILK");
    posService.scan("POTATO");
    posService.scan("BREAD");

    const total = posService.total();

    expect(total).toBe(4.2);
  });
});
