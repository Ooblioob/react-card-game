import confetti from "canvas-confetti";

const fire = function(particleRatio, opts) {
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

const fireConfetti = function() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55
  });
  fire(0.2, {
    spread: 60
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
}

export default fireConfetti;