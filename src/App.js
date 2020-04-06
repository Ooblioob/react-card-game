import React, { useEffect } from "react";
import "./App.css";
import Card from "./Card.js";
import _ from "lodash";
import confetti from "canvas-confetti";

const suits = ["C", "S", "H", "D"];
const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
const DECK = suits.map(suit => numbers.map(number => number + suit)).flat();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckSize: 9,
      cards: this.generateCardPairs(9),
      msg: "Play the Game!",
      gameWon: false
    };
    this.handleCardClick = this.handleCardClick.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.startOver = this.startOver.bind(this);
    this.unflipCards = this.unflipCards.bind(this);
  }

  randomCard(exclusions = []) {
    let availableCards = DECK.filter(e => !exclusions.includes(e));
    return availableCards[_.random(availableCards.length - 1)];
  }

  generateCardPairs(n) {
    let cards = [];
    for (let i = 0; i < n; i++) {
      // ensure each card has a pair (unless odd and the last card)
      cards.push({
        id: i,
        value:
          i % 2 === 0
            ? this.randomCard(cards.map(() => cards.value))
            : cards[i - 1].value,
        flipped: false,
        matched: false
      });
    }
    return cards;
  }

  shuffleCards() {
    this.setState(() => {
      return { cards: _.shuffle(this.state.cards) };
    });
  }

  handleCardClick(index) {
    let cards = this.state.cards.slice();
    if (!cards[index].matched && this.numFlippedButUnmatchedCards() < 2) {
      cards[index].flipped = !cards[index].flipped;
      this.setState({ cards: cards });
    }
  }

  flippedButUnMatchedCards() {
    return this.state.cards.filter(e => e.flipped && !e.matched);
  }

  numFlippedButUnmatchedCards() {
    return this.flippedButUnMatchedCards().length;
  }

  matchedCards() {
    return this.state.cards.filter(e => e.matched);
  }

  checkForMatches() {
    const matchList = this.flippedButUnMatchedCards();
    if (matchList.length > 1) {
      if (matchList.every(e => e.value === matchList[0].value)) {
        let cards = this.state.cards.slice();
        cards.forEach(e => {
          // all flipped cards are a match, so we can take this shortcut
          e.matched = e.flipped;
        });
        this.setState({ cards: cards });
      } else {
        _.delay(() => {
          let cards = this.state.cards.slice();
          // only unflip the non-matched cards
          cards.forEach(e => (e.flipped = e.matched));
          this.setState({ cards: cards });
        }, 1000);
      }
    }
  }

  drawNewCards() {
    return this.generateCardPairs(this.state.deckSize);
  }

  startOver() {
    this.unflipCards();
    _.delay(() => {
      this.setState({
        cards: _.shuffle(this.drawNewCards()),
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
    this.setState({ cards: cards });
  }

  checkForWin() {
    if (
      !this.state.gameWon &&
      this.matchedCards().length === Math.floor(this.state.deckSize / 2) * 2
    ) {
      this.setState({ msg: "You Win!", gameWon: true });
      this.fireConfetti();
    }
  }

  fireConfetti() {
    this.fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    this.fire(0.2, {
      spread: 60
    });
    this.fire(0.35, {
      spread: 100,
      decay: 0.91
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }

  fire(particleRatio, opts) {
    var count = 800;
    var defaults = {
      origin: { y: 0.7 }
    };
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      })
    );
  }

  componentDidMount() {
    this.setState({ cards: this.drawNewCards() });
    this.shuffleCards();
  }

  componentDidUpdate() {
    this.checkForMatches();
    this.checkForWin();
  }

  render() {
    return (
      <div>
        <h1>{this.state.msg}</h1>
        <button onClick={this.startOver}>Start Over?</button>
        <button onClick={this.shuffleCards}>Shuffle</button>
        <button onClick={this.unflipCards}>Unflip</button>
        <div className="container">
          {this.state.cards.map((card, i) => (
            <Card
              key={card.id}
              index={i}
              value={card.value}
              flipped={card.flipped}
              onClicked={this.handleCardClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
