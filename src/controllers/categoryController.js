import { createCategoryService, getCategoriesService, getCategoryByIdService, updateCategoryService, deleteCategoryService } from '../services/categoryService.js';

export const createCategoryController = async (req, res) => {
    try {
        const category = await createCategoryService(req.body)
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategoriesService();
        res.status(200).json(categories);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const getCategoryByIdController = async (req, res) => {
    try {
        const category = await getCategoryByIdService(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const category = await updateCategoryService(req.params.id, req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const result = await deleteCategoryService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};
