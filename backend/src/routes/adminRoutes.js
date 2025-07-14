import { Router } from "express";
import { createProduct, productDelete, productUpdate } from "../controller/productController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authenticated.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/product").post(isAuthenticated, isAuthorized("admin", "seller"), upload.single("productImage"), createProduct);
router.route("/product/:id").delete(isAuthenticated, isAuthorized("admin"), productDelete);
router.route("/product/:id").patch(isAuthenticated, isAuthorized("admin"), productUpdate);

export default router;