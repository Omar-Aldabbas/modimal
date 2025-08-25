import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteMe,
  getMe,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(protect);

router.get("/me", getMe);
router.delete("/me", deleteMe); 
router.patch("/:id", updateUser); 

router.use(restrictTo("admin"));
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
