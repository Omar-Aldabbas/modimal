// app.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";

// Routes
import userRouter from "../routes/userRoute.js";
import authRouter from "../routes/authRoute.js";
import productRouter from "../routes/productRoute.js";
import orderRouter from "../routes/orderRoute.js";
import cartRouter from "../routes/cartRoute.js";
import wishlistRouter from "../routes/wishlistRoute.js";

// Utils
import AppError from "../utils/AppError.js";

dotenv.config();

const app = express();

// ======================
// MIDDLEWARES
// ======================

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Serve static images
app.use("/images", express.static(path.join(process.cwd(), "public/images")));

// HTTP request logger (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ======================
// ROUTES
// ======================

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);

// ======================
// HANDLE UNHANDLED ROUTES
// ======================

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// ======================
// GLOBAL ERROR HANDLER
// ======================

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
