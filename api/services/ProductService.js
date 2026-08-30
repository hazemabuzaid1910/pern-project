import * as productRepository from "../repositories/ProductRepository.js";

export const getAllProducts = async() => {
    return await productRepository.getAllProducts();
};
export const getProductById = async(id) => {
    return await productRepository.getProductById(id);
};
export const createProduct = async(data) => {
    const { name, price, image } = data;

    if (!name || !price || !image) {
        throw new Error("Name, price and image are required");
    }

    return await productRepository.createProduct(
        name,
        image,
        price
    );
};
export const updateProduct = async(id, data) => {
    const { name, price, image } = data;

    return await productRepository.updateProduct(
        id,
        name,
        image,
        price
    );
};

export const deleteProduct = async(id) => {
    return await productRepository.deleteProduct(id);
};