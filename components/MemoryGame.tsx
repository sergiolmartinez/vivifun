"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const generateDeck = () => {
  const memoryCards = [
    "Unicorn_001",
    "Unicorn_002",
    "Unicorn_003",
    "Unicorn_004",
    "Unicorn_005",
    "Unicorn_006",
    "Unicorn_007",
    "Unicorn_008",
    "Unicorn_009",
    "Unicorn_010",
    "Unicorn_011",
    "Unicorn_012",
    "Unicorn_013",
    "Unicorn_014",
    "Unicorn_015",
    "Unicorn_016",
  ];
  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;

      if (cards[first] === cards[second]) {
        setMatched([...matched, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [cards, flipped, matched]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const gameOver = matched.length === cards.length;
  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setMatched([]);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Memory Game</h1>
      {gameOver && (
        <h2 className="p-5 font-bold text-4xl text-green-500">You Won!</h2>
      )}
      <div className="grid grid-cols-8 gap-4 mt-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-yellow-200 h-28 w-28 flex items-center justify-center text-4xl font-bold text-black transform cursor-pointer hover:scale-105 transition-transform duration-300 ${
              flipped.includes(index) || matched.includes(index)
                ? "rotate-180"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? (
              <Image
                className="rotate-180"
                src={`/memory-cards/unicorns/${card}.webp`}
                alt={card}
                width={200}
                height={200}
              />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className=" p-3 bg-red-500 rounded-full mt-5">
        Reset Game
      </button>
    </div>
  );
}
