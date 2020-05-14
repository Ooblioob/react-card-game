import {useState, useEffect } from "react";
import mojs from "mo-js";

const useBurstAnimation = (ref) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    new mojs.Timeline()
  );

  // Burst can cause some level of stutter on render, and I don't care about the precision of
  // the animation, so using useEffect() here instead of useLayoutEffect()
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const triangleBlurst = new mojs.Burst({
      parent: el,
      // radius: { 50: 95 },
      radius: { 50: 180 },
      count: 10,
      angle: 30,
      children: {
        shape: "polygon",
        radius: { 15: 0 },
        stroke: "rgba(211,54,0,0.5)",
        // strokeWidth: 2,
        strokeWidth: 5,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        // duration: 400,
        duration: 300,
      },
    });

    const circleBurst = new mojs.Burst({
      parent: el,
      delay: 300,
      radius: { 50: 180 },
      angle: 25,
      duration: 300,
      count: 15,
      children: {
        shape: "circle",
        fill: "rgba(149,165,166,0.5)",
        delay: 30,
        speed: 0.2,
        radius: { 8: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });
    const newAnimationTimeline = animationTimeline.add([
      triangleBlurst,
      circleBurst,
    ]);
    setAnimationTimeline(newAnimationTimeline);
  }, [animationTimeline, ref]);
  return animationTimeline;
};

export default useBurstAnimation;