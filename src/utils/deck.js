import _ from "lodash";

// this is a workaround so we can mock randomCard, shuffleCards and generateCardPairs in our tests
import * as deck_module from "./deck";

const suits = ["C", "S", "H", "D"];
const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export const CARD_STATES = {
  unflipped: "unflipped",
  flipped: "flipped",
  matched: "matched"
}

export class CardObj {
  constructor({ value = "2C", id = 0, state = CARD_STATES.unflipped } = {}) {
    this.value = value;
    this.id = id;
    this.state = state;
  }
}

export const DECK = suits
  .map((suit) => numbers.map((number) => number + suit))
  .flat();

export const randomCard = (exclusions = []) => {
  let availableCards = DECK.filter((e) => !exclusions.includes(e));
  if (availableCards.length === 0)
    throw Error(
      `No cards left, all cards were excluded. Exclusions: [${exclusions}]`
    );
  return availableCards[_.random(availableCards.length - 1)];
};

export const generateCardPairs = (n) => {
  let cards = [];
  for (let i = 0; i < n; i++) {
    // ensure each card has a pair (unless odd and the last card)
    cards.push(
      new CardObj({
        id: i,
        value:
          i % 2 === 0
            ? deck_module.randomCard(cards.map((card) => card.value))
            : cards[i - 1].value,
        state: CARD_STATES.unflipped
      })
    );
  }
  return cards;
};

export const shuffleCards = (cards) => {
  return _.shuffle(cards);
};

export const drawNewCards = (deckSize) => {
  return deck_module.shuffleCards(deck_module.generateCardPairs(deckSize));
};
