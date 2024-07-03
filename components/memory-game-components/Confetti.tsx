import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  useEffect(() => {
    if (active) {
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      const colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [active]);

  return null;
};

export default Confetti;
