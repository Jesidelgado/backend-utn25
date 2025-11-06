import { createProductService, getProductsService, getProductByIdService, getProductsByCategoryService, updateProductService, deleteProductService } from '../services/productService.js';


export const createProductController = async (req, res) => {
    try {
        const product = await createProductService(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProductsController = async (req, res) => {
    try {
        const products = await getProductsService();
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const getProductsByCategoryController = async (req, res) => {
    try {
        const products = await getProductsByCategoryService(req.params.categoryId);
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const result = await updateProductService(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const result = await deleteProductService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};
