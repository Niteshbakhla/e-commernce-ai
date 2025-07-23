import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";
import { CloudinaryStorage } from "multer-storage-cloudinary"


cloudinary.config({
            cloud_name: config.CLOUDINARY_CLOUD_NAME,
            api_key: config.CLOUDINARY_API_KEY,
            api_secret: config.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
            cloudinary,
            params: {
                        folder: "products",
                        allowed_formats: ["jpg", "png", "jpeg"]
            }
});

export { cloudinary, storage };