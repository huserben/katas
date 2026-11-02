export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


type ItemType = "Regular" | "Scarce" | "Static" | "Better with Age" | "Conjured";

export class GildedRose {
  items: Array<Item>;


  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

   private getItemType(item : Item) : ItemType {
    if (item.name.toLowerCase().startsWith("conjured")){
      return "Conjured";
    }

    switch(item.name){
      case "Backstage passes to a TAFKAL80ETC concert":
        return "Scarce";
      case "Sulfuras, Hand of Ragnaros":
        return "Static";
      case "Aged Brie":
        return "Better with Age";
        default:
          return "Regular";
      }
   }

   private decreaseQuality(item : Item){
    if (item.quality > 0){
      item.quality -= 1;
    }
   }

   private increaseQuality(item : Item){
    if (item.quality < 50){
      item.quality += 1;
    }
   }

   private updateRegularItem(item : Item){
      item.sellIn -= 1;
      this.decreaseQuality(item);

      if (item.sellIn < 0){
        this.decreaseQuality(item);
      }
   }

   private updateConjuredItem(item : Item){
      this.updateRegularItem(item);
      this.decreaseQuality(item);

      if (item.sellIn < 0){
        this.decreaseQuality(item);
      }
   }

   private updateBetterWithAgeItem(item : Item){
      item.sellIn -= 1;
      this.increaseQuality(item);

      if (item.sellIn < 0){
        this.increaseQuality(item);
      }
   }

   private updateScarceItem(item : Item){
      item.sellIn -= 1;

      if (item.sellIn < 0){
        item.quality = 0;
      }
      else {
        this.increaseQuality(item);

        if (item.sellIn < 10){
          this.increaseQuality(item);
        }

        if (item.sellIn < 5){
          this.increaseQuality(item);
        }
      }
   }

  updateQuality() {
    for (const item of this.items) {
      switch(this.getItemType(item)){
        case "Static":
          break;
        case "Better with Age":
          this.updateBetterWithAgeItem(item);
          break;
        case "Scarce":
          this.updateScarceItem(item);
          break;
        case "Regular":
          this.updateRegularItem(item);
          break;
        case "Conjured":
          this.updateConjuredItem(item);
          break;
        default:
          throw new Error("Unknown Item Type!");
      }
    }

    return this.items;
  }
}
