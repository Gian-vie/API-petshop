const bcrypt = require('bcryptjs');
const petModel = require('../models/petsModel');

const createPet = async (userData) => {
  // Verifica se o e-mail já está em uso
  const existingUser = await petModel.findByEmail(userData.email);
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

  return petModel.create(newUser);
};

// Outros serviços podem ser mais diretos, chamando o model correspondente
const getAllPets = () => petModel.findAll();
const getPetById = (id) => petModel.findById(id);
const getAvailablePets = () => petModel.findAvailable()
const deletePet = async (id) => {
    let pet = petModel.findById(id)
    if(pet.status === 'adopted'){
        throw new Error ("Pets adotados não podem ser removidos")
    }
    petModel.remove(id)};
const updatePet = (id, userData) => petModel.update(id, userData);

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  getAvailablePets,
  updatePet,
  deletePet
};