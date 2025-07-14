import config from "../config/config.js";
import Order from "../models/orderModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import Cart from "../models/cartModel.js"
import crypto from "crypto"
import { instance } from "../utils/razorpay.js";

export const createOrder = asyncHandler(async (req, res) => {
            const products = req.body;
            const amountInPaise = Math.round(products.bill * 100);


            const newOrder = await Order.create({
                        userId: products.userId,
                        item: products.item,
                        bill: products.bill,
                        paymentStatus: "pending"
            })

            const options = {
                        amount: amountInPaise,
                        currency: "INR",
                        receipt: `reciept-${Date.now()}`,
                        notes: {
                                    mongoOrderId: newOrder._id.toString()
                        }
            }

            const order = await instance.orders.create(options);
            res.status(200).json({ order })
});


export const verifyPayment = asyncHandler(async (req, res) => {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ...order } = req.body;
            const secret = config.RAZORPAY_SECRET;

            const generated_signature = crypto
                        .createHmac("sha256", secret)
                        .update(razorpay_order_id + "|" + razorpay_payment_id)
                        .digest("hex");

            if (generated_signature !== razorpay_signature) {
                        throw new CustomError("Invalid signature", 400);
            }


            const userOrder = await Order.findById(order.mongoOrderId);
            if (!order) {
                        throw new CustomError("Order not found", 404);
            }

            userOrder.razorpay_order_id = razorpay_order_id,
                        userOrder.razorpay_payment_id = razorpay_payment_id,
                        userOrder.razorpay_signature = razorpay_signature,
                        userOrder.paymentStatus = "paid",
                        userOrder.paidAt = new Date();
            await userOrder.save();
            await Cart.deleteOne({ userId: userOrder.userId })
            res.status(200).json({ success: true, message: "Payment verified and order updated" });
});

export const getUserOrder = asyncHandler(async (req, res) => {
            const userId = req.user.id;
            const orders = await Order.find({ userId, paymentStatus: "paid" }).populate("item.productId");
            if (orders.length === 0) {
                        throw new CustomError("No orders found")
            }

            res.status(200).json({ success: true, orders })
})
