export interface PriceList {
  getPriceList(): Map<string, number>;
}

export class TestPriceList implements PriceList {
  private priceList: Map<string, number> = new Map();

  constructor() {
    this.priceList.set("APPLE", 0.5);
    this.priceList.set("BANANA", 0.3);
    this.priceList.set("MILK", 1.2);
    this.priceList.set("BREAD", 2.5);
  }

  public getPriceList(): Map<string, number> {
    return this.priceList;
  }
}
