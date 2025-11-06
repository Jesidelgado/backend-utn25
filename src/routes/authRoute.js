import express from "express";
import { loginController } from "../controllers/authController.js";
import { registerController } from "../controllers/registerController.js";


export const authRoute = express.Router();

authRoute.post('/login', loginController);
authRoute.post('/register', registerController);


