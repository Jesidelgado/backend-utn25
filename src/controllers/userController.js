import { createUserService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from '../services/userService.js';

export const createUserController = async (req, res) => {
    try {
        const user = await createUserService(req.body);
            res.status(201).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const getUsersController = async (req, res) => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};
 
export const updateUserController = async (req, res) => {
    try {
        const user = await updateUserService(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const result = await deleteUserService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

