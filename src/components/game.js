import React, { Suspense, lazy, useEffect, useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";

import "./game.css";
import _ from "lodash";
import fireConfetti from "../utils/confetti-cannon";
import { shuffleCards, drawNewCards, CARD_STATES } from "../utils/deck";
import { cardsMatch, numCardsFlipped } from "../utils/card-filters";
import {
  allPairsMatched,
  flipCardAtIndex,
  transitionState,
  unflipAll,
} from "../utils/game-engine";
import { useAuth0 } from "./../react-auth0-spa";

const Card = lazy(() => import("./Card/Card"));

const GAME_VH = 70;

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
      setCards(
        transitionState(cards, CARD_STATES.flipped, CARD_STATES.matched)
      );
    } else if (numCardsFlipped(cards) > 1) {
      _.delay(() => {
        setCards(
          transitionState(cards, CARD_STATES.flipped, CARD_STATES.unflipped)
        );
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
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h3" xs="12">{msg}</Typography>
      </Grid>
      <Grid container item spacing="2" justify="center" style={{marginBottom: "5px"}}>
        <Grid item>
          <Button id="start-over-btn" variant="contained" color="default" size="small" onClick={handleStartOver}>
            Start Over?
          </Button>
        </Grid>
        <Grid item>
          <Button id="shuffle-btn" variant="contained" color="default" size="small" onClick={handleShuffle}>
            Shuffle
          </Button>
        </Grid>
        <Grid item>
          <Button id="unflip-btn" variant="contained" color="default" size="small" onClick={handleUnflip}>
            Unflip
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justify="space-evenly"
        xs={12}
        style={{ borderStyle: "solid" }}
      >
        <Suspense fallback={<div>loading...</div>}>
          {cards.map((card, i) => (
            <Grid
              container
              item
              xs={4}
              justify="center"
              style={{ height: `${GAME_VH / 3.0}vh` }}
            >
              <Card
                key={card.id}
                index={i}
                value={card.value}
                state={card.state}
                height={`${GAME_VH / 3.0}vh`}
                onClicked={handleCardClick}
              />
            </Grid>
          ))}
        </Suspense>
      </Grid>
    </Grid>
  );
};

Game.defaultProps = {
  deckSize: 9,
};

export default Game;
