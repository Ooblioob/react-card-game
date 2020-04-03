import React from 'react';
import './App.css';
import Card from './Card.js'
import _ from 'lodash';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      cards: this.randomizeCards(9)
    }
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  
  randomizeCards = (n) => {
    const suits = ['C', 'S', 'H', 'D'];
    const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; 
    return [...Array(9)].map((e, i) => { 
      return { 
        id: i,
        value: numbers[_.random(numbers.length-1)]+suits[_.random(suits.length-1)],
        flipped: false
      }
    });
  }

  handleCardClick(index) {
    const cards = this.state.cards.slice();
    cards[index].flipped = !cards[index].flipped
    this.setState({cards: cards});
  }
  
  render () {
      return (
      <div>
        <h1>Play the Game!</h1>
        <button onClick={() => console.log("button click")}>Start Over?</button>
        <button>Shuffle</button>
        <button>Unflip</button>
        <div className="container">
          { this.state.cards.map((card, i) => <Card key={card.id} index={i} value={card.value} flipped={card.flipped} onClicked={this.handleCardClick} />) } 
        </div>
      </div>
    );
  }
}

export default App;
