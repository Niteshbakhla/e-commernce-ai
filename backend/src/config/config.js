import { config } from "dotenv";
config();


const _config = {
            PORT: process.env.PORT,
            MONGO_URI: process.env.MONGO_URI,
            JWT_SECRET: process.env.JWT_SECRET,
            KEY_ID: process.env.KEY_ID,
            RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
            GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY,
            NODE_ENV: process.env.NODE_ENV,
            CLIENT_DEV_URL: process.env.CLIENT_DEV_URL,
            CLIENT_PROD_URL: process.env.CLIENT_PROD_URL,
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}

export default Object.freeze(_config);