import {
  allPairsMatched,
  transitionState,
  flipCardAtIndex,
  unflipAll
} from "./game-engine";
import { CardObj, CARD_STATES } from "./deck";

describe("allPairsMatched(cards)", () => {
  it("returns true when every card in collection is in the matched state", () => {
    const cards = [
      new CardObj({ value: "7H", state: CARD_STATES.matched }),
      new CardObj({ value: "7H", state: CARD_STATES.matched }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });

  it("returns false when not every card in collection has match property of true (length of collection is even)", () => {
    const cards = [
      new CardObj({ value: "7H", state: CARD_STATES.flipped }),
      new CardObj({ value: "7H", state: CARD_STATES.matched }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(false);
  });

  it("returns true if all but one card in collection has match property of true AND length of collection is odd", () => {
    const cards = [
      new CardObj({ value: "2D", state: CARD_STATES.unflipped }),
      new CardObj({ value: "7H", state: CARD_STATES.matched }),
      new CardObj({ value: "7H", state: CARD_STATES.matched }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });

  it("returns true if all but one card in collection has match property of true AND length of collection is odd (multiple pairs of matching)", () => {
    const cards = [
      new CardObj({ value: "2D", state: CARD_STATES.unflipped }),
      new CardObj({ value: "7H", state: CARD_STATES.matched }),
      new CardObj({ value: "7H", state: CARD_STATES.matched }),
      new CardObj({ value: "AS", state: CARD_STATES.matched }),
      new CardObj({ value: "AS", state: CARD_STATES.matched }),
      new CardObj({ value: "QD", state: CARD_STATES.matched }),
      new CardObj({ value: "QD", state: CARD_STATES.matched }),
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });
});

describe("transitionState", () => {
  it("Unflipped -> Flipped: sets only the cards that are unflipped to flipped", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = transitionState(cards, CARD_STATES.unflipped, CARD_STATES.flipped);

    expect(result).toEqual(expected);
  });

  it("flipped -> unflipped: sets only the cards that are flipped to unflipped", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = transitionState(cards, CARD_STATES.flipped, CARD_STATES.unflipped);

    expect(result).toEqual(expected);
  });

  it("flipped -> matched: sets only the cards that are flipped to matched", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = transitionState(cards, CARD_STATES.flipped, CARD_STATES.matched);

    expect(result).toEqual(expected);
  });
});



describe("flipCardAtIndex(cards, index)", () => {
  it("sets flipped property to true for card at index", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = flipCardAtIndex(cards, 0);

    expect(result).toEqual(expected);
  });

  it("won't flip a card if it has already in flipped state", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = flipCardAtIndex(cards, 1);

    expect(result).toEqual(expected);
  });

  it("won't flip a card in matched state", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = flipCardAtIndex(cards, 2);

    expect(result).toEqual(expected);
  });

  it("only flip if less than 2 cards are currently flipped", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
    ];

    const result = flipCardAtIndex(cards, 2);

    expect(result).toEqual(expected);
  });

  it("ignores matched cards and will flip if less than 2 unmatched cards are flipped", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const result = flipCardAtIndex(cards, 0);

    expect(result).toEqual(expected);
  });

  it("Pure function - does not modify the passed arguments", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const copyOfOriginal = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    flipCardAtIndex(cards, 0);

    expect(cards).toEqual(copyOfOriginal);
  });

  it("throws an error if index is out of range", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    expect(() => flipCardAtIndex(cards, 3)).toThrow(Error);
  });
});

describe("unflipAll(cards)", () => {
  it("sets the state of all the cards to unflipped", () => {
    const cards = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.flipped }),
      new CardObj({ value: "2C", state: CARD_STATES.matched }),
    ];

    const expected = [
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
      new CardObj({ value: "2C", state: CARD_STATES.unflipped }),
    ];

    const result = unflipAll(cards);

    expect(result).toEqual(expected);
  })
})