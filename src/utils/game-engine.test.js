import {
  allPairsMatched,
  setAllCardsProperties,
  setFlippedCardsToMatched,
  flipCardAtIndex,
  unflipUnmatchedCards,
} from "./game-engine";
import { CardObj } from "./deck";

describe("allPairsMatched(cards)", () => {
  it("returns true when every card in collection has match property of true", () => {
    const cards = [
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });

  it("returns false when not every card in collection has match property of true (length of collection is even)", () => {
    const cards = [
      new CardObj({ flipped: true, value: "7H", matched: false }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(false);
  });

  it("returns true if all but one card in collection has match property of true AND length of collection is odd", () => {
    const cards = [
      new CardObj({ flipped: true, value: "2D", matched: false }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });

  it("returns true if all but one card in collection has match property of true AND length of collection is odd (multiple pairs of matching)", () => {
    const cards = [
      new CardObj({ flipped: true, value: "2D", matched: false }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "AS", matched: true }),
      new CardObj({ flipped: true, value: "AS", matched: true }),
      new CardObj({ flipped: true, value: "QD", matched: true }),
      new CardObj({ flipped: true, value: "QD", matched: true }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });

  it("ignores whether or not cards have been flipped when checking for matches", () => {
    const cards = [
      new CardObj({ flipped: false, value: "2D", matched: false }),
      new CardObj({ flipped: false, value: "7H", matched: true }),
      new CardObj({ flipped: true, value: "7H", matched: true }),
      new CardObj({ flipped: false, value: "AS", matched: true }),
      new CardObj({ flipped: true, value: "AS", matched: true }),
      new CardObj({ flipped: false, value: "QD", matched: true }),
      new CardObj({ flipped: true, value: "QD", matched: true }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });
});

describe("setFlippedCardsToMatched", () => {
  it("set only the cards that are flipped to matched", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = setFlippedCardsToMatched(cards);

    expect(result).toEqual(expected);
  });

  it("cards that are matched remain flipped", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = setFlippedCardsToMatched(cards);

    expect(result).toEqual(expected);
  });

  it("does nothing if none of the cards are flipped", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = setFlippedCardsToMatched(cards);

    expect(result).toEqual(expected);
  });

  it("pure function - does not modify passed arguments", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const copyOfOriginal = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    setFlippedCardsToMatched(cards);

    expect(cards).toEqual(copyOfOriginal);
  });
});

describe("setAllCardsProperties(cards, options={})", () => {
  it("does nothing when empty options are passed in", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = setAllCardsProperties(cards, {});

    expect(result).toEqual(cards);
  });

  it("can set all cards to unflipped", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = setAllCardsProperties(cards, { flipped: false });

    expect(result).toEqual(expected);
  });

  it("Pure Function - does not modify passed arguments", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const copyOfOriginal = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    setAllCardsProperties(cards, { flipped: false, matched: false });

    expect(cards).toEqual(copyOfOriginal);
  });

  it("can set all cards to matched", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: true }),
    ];

    const result = setAllCardsProperties(cards, { matched: true });

    expect(result).toEqual(expected);
  });

  it("can set more than one property at once (e.g. flipped and matched)", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
    ];

    const result = setAllCardsProperties(cards, {
      flipped: true,
      matched: true,
    });

    expect(result).toEqual(expected);
  });
});

describe("flipCardAtIndex(cards, index)", () => {
  it("sets flipped property to true for card at index", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = flipCardAtIndex(cards, 1);

    expect(result).toEqual(expected);
  });

  it("won't flip a card if it has already been flipped (i.e. flipped = true)", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = flipCardAtIndex(cards, 0);

    expect(result).toEqual(expected);
  });

  it("won't flip a card if it is matched already (i.e. matched = true)", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = flipCardAtIndex(cards, 0);

    expect(result).toEqual(expected);
  });

  it("won't flip a card if more than 2 un-matchd cards are already flipped", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = flipCardAtIndex(cards, 2);

    expect(result).toEqual(expected);
  });

  it("ignores matched cards and will flip if less than 2 unmatched cards are flipped", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
    ];

    const result = flipCardAtIndex(cards, 2);

    expect(result).toEqual(expected);
  });

  it("Pure function - does not modify the passed arguments", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const copyOfOriginal = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    flipCardAtIndex(cards, 2);

    expect(cards).toEqual(copyOfOriginal);
  });

  it("throws an error if index is out of range", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    expect(() => flipCardAtIndex(cards, 3)).toThrow(Error);
  });
});

describe("unflipUnmatchedCards(cards)", () => {
  it("unflips any cards that are not currently matching (i.e. matched=true)", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const result = unflipUnmatchedCards(cards);

    expect(result).toEqual(expected);
  });

  it("ignores matched cards", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: true }),
    ];

    const expected = [
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: true, matched: true }),
      new CardObj({ value: "2C", flipped: false, matched: true }),
    ];

    const result = unflipUnmatchedCards(cards);

    expect(result).toEqual(expected);
  });

  it("Pure function - does not modify passed arguments", () => {
    const cards = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    const copyOfOriginal = [
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: true, matched: false }),
      new CardObj({ value: "2C", flipped: false, matched: false }),
    ];

    unflipUnmatchedCards(cards);

    expect(cards).toEqual(copyOfOriginal);
  });
});
