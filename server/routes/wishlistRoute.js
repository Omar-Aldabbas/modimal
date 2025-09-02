import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";
import { protect, restrictTo } from "../controllers/authController.js";


const router = express.Router();
router.use(protect);
router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.delete("/clear", clearWishlist);

export default router;
