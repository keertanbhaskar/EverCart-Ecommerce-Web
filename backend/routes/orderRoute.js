import express from "express";
import { placeOrder, allOrders, userOrders, updateStatus } from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
