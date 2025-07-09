import config from "../config/config.js";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";


export const register = asyncHandler(async (req, res) => {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                        throw new CustomError("All fields are required", 400);
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                        throw new CustomError("User already exist", 409);
            }

            const user = await User.create({ name, email, password });
            res.status(201).json({ message: "Register successfully!", user })
});

export const login = asyncHandler(async (req, res) => {
            const { email, password } = req.body;
            if (!email || !password) {
                        throw new CustomError("All fields are required", 400);
            }

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                        throw new CustomError("Invalid credentials", 400)
            }

            const isMatch = await existingUser.comparePassword(password);
            if (!isMatch) {
                        throw new CustomError("Invalid credentials", 404)
            }
            const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, config.JWT_SECRET)
            res.cookie("userToken", token);

            const user = {
                        id: existingUser._id,
                        name: existingUser.name,
                        email: existingUser.email
            }
            res.status(200).json({ success: true, message: "Login successfully", user })
})

export const logout = asyncHandler(async (req, res) => {
            res.clearCookie("userToken").status(200).json({ message: "Logout successfully" })
})

export const isMe = asyncHandler(async (req, res) => {
            const user = await User.findById({ _id: req.user.id }).select("-password")
            console.log(user)
            if (!user) {
                        throw new CustomError("User not found", 404)
            }
            res.status(200).json({ success: true, message: "User details fetched successfully", user })
});

