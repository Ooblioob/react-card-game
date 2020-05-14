import {useLayoutEffect, useState } from "react";
import mojs from "mo-js";

const useFadeAnimation = (checkRef) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    new mojs.Timeline()
  );

  useLayoutEffect(() => {
    if (!checkRef.current) {
      return;
    }

    const showCheck = new mojs.Html({
      el: checkRef.current,
      // delay: 300,
      duration: 200,
      opacity: { 0: 1 },
      easing: mojs.easing.ease.out,
    }).then({
      delay: 400,
      duration: 200,
      opacity: { 1: 0 },
      easing: mojs.easing.ease.out,
    });

    const newAnimationTimeline = animationTimeline.add([showCheck]);
    setAnimationTimeline(newAnimationTimeline);
  }, [animationTimeline, checkRef]);

  return animationTimeline;
};

export default useFadeAnimation;