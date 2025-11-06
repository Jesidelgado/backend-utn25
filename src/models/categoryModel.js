import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 30,
        minLength: 2
    },
    descripcion: {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 200,
        required: false
    }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
