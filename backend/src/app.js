import express from "express";
import authRoute from "./routes/authRoute.js"
import errorHandler from "./middleware/errorHandler.js";
import productRoute from "./routes/productRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import orderRouter from "./routes/paymentRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
export const app = express();


app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", productRoute);
app.use("/api/v1/", orderRouter);



app.use(errorHandler);



