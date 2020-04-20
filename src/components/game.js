import React, { Suspense, lazy, useEffect, useState } from "react";
import "./game.css";
import _ from "lodash";
import fireConfetti from "../utils/confetti-cannon";
import { generateCardPairs, shuffleCards } from "../utils/deck";
import { cardsMatch, allPairsMatched } from "../utils/game-engine";
import { useAuth0 } from "./../react-auth0-spa";

const Card = lazy(() => import("./card"));

const Game = props => {
  const [cards, setCards] = useState(
    shuffleCards(generateCardPairs(props.deckSize))
  );
  const [msg, setMsg] = useState("Play the Game!");
  const [gameWon, setGameWon] = useState(false);
  const { loading } = useAuth0();

  const handleShuffle = () => {
    setCards(shuffleCards(cards));
  };

  // TODO: Candidate for memoization?
  const numCardsFlipped = cards => {
    return cards.filter(card => card.flipped && !card.matched).length;
  };

  const handleCardClick = index => {
    let newCards = cards.slice();
    let newCard = newCards[index];
    if (!newCard.flipped && !newCard.matched && numCardsFlipped(newCards) < 2) {
      newCard.flipped = true;
      setCards(newCards);
    }
  };

  const checkForMatches = () => {
    if (cardsMatch(cards)) {
      let newCards = cards.slice();
      // all flipped cards are a match, so we can take this shortcut
      newCards.forEach(e => {
        e.matched = e.flipped;
      });
      setCards(newCards);
    } else if (numCardsFlipped(cards) > 1) {
      _.delay(() => {
        let newCards = cards.slice();
        // only unflip the non-matched cards
        newCards.forEach(e => (e.flipped = e.matched));
        setCards(newCards);
      }, 1000);
    }
  };

  const startOver = () => {
    unflipCards();
    _.delay(() => {
      setCards(shuffleCards(generateCardPairs(props.deckSize)));
      setGameWon(false);
      setMsg("Play the Game!");
    }, 1000);
  };

  const unflipCards = () => {
    let newCards = cards.slice().map(e => {
      e.flipped = false;
      e.matched = false;
      return e;
    });
    setCards(newCards);
  };

  const checkForWin = () => {
    if (!gameWon && allPairsMatched(cards)) {
      _.delay(() => {
        setGameWon(true);
        setMsg("You Win!");
        fireConfetti();
      }, 1000);
    }
  };

  useEffect(() => {
    checkForMatches();
  });

  useEffect(() => {
    checkForWin();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w3-center">
      <h1>{msg}</h1>
      <button onClick={startOver}>Start Over?</button>
      <button onClick={handleShuffle}>Shuffle</button>
      <button onClick={unflipCards}>Unflip</button>
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          {cards.map((card, i) => (
            <Card
              key={card.id}
              index={i}
              value={card.value}
              flipped={card.flipped}
              onClicked={handleCardClick}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

Game.defaultProps = {
  deckSize: 9
};

export default Game;
