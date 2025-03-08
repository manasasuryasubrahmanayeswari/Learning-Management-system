import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getAllOrders,
  getRazorpayApiKey,
} from "../controllers/order.controller";

const orderRouter = express.Router();

// Create Razorpay Order
orderRouter.post("/create-razorpay-order", isAuthenticated, createRazorpayOrder);

// Verify Razorpay Payment and Create Order
orderRouter.post("/verify-payment", isAuthenticated, verifyRazorpayPayment);

// Get Razorpay API Key
orderRouter.get("/razorpay-key", getRazorpayApiKey);

// Get All Orders (Admin only)
orderRouter.get("/get-all-orders", isAuthenticated, authorizeRoles("admin"), getAllOrders);

export default orderRouter;