import React, { Fragment } from "react";
import styles from "./Card.module.css";
import { CARD_STATES } from "../../utils/deck";

export default function Card(props) {
  const imageSrc = require(`../../assets/img/cards/${props.value}.jpg`);

  const flipped = props.state !== CARD_STATES.unflipped;

  const frontClassNames = [(flipped ? styles.flipped : ""), styles.card].join(" ");
  const backClassNames = [(!flipped ? styles.flipped : ""), styles.card].join(" ");
  return (
    <Fragment>
      <div
        className={frontClassNames}
        onClick={() => props.onClicked(props.index)}
      >
        <img
          src={require("../../assets/img/cards/Red_back.jpg")}
          alt="front of card"
          style={{ height: props.height }}
        />
      </div>
      <div className={backClassNames}>
        <img
          src={imageSrc}
          alt="back of card"
          style={{ height: props.height }}
        />
      </div>
    </Fragment>
  );
}
