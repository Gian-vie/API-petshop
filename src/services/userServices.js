const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const createUser = async (userData) => {
  // Verifica se o e-mail já está em uso
  const existingUser = await userModel.findByEmail(userData.email);
  if (existingUser) {
    throw new Error('Este e-mail já está cadastrado');
  }

  // Criptografa a senha antes de salvar
  const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 é o "salt rounds"

  // Substitui a senha original pela hasheada
  const newUser = {
    ...userData,
    password: hashedPassword,
    role: userData.role || 'adopter', // Define 'adopter' como padrão se não for fornecido
  };

  return userModel.create(newUser);
};

// Outros serviços podem ser mais diretos, chamando o model correspondente
const getAllUsers = () => userModel.findAll();
const getUserById = (id) => userModel.findById(id);
const deleteUser = (id) => userModel.remove(id);
const updateUser = async (id, userData) => {
    // Se uma nova senha for fornecida, criptografe-a
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    return userModel.update(id, userData);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};