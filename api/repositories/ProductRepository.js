import { sql } from "../config/db.js";

export const getAllProducts = async() => {
    return await sql `
        SELECT * FROM products
        ORDER BY created_at DESC
    `;
};

export const getProductById = async(id) => {
    return await sql `
        SELECT * FROM products
        WHERE id = ${id}
    `;
};

export const createProduct = async(name, image, price) => {
    return await sql `
        INSERT INTO products (name, image, price)
        VALUES (${name}, ${image}, ${price})
        RETURNING *
    `;
};

export const updateProduct = async(id, name, image, price) => {
    return await sql `
        UPDATE products
        SET name = ${name},
            image = ${image},
            price = ${price}
        WHERE id = ${id}
        RETURNING *
    `;
};

export const deleteProduct = async(id) => {
    return await sql `
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
    `;
};