import React, {
  Suspense,
  lazy,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import {
  Grid,
  Typography,
  Button,
  Card as MaterialCard,
  CardContent,
} from "@material-ui/core";

import _ from "lodash";
import fireConfetti from "../../utils/confetti-cannon";
import { shuffleCards, drawNewCards, CARD_STATES } from "../../utils/deck";
import { cardsMatch, numCardsFlipped } from "../../utils/card-filters";
import {
  allPairsMatched,
  flipCardAtIndex,
  transitionState,
  unflipAll,
} from "../../utils/game-engine";
import { useAuth0 } from "../../react-auth0-spa";

const Card = lazy(() => import("../Card/Card"));

const GAME_VH = 70;

/*
 * Custom hook for waiting for the card flip animation
 */
const useEffectWithTimeout = (cb, deps, timeout) => {
  return useEffect(() => {
    const timer = setTimeout(cb, timeout);
    return () => clearTimeout(timer);
  }, [cb, timeout, deps]);
};

/*
 * Custom reducer to maintain the game's state
 */
const reducer = ({ cards, gameWon, msg }, { type, payload }) => {
  switch (type) {
    case "flip":
      return { cards: flipCardAtIndex(cards, payload), gameWon, msg };
    case "shuffle":
      return { cards: shuffleCards(cards), gameWon, msg };
    case "unflipAll":
      return { cards: unflipAll(cards), gameWon, msg };
    case "unflip":
      return {
        cards: transitionState(
          cards,
          CARD_STATES.flipped,
          CARD_STATES.unflipped
        ),
        gameWon,
        msg,
      };
    case "match":
      return {
        cards: transitionState(cards, CARD_STATES.flipped, CARD_STATES.matched),
        gameWon,
        msg,
      };
    case "reset":
      return initializeGame(payload);
    case "win":
      return { cards, gameWon: true, msg: "You Win!" };
    default:
      break;
  }
};

const initializeGame = (deckSize) => ({
  cards: drawNewCards(deckSize),
  msg: "Play the Game!",
  gameWon: false,
});

const Game = ({ deckSize, themeColor }) => {
  const [{ cards, msg, gameWon }, dispatch] = useReducer(
    reducer,
    deckSize,
    initializeGame
  );
  const { loading } = useAuth0();

  const handleShuffle = () => {
    dispatch({ type: "shuffle" });
  };

  const handleCardClick = useCallback(
    (index) => {
      if (!gameWon) {
        dispatch({ type: "flip", payload: index });
      }
    },
    [gameWon]
  );

  const handleStartOver = () => {
    dispatch({ type: "unflipAll" });
    // wait for card flip animation
    _.delay(() => {
      dispatch({ type: "reset", payload: deckSize });
    }, 1000);
  };

  const handleUnflip = () => {
    dispatch({ type: "unflipAll" });
  };

  const checkForMatches = useCallback(() => {
    if (cardsMatch(cards)) {
      dispatch({ type: "match" });
    } else if (numCardsFlipped(cards) > 1) {
      dispatch({ type: "unflip" });
    }
  }, [cards]);

  const checkForWin = () => {
    if (!gameWon && allPairsMatched(cards)) {
      dispatch({ type: "win" });
    }
  };

  const handleConfetti = () => {
    if (gameWon) {
      fireConfetti();
    }
  };

  useEffectWithTimeout(checkForMatches, [handleCardClick], 1000);
  useEffectWithTimeout(checkForWin, [checkForMatches], 1000);
  useEffectWithTimeout(handleConfetti, [gameWon], 1000);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid item xs={8} sm={4}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography id="msg" data-refkey="msgRef" variant="h3">
              {msg}
            </Typography>
          </Grid>
          <Grid
            container
            item
            spacing={2}
            justify="center"
            style={{ marginBottom: "5px" }}
          >
            <StartOverBtn handleStartOver={handleStartOver} />
            <ShuffleBtn handleShuffle={handleShuffle} />
            <UnflipBtn handleUnflip={handleUnflip} />
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
                  key={card.id}
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
                    height={"inherit"}
                    gameWon={gameWon}
                    themeColor={themeColor}
                    onClicked={handleCardClick}
                  />
                </Grid>
              ))}
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {/* <MaterialCard>
          <CardContent>some content</CardContent>
        </MaterialCard> */}
      </Grid>
    </>
  );
};

const StartOverBtn = ({ handleStartOver }) => {
  return (
    <Grid item>
      <Button
        id="start-over-btn"
        variant="contained"
        color="default"
        size="small"
        onClick={handleStartOver}
      >
        Start Over?
      </Button>
    </Grid>
  );
};

const ShuffleBtn = ({ handleShuffle }) => {
  return (
    <Grid item>
      <Button
        id="shuffle-btn"
        variant="contained"
        color="default"
        size="small"
        onClick={handleShuffle}
      >
        Shuffle
      </Button>
    </Grid>
  );
};

const UnflipBtn = ({ handleUnflip }) => {
  return (
    <Grid item>
      <Button
        id="unflip-btn"
        variant="contained"
        color="default"
        size="small"
        onClick={handleUnflip}
      >
        Unflip
      </Button>
    </Grid>
  );
};

Game.defaultProps = {
  deckSize: 9,
};

export default Game;
