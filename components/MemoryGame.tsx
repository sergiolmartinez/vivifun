"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageFilesResponse } from "./types";
import { FaStar, FaDragon, FaCrown } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { GiUnicorn } from "react-icons/gi";

const generateDeck = async (
  category: string,
  size: number
): Promise<string[]> => {
  const res = await fetch(`/api/images?category=${category}`);
  const imageFiles: ImageFilesResponse = await res.json();

  // Calculate the number of unique cards needed
  const numPairs = (size * size) / 2;
  const selectedImages = imageFiles.slice(0, numPairs);

  const deck = [...selectedImages, ...selectedImages];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [category, setCategory] = useState<string>("unicorns");
  const [gameSize, setGameSize] = useState<number>(4); // Default to 4x4
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadDeck = async () => {
    setLoading(true);
    setError(null);
    try {
      const newDeck = await generateDeck(category, gameSize);
      setCards(newDeck);
    } catch (error) {
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeck();
  }, [category, gameSize]);

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

  const gameOver = matched.length === cards.length && cards.length > 0;
  const resetGame = async () => {
    await loadDeck();
    setFlipped([]);
    setMatched([]);
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-4xl font-bold mb-5">Memory Game</h1>
      <div className="flex flex-row justify-center space-x-4 mb-5">
        <button
          className={`px-5 py-5 rounded-full text-white font-bold transition-colors duration-300 ${
            category === "unicorns"
              ? "bg-gray-900 border-solid border-2 border-gray-100"
              : "bg-gray-600 hover:bg-gray-400"
          }`}
          onClick={() => setCategory("unicorns")}
        >
          <GiUnicorn className="size-10" />
        </button>
        <button
          className={`px-5 py-2 rounded-full text-white font-bold transition-colors duration-300 ${
            category === "princesses"
              ? "bg-gray-900 border-solid border-2 border-gray-100"
              : "bg-gray-600 hover:bg-gray-400"
          }`}
          onClick={() => setCategory("princesses")}
        >
          <FaCrown className="size-10" />
        </button>
        <button
          className={`px-5 py-2 rounded-full text-white font-bold transition-colors duration-300 ${
            category === "dragons"
              ? "bg-gray-900 border-solid border-2 border-gray-100"
              : "bg-gray-600 hover:bg-gray-400"
          }`}
          onClick={() => setCategory("dragons")}
        >
          <FaDragon className="size-10" />
        </button>
        <button
          onClick={resetGame}
          className="px-5 py-2 rounded-full text-red-500 font-bold "
        >
          <VscDebugRestart className="size-10" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center align-center mt-5">Loading...</div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {gameOver && (
            <h2 className="p-5 font-bold text-4xl text-green-500">You Won!</h2>
          )}
          <div
            className={`grid gap-4 mt-5`}
            style={{
              gridTemplateColumns: `repeat(${gameSize}, minmax(0, 1fr))`,
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card w-40 h-40 flex items-center justify-center text-4xl font-bold text-black transform cursor-pointer hover:scale-105 transition-transform duration-300 ${
                  flipped.includes(index) || matched.includes(index)
                    ? "flipped"
                    : ""
                    ? "rotate-180"
                    : ""
                }`}
                style={{
                  height: "160",
                  width: "160",
                }}
                onClick={() => handleClick(index)}
              >
                <div className="card-inner">
                  <div className="card-front bg-pink-300 flex items-center justify-center">
                    <FaStar className="size-20" />
                  </div>
                  <div className="card-back flex items-center justify-center">
                    <Image
                      className=""
                      src={`/memory-cards/${category}/${card}`}
                      alt={card}
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
