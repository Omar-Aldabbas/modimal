import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopSellers,
  getNewItems,
} from "../controllers/productController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// Filters shortcuts
router.get("/filters/top-sellers", getTopSellers);
router.get("/filters/new-items", getNewItems);

// Public Routes
router.get("/", getAllProducts); // Get products with optional filters + pagination
router.get("/:id", getProductById);


// Protected routes (admin only)
router.use(protect, restrictTo("admin"));
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
