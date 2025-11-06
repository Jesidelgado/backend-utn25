import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import { productRoute } from './src/routes/productRoute.js';
import { categoryRoute } from './src/routes/categoryRoute.js';
import { userRoute } from './src/routes/userRoute.js';
import { authRoute } from './src/routes/authRoute.js';

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use(express.json());

app.use('/api/productos', productRoute);
app.use('/api/categorias', categoryRoute);
app.use('/api/usuarios', userRoute);
app.use('/api/auth', authRoute);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de Tienda de Repuestos' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;

// Prueba de codificación: español, lógica, ñ, á, é, í, ó, ú, ü 