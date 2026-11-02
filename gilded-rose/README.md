# Gilded Rose

Refactoring kata: add the "Conjured" item category to a legacy `updateQuality`.

The requirements (`GildedRoseRequirements.md`) and the original starting code
(the `Item` class and the legacy `GildedRose`) come from the Gilded Rose kata
by Terry Hughes, as collected in Emily Bache's
[GildedRose-Refactoring-Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata).
The tests and the refactored `gilded-rose.ts` are my own work.

Approach: approval (snapshot) test over all name x sellIn x quality combinations,
refactor behind that net, then add Conjured with a dedicated unit test.
