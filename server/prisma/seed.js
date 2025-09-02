import { PrismaClient } from "@prisma/client";
import { FakeProducts } from "../src/FakeProducts.js";
import path from "path";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";

const prisma = new PrismaClient();
const imagesFolder = path.join(process.cwd(), "/public/images");

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function uploadImage(filename) {
  const filePath = path.join(imagesFolder, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return "";
  }
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder: "modimaljo" });
    return result.secure_url;
  } catch (err) {
    console.error(`❌ Failed to upload ${filename}:`, err.message);
    return "";
  }
}

async function main() {
  console.log("Start seeding ...");

  await prisma.product.deleteMany();

  for (const prod of FakeProducts) {
    const mainPicUrl = prod.mainPic ? await uploadImage(prod.mainPic) : "";
    const uploadedPics = [];

    if (Array.isArray(prod.pics) && prod.pics.length) {
      for (const pic of prod.pics) {
        const url = await uploadImage(pic);
        if (url) uploadedPics.push(url);
      }
    }

    const variantsArray = Array.isArray(prod.variants) ? prod.variants : [];

    await prisma.product.create({
      data: {
        name: prod.name,
        description: prod.description || "No description",
        price: prod.price || 0,
        season: prod.season || "Unknown",
        mainPic: mainPicUrl,
        pics: uploadedPics,
        variants: variantsArray,
        tags: prod.tags || [],
        sales: randInt(40, 300),
      },
    });

    console.log(`✅ ${prod.name} uploaded and saved`);
  }

  console.log("🎉 Seeding finished.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
