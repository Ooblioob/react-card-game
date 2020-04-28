import _ from "lodash";
import { numCardsFlipped, matchedCards } from "./card-filters";
import { CARD_STATES } from "./deck";

export const flipCardAtIndex = (cards, index) => {
  let clone = _.cloneDeep(cards);
  let card = clone[index];
  if (card.state === CARD_STATES.unflipped && numCardsFlipped(clone) < 2) {
    card.state = CARD_STATES.flipped;
  }
  return clone;
};

export const transitionState = (cards, currState, newState) => {
  let clone = _.cloneDeep(cards);
  clone.forEach(card => card.state = (card.state === currState ? newState : card.state));
  return clone;
}

export const unflipAll = cards => {
  let clone = _.cloneDeep(cards);
  clone.forEach(card => card.state = CARD_STATES.unflipped);
  return clone;
}

// for determining a winning game
export const allPairsMatched = (cards) => {
  return matchedCards(cards).length === Math.floor(cards.length / 2) * 2;
};