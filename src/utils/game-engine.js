import _ from "lodash";
import { numCardsFlipped, matchedCards } from "./card-filters";

export const flipCardAtIndex = (cards, index) => {
  let clone = _.cloneDeep(cards);
  let card = clone[index];
  if (!card.flipped && !card.matched && numCardsFlipped(clone) < 2) {
    card.flip();
  }
  return clone;
};

// for successful card matches
export const setFlippedCardsToMatched = (cards) => {
  let clone = _.cloneDeep(cards);
  // all flipped cards are a match, so we can take this shortcut
  clone.forEach((e) => (e.matched = e.flipped));
  return clone;
};

// for unsuccessful card matches
export const unflipUnmatchedCards = (cards) => {
  let clone = _.cloneDeep(cards);
  // only unflip the non-matched cards
  clone.forEach((e) => (e.flipped = e.matched ? e.flipped : false));
  return clone;
};

// for determining a winning game
export const allPairsMatched = (cards) => {
  return matchedCards(cards).length === Math.floor(cards.length / 2) * 2;
};

// Note: this does allow for setting arbitrary options on cards, but that's
// ok for now since it allows for the expansion of card properties as we experiment
export const setAllCardsProperties = (cards, options = {}) => {
  let clone = _.cloneDeep(cards);
  return clone.map((card) => Object.assign(card, options));
};
