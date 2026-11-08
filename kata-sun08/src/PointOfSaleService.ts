import type { PriceList } from "./PriceList.ts";

export type ScanResult =
  | {
      ok: true;
      itemPrice: number;
    }
  | { ok: false; reason: string };

export class PointOfSaleService {
  private priceList: PriceList;

  constructor(priceList: PriceList) {
    this.priceList = priceList;
  }

  public scan(productCode: string): ScanResult {
    const currentPrices = this.priceList.getPriceList();
    if (currentPrices.has(productCode)) {
      const itemPrice = currentPrices.get(productCode);

      if (itemPrice) {
        return { ok: true, itemPrice: itemPrice };
      }
    }

    return { ok: false, reason: "Item not found" };
  }

  public total(): number {
    return 0;
  }
}
