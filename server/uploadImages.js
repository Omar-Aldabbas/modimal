import fs from "fs";
import path from "path";
import cloudinary from "./utils/cloudinary.js";

const folderPath = path.join(process.cwd(), "public/images");

const uploadImages = async () => {
  try {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);


      const stats = fs.statSync(filePath);
      if (!stats.isFile()) continue;

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "modimal",
      });

      console.log(`${file} uploaded: ${result.secure_url}`);
    }

    console.log("All images uploaded!");
  } catch (err) {
    console.error(err);
  }
};

uploadImages();
