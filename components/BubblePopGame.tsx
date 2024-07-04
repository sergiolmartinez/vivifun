"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import confetti from "canvas-confetti";

interface Bubble {
  id: number;
  x: number;
  y: number;
  color: string;
  timeoutId: NodeJS.Timeout;
}

const getRandomColor = () => {
  const colors = [
    "#FF6347",
    "#FF4500",
    "#FFD700",
    "#ADFF2F",
    "#32CD32",
    "#00FA9A",
    "#00CED1",
    "#1E90FF",
    "#9370DB",
    "#FF69B4",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const BubblePopGame: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    resetGame();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      bubbles.forEach((bubble) => clearTimeout(bubble.timeoutId));
    };
  }, []);

  const startGame = () => {
    resetGame();
    setRunning(true);

    intervalRef.current = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * (window.innerWidth - 50);
      const y = Math.random() * (window.innerHeight - 50);
      const color = getRandomColor();

      const timeoutId = setTimeout(() => {
        setBubbles((prevBubbles) =>
          prevBubbles.filter((bubble) => bubble.id !== id)
        );
        setMissedCount((prevCount) => prevCount + 1);
      }, Math.random() * (15000 - 1000) + 1000);

      setBubbles((prevBubbles) => [
        ...prevBubbles,
        { id, x, y, color, timeoutId },
      ]);
    }, 1000);
  };

  const stopGame = () => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    bubbles.forEach((bubble) => clearTimeout(bubble.timeoutId));
  };

  const resetGame = () => {
    setBubbles([]);
    setPoppedCount(0);
    setMissedCount(0);
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const popBubble = (id: number) => {
    setBubbles((prevBubbles) => {
      const bubble = prevBubbles.find((bubble) => bubble.id === id);
      if (bubble) {
        clearTimeout(bubble.timeoutId);
        // Trigger confetti animation at the bubble's location
        confetti({
          particleCount: 50,
          spread: 60,
          origin: {
            x: (bubble.x + 24) / window.innerWidth, // Adjust to the center of the bubble (half the bubble's width)
            y: (bubble.y + 24) / window.innerHeight, // Adjust to the center of the bubble (half the bubble's height)
          },
          colors: [bubble.color],
        });
      }
      return prevBubbles.filter((bubble) => bubble.id !== id);
    });
    setPoppedCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-4 right-4 text-white">
        <div>Popped: {poppedCount}</div>
        <div>Missed: {missedCount}</div>
      </div>
      {running &&
        bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute w-12 h-12 rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-110"
            style={{
              left: bubble.x,
              top: bubble.y,
              backgroundColor: bubble.color,
            }}
            onClick={() => popBubble(bubble.id)}
          ></div>
        ))}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 pt-40">
        <FaPlay
          className={`text-4xl text-green-500 cursor-pointer ${
            running ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={!running ? startGame : undefined}
        />
        <FaStop
          className={`text-4xl text-red-500 cursor-pointer ${
            !running ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={running ? stopGame : undefined}
        />
      </div>
    </div>
  );
};

export default BubblePopGame;
