import config from "../config/config.js";
import asyncHandler from "../utils/asyncHandler.js"
import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = asyncHandler((req, res, next) => {
            const token = req.cookies.userToken;

            if (!token) {
                        throw new CustomError("Unauthorized or not logged In", 401);
            }
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded;
            next();
});


export const isAuthorized = (...allowedRoles) => {
            return asyncHandler((req, res, next) => {
                        const userRole = req.user?.role;
                        if (!allowedRoles.includes(userRole)) {
                                    throw new CustomError("You are not allowed to access this resources", 403);
                        }
                        next();
            })
}