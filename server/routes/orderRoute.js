import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();


router.use(protect);

router.post("/", createOrder); 
router.get("/me", getMyOrders); 

router.use(restrictTo("admin"));

router.get("/", getAllOrders); 
router.get("/:id", getOrderById);
router.patch("/:id", updateOrder); 
router.delete("/:id", deleteOrder);

export default router;
