import User from '../models/userModel.js';

export const createUserService = async (userData) => {
    // Validamos si ya existe el usuario
    const userExist = await User.findOne({ email: userData.email })

    if(userExist){
        throw new Error('User with this email already exists')
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser; // return: { 'User created', user: newUser }
};

// Obtener todos los usuarios
export const getUsersService = async () => {
    const users = await User.find();
    if (users.length === 0) {
        const error = new Error('No hay usuarios');
        error.statusCode = 204;
        throw error;
    }
    return users;
};

export const getUserByIdService = async (userId) => {
    const userExist = await User.findById(userId);
    if (!userExist) {
        const error = new Error(`El usuario ${userId} no existe`);
        error.statusCode = 400;
        throw error;
    }
    return userExist;
};

export const updateUserService = async (userId, updateData) => {
    const userExist = await User.findById(userId);
    if (!userExist) {
        const error = new Error('El usuario que intenta actualizar no existe')
        error.statusCode = 400;
        throw error;
    }
    const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return updateUser;
};

export const deleteUserService = async (userId) => {
    const userExist = await User.findById(userId);
    if (!userExist) {
        const error = new Error('El usuario que intenta eliminar no existe')
        error.statusCode = 404;
        throw error;
    }
    const deleteUser = await User.findByIdAndDelete(userId);
    return { message: 'Usuario eliminado exitosamente', deleteUser };
};
