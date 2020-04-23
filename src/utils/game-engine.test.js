import { cardsMatch, allPairsMatched } from "./game-engine";

const CARD_TEMPLATE = {
  id: 0,
  value: "2C",
  flipped: false,
  matched: false,
}

function createCard(options = {}) {
  return { ...CARD_TEMPLATE, ...options };
};

describe("cardsMatch(cards)", () => {
  it("returns false when 2 flipped cards DON'T match", () => {
    const cards = [
      createCard( {flipped: true, value: "5C"} ), 
      createCard( {flipped: true, value: "7H"} )
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  })

  it("returns true when 2 flipped cards DO match", () => {
    const cards = [
      createCard( {flipped: true, value: "5C"} ), 
      createCard( {flipped: true, value: "5C"} )
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(true);
  });

  it("returns false when there are less than 2 flipped cards", () => {
    const cards = [
      createCard( {flipped: false, value: "5C"} ), 
      createCard( {flipped: true, value: "7H"} )
    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("ignores matched cards even if they're flipped (cards match scenario)", () => {
    const cards = [
      createCard( {flipped: true, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "5C"} ), 
      createCard( {flipped: true, value: "5C"} )

    ];
    const result = cardsMatch(cards);

    expect(result).toBe(true);
  });

  it("ignores matched cards even if they're flipped (cards don't match scenario)", () => {
    const cards = [
      createCard( {flipped: true, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "5C"} ), 
      createCard( {flipped: true, value: "AS"} )

    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });

  it("ignores unflipped cards when determining if cards are matched", () => {
    const cards = [
      createCard( {flipped: false, value: "7H"} ), 
      createCard( {flipped: false, value: "5C"} ), 
      createCard( {flipped: true, value: "5C"} ), 
      createCard( {flipped: true, value: "7H"} )

    ];
    const result = cardsMatch(cards);

    expect(result).toBe(false);
  });
});

describe("allPairsMatched(cards)", () => {
  it("returns true when every card in collection has match property of true", () => {
    const cards = [
      createCard( {flipped: true, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "7H", matched: true } ), 
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });

  it("returns false when not every card in collection has match property of true (length of collection is even)", () => {
    const cards = [
      createCard( {flipped: true, value: "7H", matched: false } ), 
      createCard( {flipped: true, value: "7H", matched: true } ), 
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(false);
  });

  it("returns true if all but one card in collection has match property of true AND length of collection is odd", () => {
    const cards = [
      createCard( {flipped: true, value: "2D", matched: false } ), 
      createCard( {flipped: true, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "7H", matched: true } ), 
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });

  it("returns true if all but one card in collection has match property of true AND length of collection is odd (multiple pairs of matching)", () => {
    const cards = [
      createCard( {flipped: true, value: "2D", matched: false } ), 
      createCard( {flipped: true, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "7H", matched: true } ),
      createCard( {flipped: true, value: "AS", matched: true } ), 
      createCard( {flipped: true, value: "AS", matched: true } ),
      createCard( {flipped: true, value: "QD", matched: true } ), 
      createCard( {flipped: true, value: "QD", matched: true } ), 
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });
  
  it("ignores whether or not cards have been flipped when checking for matches", () => {
    const cards = [
      createCard( {flipped: false, value: "2D", matched: false } ), 
      createCard( {flipped: false, value: "7H", matched: true } ), 
      createCard( {flipped: true, value: "7H", matched: true } ),
      createCard( {flipped: false, value: "AS", matched: true } ), 
      createCard( {flipped: true, value: "AS", matched: true } ),
      createCard( {flipped: false, value: "QD", matched: true } ), 
      createCard( {flipped: true, value: "QD", matched: true } ), 
    ];

    const result = allPairsMatched(cards);

    expect(result).toBe(true);
  });
  
});