const adoptionService = require('../services/adoptionServices');

const createAdoption = async (req, res) => {
  try {
    const { petId } = req.body;
    const { userId } = req.user;

    if (!petId || !userId) {
      return res.status(400).json({ message: "petId e userId são obrigatórios." });
    }
    const newAdoption = await adoptionService.createAdoption({ userId, petId });
    
    return res.status(201).json(newAdoption);
  } catch (error) {
    console.error(error)
    // 409 Conflict é um bom status para "recurso já existe"
    if (error.message.includes('não está disponível')) {
        return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const getAllAdoprions = async (req, res) => {
    try {
        const adoptions = await adoptionService.getAllAdoptions();
        return res.status(200).json(adoptions);
    } catch (error) {
      console.error(error)
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = {
  createAdoption,
  getAllAdoprions,
};