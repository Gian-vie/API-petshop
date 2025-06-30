const petModel = require("../models/petModel");

const createPet = async (petData) => {
  // Verifica se o e-mail já está em uso
  const existingPet = await petModel.findById(petData.name);
  if (existingPet) {
    throw new Error("Este pet ja esta cadastrado");
  }

  return petModel.create(petData);
};

// Outros serviços podem ser mais diretos, chamando o model correspondente
const getAllPets = () => petModel.findAll();
const getPetById = (id) => petModel.findById(id);
const getAvailablePets = () => petModel.findAvailable();
const deletePet = async (id) => {
  const pet = await petModel.findById(id);
  if (!pet) {
    throw new Error("Pet não encontrado");
  }
  if (pet.status === "adopted") {
    throw new Error('Pets com status "adopted" não podem ser removidos.');
  }
  return petModel.remove(id);
};
const updatePet = (id, userData) => petModel.update(id, userData);

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  getAvailablePets,
  updatePet,
  deletePet,
};
