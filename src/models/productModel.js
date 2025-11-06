import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        minlength: 10,
        maxlength: 500,
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoria es obligatoria']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria']
    }
}, { timestamps: true });


export default mongoose.model('Product', productSchema);
