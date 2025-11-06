import Category from '../models/categoryModel.js';

export const createCategoryService = async (categoryData) => {
const exist = await Category.findOne({ nombre: categoryData.nombre });
if (exist) {
    const error = new Error(`La categoría ${categoryData.nombre} ya existe, elija otro nombre`);
    error.statusCode = 400;
    throw error;
}
    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    return savedCategory;
};

export const getCategoriesService = async () => {
    const categories = await Category.find();
    if (categories.length === 0) {
        const error = new Error('No hay categorias disponibles');
        error.statusCode = 204;
        throw error;
    }
    return categories;
};

export const getCategoryByIdService = async (categoryId) => {
    const categoryExist = await Category.findById(categoryId);
    if (!categoryExist) {
        const error = new Error(`La categoria ${categoryId} no existe`);
        error.statusCode = 400;
        throw error;
    }
    return categoryExist;
};

export const updateCategoryService = async (categoryId, updateData) => {
    const categoryExist = await Category.findById(categoryId);
    if (!categoryExist) {
        const error = new Error('La categoria que intenta actualizar no existe');
        error.statusCode = 400;
        throw error;
    }
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
    return updatedCategory;
};

export const deleteCategoryService = async (categoryId) => {
    const categoryExist = await Category.findById(categoryId);
    if (!categoryExist) {
        const error = new Error('La categoria que intenta eliminar no existe');
        error.statusCode = 400;
        throw error;
    }
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    return { message: 'Categoria eliminada correctamente', deleteCategory };
};