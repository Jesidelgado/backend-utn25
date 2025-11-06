import express from 'express';
import { createProductController, getProductsController, getProductByIdController, getProductsByCategoryController, updateProductController, deleteProductController } from '../controllers/productController.js';
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js';

export const productRoute = express.Router();

// Rutas públicas 
productRoute.get('/', getProductsController);
productRoute.get('/categoria/:categoryId', getProductsByCategoryController);
productRoute.get('/:id', getProductByIdController);

// Rutas protegidas - solo admin
productRoute.post('/', verifyToken, verifyAdmin, createProductController);
productRoute.put('/:id', verifyToken, verifyAdmin, updateProductController);
productRoute.delete('/:id', verifyToken, verifyAdmin, deleteProductController);
