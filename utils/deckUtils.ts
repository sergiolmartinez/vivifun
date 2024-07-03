import { ImageFilesResponse } from "@/types";

const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

const setCache = (key: string, data: any) => {
  const cacheData = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

const getCache = (key: string) => {
  const cacheData = localStorage.getItem(key);
  if (cacheData) {
    const parsedData = JSON.parse(cacheData);
    if (Date.now() - parsedData.timestamp < CACHE_EXPIRY_MS) {
      return parsedData.data;
    }
    localStorage.removeItem(key);
  }
  return null;
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateDeck = async (
  category: string,
  size: number
): Promise<string[]> => {
  const cacheKey = `deck_${category}_${size}`;
  const cachedDeck = getCache(cacheKey);

  if (cachedDeck) {
    return shuffleArray([...cachedDeck]);
  }

  const res = await fetch(`/api/images?category=${category}`);
  const imageFiles: ImageFilesResponse = await res.json();
  const validImageFiles = imageFiles.filter((url) =>
    url.match(/\.(jpeg|jpg|gif|png|webp)$/)
  );

  const numPairs = (size * size) / 2;
  const selectedImages = validImageFiles.slice(0, numPairs);
  const deck = [...selectedImages, ...selectedImages];

  const shuffledDeck = shuffleArray(deck);
  setCache(cacheKey, shuffledDeck);
  return shuffledDeck;
};
