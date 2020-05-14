import React, { useEffect, useRef, forwardRef } from "react";
import styles from "./Card.module.css";
import { CARD_STATES } from "../../utils/deck";
import useBurstAnimation from "./animations/Burst";
import useFadeAnimation from "./animations/Fade";

const CheckMark = forwardRef((props, ref) => {
  return (
    <span ref={ref} className={styles.checkmark}>
      <img
        src={require(".././../assets/svg/Checkmark.svg")}
        alt="checkmark"
        className={styles.checkmarkImg}
      />
    </span>
  );
});

export default function Card({
  index,
  value,
  state,
  onClicked,
  gameWon,
  themeColor,
}) {
  const cardRef = useRef(null);
  const checkRef = useRef(null);
  const checkAnimation = useFadeAnimation(checkRef);
  const cardBurstAnimation = useBurstAnimation(cardRef);
  const imageSrc = require(`../../assets/img/cards/${value}.jpg`);
  const flipped = state !== CARD_STATES.unflipped;
  const frontClassNames = [flipped ? styles.flipped : "", styles.card].join(
    " "
  );
  const backClassNames = [!flipped ? styles.flipped : "", styles.card].join(
    " "
  );

  const handleClick = () => {
    if (!gameWon) {
      cardBurstAnimation.replay();
    }
    onClicked(index);
  };

  useEffect(() => {
    if (state === CARD_STATES.matched) {
      checkAnimation.replay();
    }
  }, [checkAnimation, state]);

  return (
    <>
      <div className={frontClassNames} onClick={handleClick}>
        <img
          src={require(`../../assets/img/cards/${themeColor}_back.jpg`)}
          alt="front of card"
          style={{ height: "inherit" }}
        />
      </div>
      <div className={backClassNames}>
        <img src={imageSrc} alt="back of card" style={{ height: "inherit" }} />
      </div>
      <div
        ref={cardRef}
        onClick={handleClick}
        style={{ height: "inherit", width: "inherit", position: "relative" }}
      >
        <CheckMark ref={checkRef} />
      </div>
    </>
  );
}
