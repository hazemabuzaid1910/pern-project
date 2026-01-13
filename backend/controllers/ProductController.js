import e from "express";
import { sql } from "../config/db.js";

export const getAllProducts = async(req, res) => {
    try {
        const products = await sql `
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
        res.status(200).json({
            status: "success",
            data: products

        });
    } catch (error) {}
}
export const getProducte = async(req, res) => {
    const { id } = req.params;
    try {
        const product = await sql `
        SELECT * FROM products WHERE id=${id};
        `
        res.status(200).json({
            status: "success",
            data: product
        });
    } catch (error) {
        console.log("Error getProducte", error)
        res.status(500).json({ status: "error", message: "Server error" });
    }
}
export const createProduct = async(req, res) => {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
        return res.status(400).json({ status: "error", message: "Name, price and image are required" });
    }

    try {
        const newProduct = await sql `
     INSERT INTO products (name,image,price)
     VALUES (${name}, ${image}, ${price})
     RETURNING *
     `;
        console.log("new product :", newProduct);
        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        res.send("Create a product");
        res.status(500).json({ status: "error", message: "Server error" });
    }
}
export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
    try {
        const updateproduct = await sql `
        UPDATE products 
        SET name = ${name}, image = ${image}, price = ${price}
        WHERE id=${id}
        RETURNING *
        `;
        if (updateproduct.length === 0) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }
        res.status(200).json({ status: "success", data: updateproduct[0] });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });


    }
}
export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await sql `
    DELETE FROM products WHERE id=${id}
    RETURNING *;
    `
        if (deleteProduct.length === 0) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
}