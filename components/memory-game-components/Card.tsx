import Image from "next/image";
import Unicorn from "@/assets/icons/unicorn_icon.webp";
import Princess from "@/assets/icons/princess_icon.webp";
import Dragon from "@/assets/icons/dragon_icon.webp";

interface CardProps {
  index: number;
  card: string;
  cardBack: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (index: number) => void;
}

export const Card: React.FC<CardProps> = ({
  index,
  card,
  cardBack,
  isFlipped,
  isMatched,
  onClick,
}) => {
  const cardBackImage =
    cardBack === "unicorns"
      ? Unicorn
      : cardBack === "princesses"
      ? Princess
      : Dragon;

  const cardBackColor =
    cardBack === "unicorns"
      ? "bg-indigo-300"
      : cardBack === "princesses"
      ? "bg-pink-300"
      : "bg-teal-300";

  return (
    <div
      className={`card w-full h-full flex items-center justify-center text-4xl font-bold text-black transform cursor-pointer hover:scale-105 transition-transform duration-300 ${
        isFlipped || isMatched ? "flipped" : ""
      } ${isMatched ? "match-animation" : ""}`}
      style={{
        height: "min(20vw, 120px)",
        width: "min(20vw, 120px)",
      }}
      onClick={() => onClick(index)}
    >
      <div className="card-back w-full h-full">
        <div
          className={`card-front ${cardBackColor} flex items-center justify-center rounded-lg shadow-md shadow-gray-500 w-full h-full`}
        >
          <Image
            src={cardBackImage}
            alt={cardBack}
            fill
            sizes="(max-width: 768px) 20vw, 120px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="card-inner flex items-center justify-center rounded-lg shadow-md shadow-gray-500 w-full h-full">
          <Image
            src={card}
            alt={card}
            fill
            sizes="(max-width: 768px) 20vw, 120px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};
