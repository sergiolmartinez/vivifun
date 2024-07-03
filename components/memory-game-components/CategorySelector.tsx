import Image from "next/image";
import Unicorn from "@/assets/icons/unicorn_icon.webp";
import Princess from "@/assets/icons/princess_icon.webp";
import Dragon from "@/assets/icons/dragon_icon.webp";

interface Category {
  name: string;
  icon: string;
}

const categories: Category[] = [
  { name: "unicorns", icon: Unicorn.src },
  { name: "princesses", icon: Princess.src },
  { name: "dragons", icon: Dragon.src },
];

interface CategorySelectorProps {
  category: string;
  onCategoryChange: (newCategory: string) => void;
}

const CategoryButton: React.FC<{
  category: Category;
  currentCategory: string;
  onClick: () => void;
}> = ({ category, currentCategory, onClick }) => (
  <button
    className={`rounded-full text-white font-bold transition-colors duration-300 ${
      currentCategory === category.name
        ? "bg-gray-200 border-solid border-2 border-gray-400"
        : "bg-gray-400 hover:bg-gray-200"
    }`}
    onClick={onClick}
    style={{ width: "min(15vw, 65px)", height: "min(15vw, 65px)" }}
  >
    <Image
      src={category.icon}
      alt={category.name}
      width={65}
      height={65}
      sizes="(max-width: 768px) 15vw, 65px"
      style={{ objectFit: "contain" }}
      priority={true}
    />
  </button>
);

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  onCategoryChange,
}) => (
  <div className="space-x-4 col-start-2 col-span-4 flex justify-center">
    {categories.map((cat) => (
      <CategoryButton
        key={cat.name}
        category={cat}
        currentCategory={category}
        onClick={() => onCategoryChange(cat.name)}
      />
    ))}
  </div>
);
