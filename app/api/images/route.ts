import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const validCategories = ["unicorns", "princesses", "dragons"];

  if (!category || !validCategories.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Prefix: `memory-cards/${category}/`,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const imageFiles = data.Contents?.map((item) => {
      return `https://${AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`;
    });
    return NextResponse.json(imageFiles || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read directory" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const category = searchParams.get("category");
//   const validCategories = ["unicorns", "princesses", "dragons"];

//   if (!category || !validCategories.includes(category)) {
//     return NextResponse.json({ error: "Invalid category" }, { status: 400 });
//   }

//   const directoryPath = path.join(
//     process.cwd(),
//     `/assets/memory-cards/${category}`
//   );

//   try {
//     const files = await fs.promises.readdir(directoryPath);
//     const imageFiles = files.filter((file) => /\.webp$/.test(file));
//     return NextResponse.json(imageFiles);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to read directory" },
//       { status: 500 }
//     );
//   }
// }
