import express from "express";

import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", protect, createProduct);

router.put("/products/:id", protect, updateProduct);

router.delete("/products/:id", protect, deleteProduct);

export default router;