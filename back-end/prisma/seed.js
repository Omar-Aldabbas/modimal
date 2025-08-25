// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { FakeProducts } from "../src/FakeProducts.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  const seasons = ["Spring", "Summer", "Autumn", "Winter"];
  for (const name of seasons) {
    await prisma.season.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const prod of FakeProducts) {
    const season = await prisma.season.findUnique({ where: { name: prod.season } });

    await prisma.product.create({
      data: {
        name: prod.name,
        description: prod.description || "No description",
        price: prod.price,
        seasonId: season.id,
        mainPic: prod.mainPic,
        variants: { create: prod.variants },
        tags: { create: prod.tags },
        pics: { create: prod.pics },
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
