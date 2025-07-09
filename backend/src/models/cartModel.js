import mongoose from "mongoose";

const cartModel = new mongoose.Schema({
            userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: "User"
            },
            item: [
                        {
                                    productId: {
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: "Product",
                                                required: true
                                    },
                                    quantity: {
                                                type: Number,
                                                default: 1,
                                                min: 1
                                    },
                                    price: {
                                                type: Number,
                                                default: 0
                                    }
                        }
            ],

            bill: {
                        type: Number,
                        // required: true,
                        default: 0
            }

}, { timestamps: true });

const Cart = mongoose.model("Cart", cartModel);

export default Cart;