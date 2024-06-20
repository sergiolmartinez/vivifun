"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageFilesResponse } from "./types";
import Unicorn from "@/public/icons/unicorn_icon.webp";
import Princess from "@/public/icons/princess_icon.webp";
import Dragon from "@/public/icons/dragon_icon.webp";
import { VscDebugRestart } from "react-icons/vsc";

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
  const [cardBack, setCardBack] = useState("Unicorn");
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDeck = async (
    selectedCategory: string = category,
    selectedGameSize: number = gameSize
  ) => {
    setLoading(true);
    setError(null);
    try {
      const newDeck = await generateDeck(selectedCategory, selectedGameSize);
      setCards(newDeck);
      if (selectedCategory === "unicorns") {
        setCardBack("Unicorn");
      } else if (selectedCategory === "princesses") {
        setCardBack("Princess");
      } else if (selectedCategory === "dragons") {
        setCardBack("Dragon");
      }
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

  const resetGame = async (
    selectedCategory: string = category,
    selectedGameSize: number = gameSize
  ) => {
    await loadDeck(selectedCategory, selectedGameSize);
    setFlipped([]);
    setMatched([]);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    resetGame(newCategory, gameSize);
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-4xl font-bold mb-5">Memory Game</h1>
      {/* Game Buttons to select categories and reset the game */}
      <div className=" justify-center items-center grid grid-cols-6 gap-4">
        <div className=""></div>
        <div className="space-x-4 col-start-2 col-span-4">
          <button
            className={`rounded-full text-white font-bold transition-colors duration-300 ${
              category === "unicorns"
                ? "bg-gray-200 border-solid border-2 border-gray-400"
                : "bg-gray-400 hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("unicorns")}
          >
            <Image
              className=""
              src={Unicorn}
              alt="Unicorn"
              width={65}
              height={65}
            />
          </button>
          <button
            className={`rounded-full text-white font-bold transition-colors duration-300 ${
              category === "princesses"
                ? "bg-gray-100 border-solid border-2 border-gray-400"
                : "bg-gray-400 hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("princesses")}
          >
            <Image
              className=""
              src={Princess}
              alt="Princess"
              width={65}
              height={65}
            />
          </button>
          <button
            className={`rounded-full text-white font-bold transition-colors duration-300 ${
              category === "dragons"
                ? "bg-gray-100 border-solid border-2 border-gray-400"
                : "bg-gray-400 hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("dragons")}
          >
            <Image
              className=""
              src={Dragon}
              alt="Dragon"
              width={65}
              height={65}
            />
          </button>
        </div>
        <div className="col-end-7 col-span-1">
          <VscDebugRestart
            className=" fill-red-500 size-10 hover:cursor-pointer"
            onClick={() => resetGame(category, gameSize)}
          />
        </div>
      </div>
      {/* Loading animation */}
      {loading ? (
        <div
          className={`grid gap-4 mt-5`}
          style={{
            gridTemplateColumns: `repeat(${gameSize}, minmax(0, 1fr))`,
          }}
        >
          {[...Array(gameSize * gameSize)].map((_, index) => (
            <div
              key={index}
              className="card border border-blue-300 shadow rounded-md p-4 max-w-sm w-32 h-32 mx-auto"
            >
              <div className="card-inner animate-pulse flex space-x-4">
                <div className="card-front rounded-full bg-slate-700"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        // Error message
        <p className="pt-5 text-center items-center">Error: {error}</p>
      ) : (
        <>
          {/* What happens when you win, currently just text, later animations */}
          {gameOver && (
            <h2 className="p-5 font-bold text-4xl text-green-500">You Won!</h2>
          )}
          {/* Setting up grid size based on gameSize (default is a 4x4 matrix) but currently hard coded, later add selections */}
          <div
            className={`grid gap-4 mt-5`}
            style={{
              gridTemplateColumns: `repeat(${gameSize}, minmax(0, 1fr))`,
            }}
          >
            {/* Map all the cards based on the game size and the game deck */}
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card w-32 h-32 flex items-center justify-center text-4xl font-bold text-black transform cursor-pointer hover:scale-105 transition-transform duration-300 ${
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
                <div className="card-back">
                  <div
                    className={`card-front ${
                      cardBack === "Unicorn"
                        ? "bg-indigo-300 "
                        : cardBack === "Princess"
                        ? "bg-pink-300"
                        : "bg-teal-300"
                    } flex items-center justify-center rounded-lg shadow-md shadow-gray-500 `}
                  >
                    <Image
                      className=""
                      src={
                        cardBack === "Unicorn"
                          ? Unicorn
                          : cardBack === "Princess"
                          ? Princess
                          : Dragon
                      }
                      alt={cardBack}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="card-inner flex items-center justify-center rounded-lg shadow-md shadow-gray-500">
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
