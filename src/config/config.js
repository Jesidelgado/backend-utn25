import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const DB = process.env.DB;
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
export const NODE_ENV = process.env.NODE_ENV || 'development';

