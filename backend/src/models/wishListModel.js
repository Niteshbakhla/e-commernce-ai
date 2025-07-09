import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
            userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
            },
            productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
            }
}, { timestamps: true });

wishListSchema.index({ userId: 1, productId: 1 }, { unique: true });

const WishList = mongoose.model("WishList", wishListSchema);
export default WishList;

