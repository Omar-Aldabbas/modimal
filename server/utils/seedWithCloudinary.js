// import fs from "fs";
// import path from "path";
// import prisma from "./db.js";
// import cloudinary from "./utils/cloudinary.js";

// const imagesFolder = path.join(process.cwd(), "public/images");

// async function seed() {
//   await prisma.product.deleteMany();

//   for (const product of products) {
//     const filePath = path.join(imagesFolder, product.fileName);

//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "modimaljo",
//     });

//     await prisma.product.create({
//       data: {
//         name: product.name,
//         price: product.price,
//         image: result.secure_url,
//       },
//     });

//     console.log(`${product.name} uploaded and saved`);
//   }

//   console.log("Seeding complete!");
// }

// seed()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());
