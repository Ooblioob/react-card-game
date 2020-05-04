export const flippedButUnMatchedCards = cards => {
  return cards.filter(e => e.flipped && !e.matched);
}

export const matchedCards = cards => {
  return cards.filter(e => e.matched);
}

export const cardsMatch = cards => {
  const matchList = flippedButUnMatchedCards(cards);
  return (
    matchList.length > 1 && 
    matchList.every(e => e.value === matchList[0].value)
  );
}

// TODO: Candidate for memoization?
export const numCardsFlipped = (cards) => {
  return cards.filter((card) => card.flipped && !card.matched).length;
};