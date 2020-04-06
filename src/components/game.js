import React, { Suspense, lazy } from "react";
import "./game.css";
import _ from "lodash";
import fireConfetti from "../utils/confetti-cannon";
import { generateCardPairs, shuffleCards } from "../utils/deck";
import { cardsMatch, allPairsMatched } from "../utils/game-engine";
import NavBar from "./NavBar";
import { useAuth0 } from "./../react-auth0-spa";

const Card = lazy(() => import("./card"));

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deckSize: 9,
      cards: generateCardPairs(9),
      cardsFlipped: 0,
      msg: "Play the Game!",
      gameWon: false
    };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.startOver = this.startOver.bind(this);
    this.unflipCards = this.unflipCards.bind(this);
  }

  handleShuffle() {
    this.setState(() => {
      return { cards: shuffleCards(this.state.cards) };
    });
  }

  handleCardClick(index) {
    let cards = this.state.cards.slice();
    let card = cards[index];
    let count = this.state.cardsFlipped;
    if (!card.flipped && !card.matched && count < 2) {
      card.flipped = true;
      this.setState({ cards: cards, cardsFlipped: count + 1 });
    }
  }

  checkForMatches() {
    if (cardsMatch(this.state.cards)) {
      let cards = this.state.cards.slice();
      // all flipped cards are a match, so we can take this shortcut
      cards.forEach(e => {
        e.matched = e.flipped;
      });
      this.setState({ cards: cards });
    } else if (this.state.cardsFlipped > 1) {
      _.delay(() => {
        let cards = this.state.cards.slice();
        // only unflip the non-matched cards
        cards.forEach(e => (e.flipped = e.matched));
        this.setState({ cards: cards, cardsFlipped: 0 });
      }, 1000);
    }
  }

  startOver() {
    this.unflipCards();
    _.delay(() => {
      this.setState({
        cards: generateCardPairs(this.state.deckSize),
        gameWon: false,
        msg: "Play the Game!"
      });
    }, 1000);
  }

  unflipCards() {
    let cards = this.state.cards.slice().map(e => {
      e.flipped = false;
      e.matched = false;
      return e;
    });
    this.setState({ cards: cards, cardsFlipped: 0 });
  }

  checkForWin() {
    if (!this.state.gameWon && allPairsMatched(this.state.cards)) {
      this.setState({ msg: "You Win!", gameWon: true });
      fireConfetti();
    }
  }

  componentDidMount() {
    this.handleShuffle();
  }

  componentDidUpdate() {
    this.checkForMatches();
    this.checkForWin();
  }

  render() {
    // FIXME: Disabling this until we can refactor to a functional component
    // const { loading } = useAuth0();
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <h1>{this.state.msg}</h1>
        <button onClick={this.startOver}>Start Over?</button>
        <button onClick={this.handleShuffle}>Shuffle</button>
        <button onClick={this.unflipCards}>Unflip</button>
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            {this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                value={card.value}
                flipped={card.flipped}
                onClicked={this.handleCardClick}
              />
            ))}
          </Suspense>
        </div>
      </div>
    );
  }
}

export default Game;
