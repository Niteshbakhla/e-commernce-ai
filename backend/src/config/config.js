import { config } from "dotenv";
config();


const _config = {
            PORT: process.env.PORT,
            MONGO_URI: process.env.MONGO_URI,
            JWT_SECRET: process.env.JWT_SECRET,
            KEY_ID: process.env.KEY_ID,
            RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
            GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY
}

export default Object.freeze(_config);