import Router from "express";
import { isAuthenticated } from "../middleware/authenticated.js";
import { createOrder, verifyPayment } from "../controller/orderController.js";

const router = Router();


router.route("/create-order").post(isAuthenticated, createOrder)
router.route("/verify-payment").post(isAuthenticated, verifyPayment);


export default router;