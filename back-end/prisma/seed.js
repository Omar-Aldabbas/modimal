// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { FakeProducts } from "../src/FakeProducts.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  for (const prod of FakeProducts) {
    // Ensure pics and variants are arrays
    const picsArray = Array.isArray(prod.pics) ? prod.pics : [];
    const variantsArray = Array.isArray(prod.variants) ? prod.variants : [];

    await prisma.product.create({
      data: {
        name: prod.name,
        description: prod.description || "No description",
        price: prod.price || 0,
        season: prod.season || "Unknown",
        mainPic: prod.mainPic || (picsArray[0] || ""),
        pics: picsArray, // directly store as string array
        variants: {
          create: variantsArray, // each variant must have size, color, quantity
        },
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
