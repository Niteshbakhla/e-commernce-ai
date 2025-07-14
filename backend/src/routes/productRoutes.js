import { Router } from "express";
import { isAuthenticated, isAuthorized } from "../middleware/authenticated.js";
import { aiGenerateContent, cartDelete, getAllProducts, getUserCart, getWishList, getWishListIds, productAddCart, searchItem, wishListAdd } from "../controller/productController.js";
import { getUserOrder } from "../controller/orderController.js";

const router = Router();


router.route("/product").get(isAuthenticated, getAllProducts);
router.route("/product").post(isAuthenticated, productAddCart);
router.route("/product/:id").delete(isAuthenticated, cartDelete);
router.route("/carts").get(isAuthenticated, getUserCart);
router.route("/wishlist/:id").post(isAuthenticated, wishListAdd);
router.route("/wishlist").get(isAuthenticated, getWishList);
router.route("/wishlistId").get(isAuthenticated, getWishListIds);
router.route("/product/search").get(isAuthenticated, searchItem);
router.route("/product-ai").post(isAuthenticated, aiGenerateContent);
router.route("/product/order").get(isAuthenticated, getUserOrder);

export default router;
