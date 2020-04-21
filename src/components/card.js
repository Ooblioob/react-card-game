import React from "react";
import "./card.css";

export default function Card(props) {
  const flipCard = e => {
    props.onClicked(props.index); // call the parent's click handler
  };

  // TODO Come back and fix this prefixing properly! 
  const imageSrc = "react-card-game/img/cards/" + props.value + ".jpg";

  return (
    <div
      onClick={flipCard}
      className={["card", props.flipped ? "isFlipped" : ""].join(" ")}
    >
      <div className="front">
        <img src="/react-card-game/img/cards/red_back.jpg" alt="front of card" />
      </div>
      <div className="back">
        <img src={imageSrc} alt="back of card" />
      </div>
    </div>
  );
}
