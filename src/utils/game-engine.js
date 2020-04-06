const flippedButUnMatchedCards = cards => {
  return cards.filter(e => e.flipped && !e.matched);
}

const matchedCards = cards => {
  return cards.filter(e => e.matched);
}

export const cardsMatch = cards => {
  const matchList = flippedButUnMatchedCards(cards);
  if (matchList.length > 1) {
    return matchList.every(e => e.value === matchList[0].value);
  }
}

export const allPairsMatched = cards => {
  return matchedCards(cards).length === Math.floor(cards.length / 2) * 2
}