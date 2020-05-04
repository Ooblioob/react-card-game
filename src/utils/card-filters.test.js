import { numCardsFlipped, cardsMatch } from "./card-filters";
import { CardObj, CARD_STATES } from "./deck";

describe("numCardsFlipped(cards)", () => {
  it("counts only cards in the flipped state", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = numCardsFlipped(cards);

    expect(result).toBe(1);
  });

  it("returns 0 if cards is empty", () => {
    const cards = [];

    const result = numCardsFlipped(cards);

    expect(result).toBe(0);
  });
});

describe("cardsMatch(cards)", () => {
  it("returns false when 2 flipped cards DON'T match", () => {
    const cards = [
      new CardObj({ value: "5C", state: CARD_STATES.flipped }),
      new CardObj({ value: "7H", state: CARD_STATES.flipped }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("returns true when 2 flipped cards DO match", () => {
    const cards = [
      new CardObj({ value: "5C", state: CARD_STATES.flipped }),
      new CardObj({ value: "5C", state: CARD_STATES.flipped }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(true);
  });

  it("returns false when there are less than 2 flipped cards", () => {
    const cards = [
      new CardObj({ value: "5C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "5C", state: CARD_STATES.flipped }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("ignores matched cards even if they're flipped (cards match scenario)", () => {
    const cards = [
      new CardObj({ value: "5C", state: CARD_STATES.matched }),
      new CardObj({ value: "5C", state: CARD_STATES.matched }),
      new CardObj({ value: "7H", state: CARD_STATES.flipped }),
      new CardObj({ value: "7H", state: CARD_STATES.flipped }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(true);
  });

  it("ignores matched cards even if they're flipped (cards don't match scenario)", () => {
    const cards = [
      new CardObj({ value: "5C", state: CARD_STATES.matched }),
      new CardObj({ value: "5C", state: CARD_STATES.matched }),
      new CardObj({ value: "7H", state: CARD_STATES.flipped }),
      new CardObj({ value: "AS", state: CARD_STATES.flipped }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("ignores unflipped cards when determining if cards are matched", () => {
    const cards = [
      new CardObj({ value: "5C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "5C", state: CARD_STATES.flipped }),
      new CardObj({ value: "7H", state: CARD_STATES.flipped }),
      new CardObj({ value: "7H", state: CARD_STATES.unflipped }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });
});
