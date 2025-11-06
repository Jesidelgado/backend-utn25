import { JWT_SECRET } from "../config/config.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerService = async ({ nombre, email, contraseña }) => {
    if (!nombre || !email || !contraseña) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
        const error = new Error('El usuario ya existe');
        error.statusCode = 409;
        throw error;
    }
    
    const nuevoUsuario = new User({ nombre, email, contraseña});
    const usuarioGuardado = await nuevoUsuario.save();

    return { message: 'Usuario registrado con exito', usuario: usuarioGuardado };
};


export const loginService = async ({ email, contraseña }) => {
    // Validar que se enviaron los datos
    if (!email || !contraseña) {
        const error = new Error('Email y contraseña son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Buscar el usuario por email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        const error = new Error('El email no está registrado');
        error.statusCode = 401;
        throw error;
    }

    // Comparo contraseñas
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);

    if (!isPasswordValid) {
        const error = new Error('Contraseña incorrecta');
        error.statusCode = 401;
        throw error;
    }

    // Generar jwt
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            nombre: user.nombre,
            rol: user.rol
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    // Devolver token y datos del usuario (sin contraseña)
    return {
        message: 'Login exitoso',
        token,
        user: {
            id: user._id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        }
    };
};