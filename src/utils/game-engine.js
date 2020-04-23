const _flippedButUnMatchedCards = cards => {
  return cards.filter(e => e.flipped && !e.matched);
}

const _matchedCards = cards => {
  return cards.filter(e => e.matched);
}

export const cardsMatch = cards => {
  const matchList = _flippedButUnMatchedCards(cards);
  return (
    matchList.length > 1 && 
    matchList.every(e => e.value === matchList[0].value)
  );
}

export const allPairsMatched = cards => {
  return _matchedCards(cards).length === Math.floor(cards.length / 2) * 2
}