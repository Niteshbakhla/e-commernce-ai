import express from "express";
import authRoute from "./routes/authRoute.js"
import errorHandler from "./middleware/errorHandler.js";
import productRoute from "./routes/productRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import orderRouter from "./routes/paymentRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import config from "./config/config.js";
export const app = express();


const corsOption = {
            origin: config.NODE_ENV === "production" ? config.CLIENT_PROD_URL : config.CLIENT_DEV_URL,
            credentials: true
}


app.use(cors({
            origin: corsOption,
            credentials: true
}))
// app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", productRoute);
app.use("/api/v1/", orderRouter);



app.use(errorHandler);


