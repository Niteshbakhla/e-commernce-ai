import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import WishList from "../models/wishListModel.js";
import model, { ai } from "../service/aiService.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import { parseSuggestions, cleanAIText } from "../utils/parseText.js";

export const createProduct = asyncHandler(async (req, res) => {
            const owner = req.user.id;
            const {
                        productName,
                        productTitle,
                        productPrice,
                        productDescription,
                        productBrand,
                        productUrl
            } = req.body;

            if (!productName || !productTitle || !productPrice || !productDescription || !productBrand) {
                        throw new CustomError("All fields are required", 400);
            }

            // Choose productImage: either Cloudinary upload or fallback URL
            const productImage = req.file?.path

            const product = await Product.create({
                        productName,
                        productTitle,
                        productPrice,
                        productDescription,
                        productBrand,
                        productImage,
                        owner,
                        productUrl
            });

            res.status(201).json({ success: true, message: "Product created successfully", product });
});


export const getAllProducts = asyncHandler(async (req, res) => {

            const product = await Product.find();
            if (product.length === 0) {
                        throw new CustomError("Product not found", 401);
            }

            res.status(200).json({ success: true, product })
});

export const productDelete = asyncHandler(async (req, res) => {
            const id = req.params.id;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                        throw new CustomError("Product not found", 404);
            }

            res.status(200).json({
                        success: true,
                        message: "Product deleted successfully",
                        product
            });
});

export const productUpdate = asyncHandler(async (req, res) => {
            const id = req.params.id;
            const product = await Product.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true });
            if (!product) {
                        throw new CustomError("product not found", 404);
            }

            res.status(200).json({ success: true, message: "Product updated successfully" })
});

export const productAddCart = asyncHandler(async (req, res) => {
            const { productId, quantity } = req.body;

            const userId = req.user.id;
            const product = await Product.findById({ _id: productId });
            let cartProduct = await Cart.findOne({ userId });
            if (cartProduct) {
                        const itemIndex = cartProduct.item.findIndex(item => item.productId.toString() === productId);

                        if (itemIndex > -1) {
                                    let productItem = cartProduct.item[itemIndex];

                                    productItem.quantity += quantity;
                                    cartProduct.item[itemIndex] = productItem
                        } else {
                                    cartProduct.item.push({ productId, quantity, price: product.productPrice });
                        }

                        cartProduct.bill += quantity * product.productPrice
                        cartProduct = await cartProduct.save();
                        return res.status(201).json({ message: "Item added", cartProduct });
            } else {
                        const newCart = await Cart.create({
                                    userId,
                                    item: [{ productId: product._id, quantity, price: product.productPrice }],
                                    bill: quantity * product.productPrice
                        })

                        res.status(201).json({ success: true, message: "Item added ", newCart });
            }


})

export const cartDelete = asyncHandler(async (req, res) => {
            const id = req.params.id;
            const userId = req.user.id;
            const cart = await Cart.findOne({ userId })

            if (!cart) {
                        throw new CustomError("Cart not found");
            }
            const deleteItem = cart.item.find(item => item._id.toString() === id);
            cart.item = cart.item.filter(item => item._id.toString() !== id);
            cart.bill -= deleteItem.price;
            await cart.save();

            if (cart.item.length === 0) {
                        await Cart.findOneAndDelete(userId)
            }
            res.status(200).json({ success: true, message: "cart deleted" })
})

export const getUserCart = asyncHandler(async (req, res) => {
            const userId = req.user.id;
            const carts = await Cart.findOne({ userId });
            // if (carts.length === 0) {
            //             throw new CustomError("No cart added", 404);
            // }
            res.status(200).json({ success: true, carts })
})


export const wishListAdd = asyncHandler(async (req, res) => {
            const productId = req.params.id;
            const userId = req.user.id;

            const wishListExist = await WishList.findOne({ userId, productId });
            if (wishListExist) {
                        await wishListExist.deleteOne();
                        return res.status(200).json({ success: false, message: " removed" });
            }
            await WishList.create({ userId, productId });

            res.status(200).json({ success: true, message: " added" });
});

export const getWishList = asyncHandler(async (req, res) => {
            const userId = req.user.id;

            const wishlist = await WishList.find({ userId });
            if (wishlist.length === 0) {
                        throw new CustomError("Empty wishlist ", 404);
            }
            res.status(200).json({ success: true, wishlist });
});


export const getWishListIds = asyncHandler(async (req, res) => {
            const userId = req.user.id;
            const wishList = await WishList.find({ userId });
            const productIds = wishList.map(item => item.productId.toString());
            res.status(200).json({ success: true, wishlistIds: productIds });
})


export const searchItem = asyncHandler(async (req, res) => {
            const search = req.query.searchItem || "";
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;

            const query = {
                        productName: { $regex: search, $options: "i" }
            }

            const products = await Product.find(query)

            const total = await Product.countDocuments(query);

            res.status(200).json({ products, total, page, limit })

});


export const aiGenerateContent = asyncHandler(async (req, res) => {
            const { type, data } = req.body;

            let prompt = "";
            switch (type) {
                        case "description":
                                    prompt = `Write a short description , SEO-friendly product description for ${data.productTitle} give me short crisp pragraph.Dont' give option to select give me full and final result only direct content.`
                                    break;
                        case "price":
                                    prompt = `Suggest a fair market price in USD for: ${data.productTitle} by brand  if brand is present otherwise you can skip it ${data.productBrand}. give me direct full and final price only not option to select  give direct number I have already use dollar sign`;
                                    break;
                        case "name":
                                    prompt = `Suggest 3 better product titles for: ${data.productName}. And should be very small not very long paragraph , attractive, and SEO-optimized.`;
                                    break;
                        default:
                                    return res.status(400).json({ error: "Unknown AI type" });
            }

            // const result = await model.generateContent(prompt);
            // const text = result.response.text();
            const response = await ai.models.generateContent({
                        model: "gemini-2.5-flash",
                        contents: prompt
            })

            let aiContent = {};
            if (type === "name") {
                        aiContent.text = parseSuggestions(response.text);
                        aiContent.fieldName = type
            } else {
                        aiContent.text = cleanAIText(response.text);
                        aiContent.fieldName = type
            }

            res.status(200).json({ content: aiContent });
})