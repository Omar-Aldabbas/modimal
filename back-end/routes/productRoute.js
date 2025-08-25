import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, restrictTo } from "../controllers/authController.js";


const router = express.Router();


router.get("/", getAllProducts); 
router.get("/:id", getProductById); 


router.use(protect, restrictTo("admin"));

router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;
