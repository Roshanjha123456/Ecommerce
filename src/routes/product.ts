import express from "express";
import { newProduct } from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";
import { adminOnly } from "../middleware/auth/adminOnly.js";
import { latestProduct } from "../controllers/product.js";
import { getCategories } from "../controllers/product.js";
import { getSingleProduct } from "../controllers/product.js";
import { updateProduct } from "../controllers/product.js";
import { productsFilter } from "../controllers/product.js";


const router = express.Router();

router.post("/new", singleUpload, adminOnly, newProduct);
router.get("/latest", latestProduct);
router.get("/getCategories",  getCategories);

router.get("/productsFilter", productsFilter);




router.route("/:id").get(adminOnly ,getSingleProduct).put(singleUpload,updateProduct)

export default router;
