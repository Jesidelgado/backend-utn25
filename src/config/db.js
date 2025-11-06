import mongoose from 'mongoose';
import { MONGODB_URI, DB } from './config.js';

// Creamos la conexion de la base de datos
export const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_URI}/${DB}`);
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

