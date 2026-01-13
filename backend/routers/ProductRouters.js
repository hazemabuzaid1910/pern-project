import express from "express";
import { getAllProducts, createProduct, getProducte, updateProduct, deleteProduct } from "../controllers/ProductController.js";
const router = express.Router();


router.get('/', getAllProducts);
router.get('/:id', getProducte)
router.post('/', createProduct);
router.post('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;