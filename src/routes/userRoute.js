import express from 'express';
import { createUserController, getUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const userRoute = express.Router();

// Rutas publicas (POST - registro de usuario)
userRoute.post('/', createUserController);

// Rutas protegidas (GET, PUT, DELETE - requieren autenticación)
userRoute.get('/', verifyToken, getUsersController);
userRoute.get('/:id', verifyToken,getUserByIdController);
userRoute.put('/:id', verifyToken,updateUserController);
userRoute.delete('/:id', verifyToken, deleteUserController);
