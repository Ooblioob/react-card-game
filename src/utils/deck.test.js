import { randomCard, generateCardPairs, DECK, shuffleCards } from "./deck";
import _ from "lodash";

const CARD_5C = {
  id: 0,
  value: "5C",
  flipped: false,
  matched: false,
};

const TWO_MATCHING_5C_CARDS = [
  {
    id: 0,
    value: "5C",
    flipped: false,
    matched: false,
  },
  {
    id: 1,
    value: "5C",
    flipped: false,
    matched: false,
  },
];

const TWO_PAIRS_OF_MATCHING_CARDS = [
  {
    id: 0,
    value: "5C",
    flipped: false,
    matched: false,
  },
  {
    id: 1,
    value: "5C",
    flipped: false,
    matched: false,
  },
  {
    id: 2,
    value: "AD",
    flipped: false,
    matched: false,
  },
  {
    id: 3,
    value: "AD",
    flipped: false,
    matched: false,
  },
];

const ONE_PAIR_MATCHING_ONE_UNMATCHED_CARD = [
  {
    id: 0,
    value: "5C",
    flipped: false,
    matched: false,
  },
  {
    id: 1,
    value: "5C",
    flipped: false,
    matched: false,
  },
  {
    id: 2,
    value: "AD",
    flipped: false,
    matched: false,
  },
];

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
    const module = require("./deck");
    jest.spyOn(module, "randomCard").mockReturnValue("5C");

    const result = generateCardPairs(1);

    expect(result).toEqual([CARD_5C]);
  });

  it("generates a pair of matching cards", () => {
    const module = require("./deck");
    jest.spyOn(module, "randomCard").mockReturnValueOnce("5C");

    const result = generateCardPairs(2);

    expect(result).toEqual(TWO_MATCHING_5C_CARDS);
  });

  it("generates a pair of matching cards", () => {
    const module = require("./deck");
    jest
      .spyOn(module, "randomCard")
      .mockReturnValueOnce("5C")
      .mockReturnValueOnce("AD");

    const result = generateCardPairs(4);

    expect(result).toEqual(TWO_PAIRS_OF_MATCHING_CARDS);
  });

  it("generates a non-matching pair when numCards is odd", () => {
    const module = require("./deck");
    jest
      .spyOn(module, "randomCard")
      .mockReturnValueOnce("5C")
      .mockReturnValueOnce("AD");

    const result = generateCardPairs(3);

    expect(result).toEqual(ONE_PAIR_MATCHING_ONE_UNMATCHED_CARD);
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
    shuffleCards(TWO_PAIRS_OF_MATCHING_CARDS);
    expect(_.shuffle).toHaveBeenCalledTimes(1);
  });
});
