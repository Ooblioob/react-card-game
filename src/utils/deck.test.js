import {
  randomCard,
  generateCardPairs,
  DECK,
  shuffleCards,
  drawNewCards,
  CardObj,
} from "./deck";
import _ from "lodash";

describe("randomCard(exclusions=[])", () => {
  it("with no params it does not exclude any cards from the deck", () => {
    _.random = jest.fn().mockReturnValue(51);

    const result = randomCard();

    expect(result).toBe(DECK[DECK.length - 1]); // "AD"
  });

  it("with exclusion params it should not return cards that are excluded", () => {
    _.random = jest.fn().mockReturnValue(0);
    const exclusions = ["2C"]; // exclude first card

    const result = randomCard(exclusions);

    expect(result).toBe(DECK[1]); // "3C"
  });

  it("if exclusions has repeats it should still work properly (and return a result)", () => {
    _.random = jest.fn().mockReturnValue(0);
    const exclusions = ["2C", "2C"]; // exclude first card

    const result = randomCard(exclusions);

    expect(result).toEqual(DECK[1]); // "3C"
  });

  it("ignores invalid cards in exclusions and should still work properly", () => {
    _.random = jest.fn().mockReturnValue(0);
    const exclusions = ["JOKER", "FOO", "#(%I@!"]; // exclude first card

    const result = randomCard(exclusions);

    expect(result).toEqual(DECK[0]); // "2C"
  });

  it("throws error when ALL cards are excluded", () => {
    _.random = jest.fn().mockReturnValue(0);
    const exclusions = DECK; // exclude first card

    expect(() => randomCard(exclusions)).toThrow(Error);
  });
});

describe("generateCardPairs(n)", () => {
  it("generates a card with the correct properties (flipped = false, matched = false, value = {value})", () => {
    jest.spyOn(require("./deck"), "randomCard").mockReturnValue("5C");
    const expected = [new CardObj({ value: "5C" })];

    const result = generateCardPairs(1);

    expect(result).toEqual(expected);
  });

  it("generates a pair of matching cards", () => {
    jest.spyOn(require("./deck"), "randomCard").mockReturnValue("5C");
    const expected = [
      new CardObj({ id: 0, value: "5C" }),
      new CardObj({ id: 1, value: "5C" }),
    ];

    const result = generateCardPairs(2);

    expect(result).toEqual(expected);
  });

  it("generates a pair of matching cards", () => {
    jest
      .spyOn(require("./deck"), "randomCard")
      .mockReturnValueOnce("5C")
      .mockReturnValueOnce("AD");

    const expected = [
      new CardObj({ id: 0, value: "5C" }),
      new CardObj({ id: 1, value: "5C" }),
      new CardObj({ id: 2, value: "AD" }),
      new CardObj({ id: 3, value: "AD" }),
    ];

    const result = generateCardPairs(4);

    expect(result).toEqual(expected);
  });

  it("generates a non-matching pair when numCards is odd", () => {
    jest
      .spyOn(require("./deck"), "randomCard")
      .mockReturnValueOnce("5C")
      .mockReturnValueOnce("AD");

    const result = generateCardPairs(3);

    const expected = [
      new CardObj({ id: 0, value: "5C" }),
      new CardObj({ id: 1, value: "5C" }),
      new CardObj({ id: 2, value: "AD" }),
    ];

    expect(result).toEqual(expected);
  });

  it("all cards have matched and flipped set to false", () => {
    const result = generateCardPairs(9);

    expect(result.every((card) => !card.matched && !card.flipped)).toBe(true);
  });

  it("returns [] for n=0", () => {
    const result = generateCardPairs(0);
    expect(result).toEqual([]);
  });

  it("returns [] for n<0", () => {
    const result = generateCardPairs(-1);
    expect(result).toEqual([]);
  });
});

describe("shuffleCards(cards)", () => {
  it("should call lodash's shuffle cards method", () => {
    jest.spyOn(_, "shuffle");
    const cards = [
      new CardObj({ id: 0, value: "5C" }),
      new CardObj({ id: 1, value: "5C" }),
      new CardObj({ id: 2, value: "AD" }),
      new CardObj({ id: 3, value: "AD" }),
    ];

    shuffleCards(cards);
    expect(_.shuffle).toHaveBeenCalledTimes(1);
  });
});

describe("drawNewCards(deckSize)", () => {
  it("should produce a deck of length = deckSize", () => {
    const result = drawNewCards(9);

    expect(result.length).toBe(9);
  });

  it("should produce cards that have been shuffled", () => {
    jest.spyOn(require("./deck"), "shuffleCards");

    drawNewCards(9);

    expect(shuffleCards).toHaveBeenCalledTimes(1);
  });

  it("should call to generate pairs", () => {
    const deckSize = 9;
    jest.spyOn(require("./deck"), "generateCardPairs");

    drawNewCards(deckSize);

    expect(generateCardPairs).toHaveBeenCalledTimes(1);
    expect(generateCardPairs).toHaveBeenCalledWith(deckSize);
  });
});
