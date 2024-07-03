import { Card } from "./Card";

interface DeckProps {
  cards: string[];
  gameSize: number;
  cardBack: string;
  flipped: number[];
  matched: number[];
  handleClick: (index: number) => void;
}

export const Deck: React.FC<DeckProps> = ({
  cards,
  gameSize,
  cardBack,
  flipped,
  matched,
  handleClick,
}) => (
  <div
    className={`grid gap-4 mt-5`}
    style={{
      gridTemplateColumns: `repeat(${gameSize}, minmax(0, 1fr))`,
    }}
  >
    {cards.map((card, index) => (
      <Card
        key={index}
        index={index}
        card={card}
        cardBack={cardBack}
        isFlipped={flipped.includes(index)}
        isMatched={matched.includes(index)}
        onClick={handleClick}
      />
    ))}
  </div>
);
