// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { FakeProducts } from "../src/FakeProducts.js";

const prisma = new PrismaClient();

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log("Start seeding ...");

  for (const prod of FakeProducts) {
    const picsArray = Array.isArray(prod.pics) ? prod.pics : [];
    const variantsArray = Array.isArray(prod.variants) ? prod.variants : [];

    console.log(`Seeding: ${prod.name}`); // optional

    await prisma.product.create({
      data: {
        name: prod.name,
        description: prod.description || "No description",
        price: prod.price || 0,
        season: prod.season || "Unknown",
        mainPic: prod.mainPic || (picsArray.length ? picsArray[0] : ""),
        pics: picsArray,
        variants: variantsArray,
        tags: prod.tags || [],
        sales: randInt(40, 300),
      },
    });
  }

  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
