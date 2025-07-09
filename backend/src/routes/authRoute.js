import { Router } from "express";
import { isMe, login, logout, register } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authenticated.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, isMe);

export default router;