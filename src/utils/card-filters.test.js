import { numCardsFlipped, cardsMatch } from "./card-filters";
import { CardObj } from "./deck";

describe("numCardsFlipped(cards)", () => {
  it("counts the number of cards that are flipped", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = numCardsFlipped(cards);

    expect(result).toBe(2);
  });

  it("ignores cards that are matched in the count", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
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
      new CardObj({ flipped: true, value: "5C" }),
      new CardObj({ flipped: true, value: "7H" }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("returns true when 2 flipped cards DO match", () => {
    const cards = [
      new CardObj({ flipped: true, value: "5C" }),
      new CardObj({ flipped: true, value: "5C" }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(true);
  });

  it("returns false when there are less than 2 flipped cards", () => {
    const cards = [
      new CardObj({ flipped: false, value: "5C" }),
      new CardObj({ flipped: true, value: "7H" }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("ignores matched cards even if they're flipped (cards match scenario)", () => {
    const cards = [
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "5C" }),
      new CardObj({ flipped: true, value: "5C" }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(true);
  });

  it("ignores matched cards even if they're flipped (cards don't match scenario)", () => {
    const cards = [
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "5C" }),
      new CardObj({ flipped: true, value: "AS" }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("ignores unflipped cards when determining if cards are matched", () => {
    const cards = [
      new CardObj({ flipped: false, value: "7H" }),
      new CardObj({ flipped: false, value: "5C" }),
      new CardObj({ flipped: true, value: "5C" }),
      new CardObj({ flipped: true, value: "7H" }),
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });
});
