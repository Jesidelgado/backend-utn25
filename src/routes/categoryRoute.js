import express from 'express';
import { createCategoryController, getCategoriesController, getCategoryByIdController, updateCategoryController, deleteCategoryController } from '../controllers/categoryController.js';
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js';

export const categoryRoute = express.Router();

// Rutas publicas (GET - cualquiera puede ver categorias)
categoryRoute.get('/', getCategoriesController);
categoryRoute.get('/:id', getCategoryByIdController);
 
// Rutas protegidas (POST, PUT, DELETE - requieren autenticación)
categoryRoute.post('/', verifyToken, verifyAdmin, createCategoryController);
categoryRoute.put('/:id', verifyToken, verifyAdmin, updateCategoryController);
categoryRoute.delete('/:id', verifyToken, verifyAdmin, deleteCategoryController);
