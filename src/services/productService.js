import Product from '../models/productModel.js';

export const createProductService = async (productData) => {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return savedProduct;
};

export const getProductsService = async () => {
    const products = await Product.find().populate('categoria');
    if (products.length === 0) {
        const error = new Error('No hay productos disponibles');
        error.statusCode = 204;
        throw error;
    }
    return products;
};

export const getProductByIdService = async (productId) => {
    const productExist = await Product.findById(productId).populate('categoria');
    if (!productExist) {
        const error = new Error(`El producto ${productId} no existe`);
        error.statusCode = 400;
        throw error;
    }
    return productExist;
};

export const getProductsByCategoryService = async (categoryId) => {
    const products = await Product.find({ categoria: categoryId }); 
    if (products.length === 0) {
        const error = new Error ('No hay productos en esta categoria');
        error.statusCode = 404;
        throw error;
    }
    return products;
};

export const updateProductService = async (productId, updateData) => {
    const productExist = await Product.findById(productId);
    if (!productExist) {
        const error = new Error('El producto que intenta actualizar no existe');
        error.statusCode = 400;
        throw error;
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    return updatedProduct;
};

export const deleteProductService = async (productId) => {
    const productExist = await Product.findById(productId);
    if (!productExist) {
        const error = new Error('El producto que intenta eliminar no existe');
        error.statusCode = 400;
        throw error;
    }
    const deleteProduct = await Product.findByIdAndDelete(productId);
    return { message: 'Producto eliminado correctamente', deleteProduct };
};


