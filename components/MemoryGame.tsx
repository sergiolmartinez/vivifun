"use client";

import { useEffect, useState } from "react";
import { generateDeck } from "@/utils/deckUtils";
import { CategorySelector } from "@/components/memory-game-components/CategorySelector";
import { ResetButton } from "@/components/memory-game-components/ResetButton";
import { Deck } from "@/components/memory-game-components/Deck";
import { LoadingPlaceholder } from "@/components/memory-game-components/LoadingPlaceholder";
import Confetti from "@/components/memory-game-components/Confetti";

export default function MemoryGame() {
  const [category, setCategory] = useState<string>("unicorns");
  const [gameSize, setGameSize] = useState<number>(4); // Default to 4x4
  const [cards, setCards] = useState<string[]>([]);
  const [cardBack, setCardBack] = useState("unicorns");
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const loadDeck = async (
    selectedCategory: string = category,
    selectedGameSize: number = gameSize
  ) => {
    setLoading(true);
    setError(null);
    try {
      const newDeck = await generateDeck(selectedCategory, selectedGameSize);
      setCards(newDeck);
      setCardBack(selectedCategory);
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
        setMatched((prevMatched) => [...prevMatched, first, second]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [cards, flipped]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const resetGame = async (
    selectedCategory: string = category,
    selectedGameSize: number = gameSize
  ) => {
    setGameWon(false); // Reset the gameWon state
    await loadDeck(selectedCategory, selectedGameSize);
    setFlipped([]);
    setMatched([]);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    resetGame(newCategory, gameSize);
  };

  return (
    <div className="text-center p-5 mt-20">
      <h1 className="text-4xl font-bold mb-5">Memory Game</h1>
      <div className=" justify-center items-center grid grid-cols-6 gap-4">
        <CategorySelector
          category={category}
          onCategoryChange={handleCategoryChange}
        />
        <ResetButton onReset={() => resetGame(category, gameSize)} />
      </div>
      {loading ? (
        <LoadingPlaceholder gameSize={gameSize} />
      ) : error ? (
        <p className="pt-5 text-center items-center">Error: {error}</p>
      ) : (
        <>
          {gameWon && (
            <>
              <h2 className="p-5 font-bold text-4xl text-green-500">
                You Won!
              </h2>
              <Confetti active={true} />
            </>
          )}
          <Deck
            cards={cards}
            gameSize={gameSize}
            cardBack={cardBack}
            flipped={flipped}
            matched={matched}
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
}
