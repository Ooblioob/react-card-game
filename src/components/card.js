import React from "react";
import "./card.css";
import { CARD_STATES } from "../utils/deck";

export default function Card(props) {
  const flipCard = (e) => {
    props.onClicked(props.index); // call the parent's click handler
  };

  const imageSrc = require(`../assets/img/cards/${props.value}.jpg`);

  return (
    <div
      onClick={flipCard}
      className={["card", props.state !== CARD_STATES.unflipped ? "isFlipped" : ""].join(" ")}
    >
      <div className="front">
        <img
          src={require("../assets/img/cards/Red_back.jpg")}
          alt="front of card"
        />
      </div>
      <div className="back">
        <img src={imageSrc} alt="back of card" />
      </div>
    </div>
  );
}
