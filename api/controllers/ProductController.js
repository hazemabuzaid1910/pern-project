import * as productService from "../services/ProductService.js";

export const getAllProducts = async(req, res) => {
    try {
        const products = await productService.getAllProducts();

        res.status(200).json({
            status: "success",
            data: products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};
export const getProductById = async(req, res) => {
    const { id } = req.params;

    try {
        const product = await productService.getProductById(id);

        if (product.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};
export const createProduct = async(req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);

        res.status(201).json({
            success: true,
            data: newProduct[0]
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};
export const updateProduct = async(req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await productService.updateProduct(
            id,
            req.body
        );

        if (updatedProduct.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: updatedProduct[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};

export const deleteProduct = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productService.deleteProduct(id);

        if (deletedProduct.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};