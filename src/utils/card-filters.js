import { CARD_STATES } from "./deck";

export const filterCardsByState = (cards, state) => {
  return cards.filter(card => card.state === state);
}

export const flippedCards = cards => {
  return filterCardsByState(cards, CARD_STATES.flipped);
}

export const matchedCards = cards => {
  return filterCardsByState(cards, CARD_STATES.matched);
}

export const cardsMatch = cards => {
  const matchList = flippedCards(cards);
  return (
    matchList.length > 1 && 
    matchList.every(card => card.value === matchList[0].value)
  );
}

// TODO: Candidate for memoization?
export const numCardsFlipped = (cards) => {
  return flippedCards(cards).length;
};