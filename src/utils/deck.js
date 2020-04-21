import _ from "lodash";

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
  "A"
];
export const DECK = suits.map(suit => numbers.map(number => number + suit)).flat();
export const randomCard = (exclusions = []) => {
  let availableCards = DECK.filter(e => !exclusions.includes(e));
  if (availableCards.length === 0) 
    throw Error(`No cards left, all cards were excluded. Exclusions: [${exclusions}]`);  
  return availableCards[_.random(availableCards.length - 1)];
  
}

export const generateCardPairs = n => {
  let cards = [];
  for (let i = 0; i < n; i++) {
    // ensure each card has a pair (unless odd and the last card)
    cards.push({
      id: i,
      value:
        i % 2 === 0
          ? exports.randomCard(cards.map(() => cards.value))
          : cards[i - 1].value,
      flipped: false,
      matched: false
    });
  }
  return cards;
}

export const shuffleCards = cards => {
  return _.shuffle(cards)
}