// models/Order.js
import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
            userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
            },
            item: [
                        {
                                    productId: {
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: "Product"
                                    },
                                    quantity: Number,
                                    price: Number
                        }
            ],
            bill: Number,

            // 👇 Add these for payment tracking
            razorpay_order_id: String,
            razorpay_payment_id: String,
            razorpay_signature: String,
            paymentStatus: {
                        type: String,
                        enum: ["pending", "paid", "failed"],
                        default: "pending"
            },
            paidAt: Date
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

export default Order;
