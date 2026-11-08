import type { PriceList, SpecialOffer } from "./PriceList.ts";

export type ScanResult =
  | {
      ok: true;
      itemPrice: number;
    }
  | { ok: false; reason: string };

export class PointOfSaleService {
  private priceList: PriceList;

  private basket: Record<string, number> = {};

  constructor(priceList: PriceList) {
    this.priceList = priceList;
  }

  private getPriceForItem(product: string): number {
    const prices = this.priceList.getPriceList();

    if (!prices.has(product)) {
      return -1;
    }

    const price = prices.get(product);

    return price ?? -1;
  }

  private addItemToBasket(product: string) {
    const currentCount = this.basket[product] ?? 0;

    this.basket[product] = currentCount + 1;
  }

  private getSpecialOffer(product: string): SpecialOffer | undefined {
    const specialOffers = this.priceList.getSpecialOffers();

    for (const specialOffer of specialOffers) {
      if (specialOffer.product === product) {
        return specialOffer;
      }
    }

    return undefined;
  }

  private handleSpecialOffer(
    offer: SpecialOffer,
    boughtAmount: number,
  ): { remainingAmount: number; price: number } {
    let remainingAmount = boughtAmount;
    let price = 0;

    while (remainingAmount >= offer.amount) {
      remainingAmount -= offer.amount;
      price += offer.price;
    }

    return { remainingAmount: remainingAmount, price: price };
  }

  public scan(productCode: string): ScanResult {
    const caseIndependentProductCode = productCode.toUpperCase();

    const price = this.getPriceForItem(caseIndependentProductCode);

    if (price < 0) {
      return {
        ok: false,
        reason: `Item ${productCode} is not in Pricing List`,
      };
    }

    this.addItemToBasket(caseIndependentProductCode);
    return { ok: true, itemPrice: price };
  }

  public total(): number {
    let total = 0;

    for (const item of Object.keys(this.basket)) {
      const itemPrice = this.getPriceForItem(item);
      let amount = this.basket[item] ?? 0;

      const specialOffer = this.getSpecialOffer(item);
      if (specialOffer) {
        const { remainingAmount, price } = this.handleSpecialOffer(
          specialOffer,
          amount,
        );

        amount = remainingAmount;
        total += price;
      }

      total += amount * itemPrice;
    }

    return total;
  }
}
