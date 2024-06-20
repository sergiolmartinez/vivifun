import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const validCategories = ["unicorns", "princesses", "dragons"];

  if (!category || !validCategories.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const directoryPath = path.join(
    process.cwd(),
    `public/memory-cards/${category}`
  );

  try {
    const files = await fs.promises.readdir(directoryPath);
    const imageFiles = files.filter((file) => /\.webp$/.test(file));
    return NextResponse.json(imageFiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read directory" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
