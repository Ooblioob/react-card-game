import React, { Suspense, lazy, useEffect, useState } from "react";
import "./game.css";
import _ from "lodash";
import fireConfetti from "../utils/confetti-cannon";
import { shuffleCards, drawNewCards, CARD_STATES } from "../utils/deck";
import { cardsMatch, numCardsFlipped } from "../utils/card-filters";
import {
  allPairsMatched,
  flipCardAtIndex,
  transitionState,
  unflipAll
} from "../utils/game-engine";
import { useAuth0 } from "./../react-auth0-spa";

const Card = lazy(() => import("./card"));

const Game = (props) => {
  const [cards, setCards] = useState(drawNewCards(props.deckSize));
  const [msg, setMsg] = useState("Play the Game!");
  const [gameWon, setGameWon] = useState(false);
  const { loading } = useAuth0();

  const handleShuffle = () => {
    setCards(shuffleCards(cards));
  };

  const handleCardClick = (index) => {
    setCards(flipCardAtIndex(cards, index));
  };

  const handleStartOver = () => {
    setCards(unflipAll(cards));
    // wait for card flip animation
    _.delay(() => {
      setCards(drawNewCards(props.deckSize));
      setGameWon(false);
      setMsg("Play the Game!");
    }, 1000);
  };

  const handleUnflip = () => {
    setCards(unflipAll(cards));
  };

  const checkForMatches = () => {
    if (cardsMatch(cards)) {
      setCards(transitionState(cards, CARD_STATES.flipped, CARD_STATES.matched));
    } else if (numCardsFlipped(cards) > 1) {
      _.delay(() => {
        setCards(transitionState(cards, CARD_STATES.flipped, CARD_STATES.unflipped));
      }, 1000);
    }
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

  useEffect(checkForMatches);
  useEffect(checkForWin);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w3-center">
      <h1>{msg}</h1>
      <button id="start-over-btn" onClick={handleStartOver}>
        Start Over?
      </button>
      <button id="shuffle-btn" onClick={handleShuffle}>
        Shuffle
      </button>
      <button id="unflip-btn" onClick={handleUnflip}>
        Unflip
      </button>
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          {cards.map((card, i) => (
            <Card
              key={card.id}
              index={i}
              value={card.value}
              state={card.state}
              onClicked={handleCardClick}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

Game.defaultProps = {
  deckSize: 9,
};

export default Game;
