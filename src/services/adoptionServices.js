const adoptionModel = require('../models/adoptionModel');
const petModel = require('../models/petModel');

const createAdoption = async ({ userId, petId }) => {
  // 1. Verificar se o pet existe e está disponível
  const pet = await petModel.findById(petId);
  if (!pet) {
    throw new Error('Pet não encontrado');
  }
  if (pet.status !== 'available') {
    throw new Error('Este pet não está disponível para adoção');
  }

  // 2. Registrar a adoção
  const adoptionDate = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
  const newAdoption = await adoptionModel.create({ userId, petId, adoptionDate });

  // 3. Atualizar o status do pet para "adopted"
  await petModel.update(petId, { status: 'adopted' });

  return newAdoption;
};

const getAllAdoptions = () => adoptionModel.findAll();

module.exports = {
  createAdoption,
  getAllAdoptions,
};