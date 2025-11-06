import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const verifyToken = (req, res, next) => {
    try {
        // Obtener el token del header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                message: 'Acceso denegado. No se proporciono token de autenticacion.'
            });
        }

        // Verifico el token
        const verified = jwt.verify(token, JWT_SECRET);

        // Agrego los datos del usuario al request
        req.user = verified;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        res.status(500).json({ message: 'Error en la autenticación.' });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({
            message: 'Acceso denegado. Se requieren permisos de administrador.'
        });
    }
    next();
};