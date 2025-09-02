import express from "express";
import {
  signup,
  login,
  protect,
  restrictTo,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.use(protect);
router.patch("/update-password", updatePassword);

export default router;
