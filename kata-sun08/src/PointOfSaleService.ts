import type { PriceList } from "./PriceList.ts";

export type ScanResult =
  | {
      ok: true;
      itemPrice: number;
    }
  | { ok: false; reason: string };

export class PointOfSaleService {
  private priceList: PriceList;

  private totalCost: number = 0;

  constructor(priceList: PriceList) {
    this.priceList = priceList;
  }

  public scan(productCode: string): ScanResult {
    const currentPrices = this.priceList.getPriceList();
    const caseIndependentProductCode = productCode.toUpperCase();

    if (!currentPrices.has(caseIndependentProductCode)) {
      return {
        ok: false,
        reason: `Item ${productCode} is not in Pricing List`,
      };
    }

    const itemPrice = currentPrices.get(caseIndependentProductCode);

    if (itemPrice === undefined) {
      return {
        ok: false,
        reason: "Item Price could not be read from Price List",
      };
    }

    this.totalCost += itemPrice;
    return { ok: true, itemPrice: itemPrice };
  }

  public total(): number {
    return this.totalCost;
  }
}
