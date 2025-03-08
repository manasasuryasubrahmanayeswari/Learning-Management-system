import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/orderModel";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import { Document } from 'mongoose';
import NotificationModel from "../models/notificationModel";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Create Razorpay Order
export const createRazorpayOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Verify Razorpay Payment and Create Order
// ordercontroller.ts (server-side)

// ordercontroller.ts (server-side)

export const verifyRazorpayPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    console.log("Received payment verification request:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId });

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
      .update(body.toString())
      .digest("hex");

    console.log("Expected signature:", expectedSignature);
    console.log("Received signature:", razorpay_signature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      console.log("Signature verified successfully");
      try {
        const user = await userModel.findById(req.user?._id);
        const course: any = await CourseModel.findById(courseId);

        if (!course) {
          console.log("Course not found:", courseId);
          return next(new ErrorHandler("Course not found", 404));
        }

        const courseExistInUser = user?.courses.some(
          (userCourse: any) => userCourse._id.toString() === courseId
        );

        if (courseExistInUser) {
          console.log("User already purchased this course");
          return next(new ErrorHandler("You have already purchased this course", 400));
        }

        // Create order data
        const orderData: any = {
          courseId: course._id,
          userId: req.user?._id,
          payment_info: {
            id: razorpay_payment_id,
            status: "succeeded",
            type: "Razorpay",
          },
        };

        console.log("Creating new order:", orderData);
        const newOrder = await OrderModel.create(orderData);

        console.log("Updating user's courses");
        user?.courses.push(course?._id);
        await redis.set(req.user?._id!.toString(), JSON.stringify(user));
        await user?.save();

        console.log("Updating course purchase count");
        course.purchased = (course.purchased || 0) + 1;
        await course.save();

        console.log("Sending success response");
        res.status(200).json({
          success: true,
          order: newOrder.toObject(),
          message: "Payment successful and course added to your account."
        });
      } catch (error) {
        console.error("Error in payment verification:", error);
        return next(new ErrorHandler("Error processing payment", 500));
      }
    } else {
      console.log("Signature verification failed");
      return next(new ErrorHandler("Payment signature verification failed", 400));
    }
  }
);

// Get All orders -- only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Send Razorpay API Key
export const getRazorpayApiKey = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      razorpayApiKey: process.env.RAZORPAY_KEY_ID,
    });
  }
);