import { loginService } from '../services/authService.js';


export const loginController = async (req, res) => {
    try {
        const result = await loginService(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};


