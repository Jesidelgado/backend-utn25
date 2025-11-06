import { registerService } from "../services/authService.js";

export const registerController = async (req, res) => {
    try {
        const result = await registerService(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};