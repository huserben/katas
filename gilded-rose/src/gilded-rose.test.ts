import {expect, describe, it } from "vitest"
import { GildedRose, Item } from "./gilded-rose.js";

describe('guilded-rose', () => { 
    it("should be green with previously working values", () => {
        const items = new  Array<Item>();

        const names = ["Sulfuras, Hand of Ragnaros", "Regular Item", "Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Conjured Football"];
        const sellIns = [11, 10, 6, 5, 1, 0, -1];
        const qualities = [80, 50, 49, 20, 1, 0];

        for (const name of names){
            for (const sellIn of sellIns){
                for (const quality of qualities){
                    items.push(new Item(name, sellIn, quality));
                }
            }
        }

        const guildedRose = new GildedRose(items);

        const itemsPreUpdate = items.map(i => ({ ...i}))
        const updatedItems = guildedRose.updateQuality();

        const results = new Array<string>();
        for (let index = 0; index < updatedItems.length; index++){
            const oldItem = itemsPreUpdate[index];
            const updatedItem = updatedItems[index];

            results.push(`${updatedItem?.name} | ${oldItem?.sellIn} --> ${updatedItem?.sellIn} | ${oldItem?.quality} --> ${updatedItem?.quality}`);
        }

        expect(results).toMatchSnapshot();
    })

    it("degrades quality twice as fast for conjured item", () => {
        const item = new Item("Conjured Thing", 10, 10);

        const service = new GildedRose([item]);

        service.updateQuality();

        expect(item.quality).toBe(8);
        expect(item.sellIn).toBe(9);
    })

    it("degrades quality twice as fast after sell date for conjured item", () => {
        const item = new Item("Conjured Thing", -5, 10);

        const service = new GildedRose([item]);

        service.updateQuality();

        expect(item.quality).toBe(6);
        expect(item.sellIn).toBe(-6);
    })
 });