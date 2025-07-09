import Razorpay from "razorpay";
import config from "../config/config.js";

export const instance = new Razorpay({
            key_id: config.KEY_ID,
            key_secret: config.RAZORPAY_SECRET
});

