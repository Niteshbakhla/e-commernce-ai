import mongoose from "mongoose";

const productModel = new mongoose.Schema({
            productName: {
                        type: String,
                        required: true
            },
            productTitle: {
                        type: String,
                        required: true
            },
            productImage: {
                        type: String,
            },
            productPrice: {
                        type: Number,
                        default: 0,
                        required: true
            },
            productDescription: {
                        type: String,
                        required: true
            },
            productBrand: {
                        type: String,
                        required: true
            },
            productUrl: {
                        type: String
            },
            owner: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
            }
}, { timestamps: true });

const Product = mongoose.model("Product", productModel);
export default Product;