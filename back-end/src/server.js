import dotenv from "dotenv";
import app from "./app.js";
import prisma from "./db.js";

dotenv.config();
const PORT = process.env.PORT;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Prisma is working, connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Server Error: ${err}`);
    process.exit(1);
  }
}

startServer();
