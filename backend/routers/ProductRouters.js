import express from "express";
import { getAllProducts, createProduct, getProducte, updateProduct, deleteProduct } from "../controllers/ProductController.js";
const router = express.Router();


router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProducte);
router.post('/api/products', createProduct);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);


export default router;