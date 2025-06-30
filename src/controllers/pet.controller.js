const petServices = require('../services/petServices');

const createPet = async (req, res) => {
  try {
    const newUser = await petServices.createPet(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    // 409 Conflict é um bom status para "recurso já existe"
    if (error.message.includes('cadastrado')) {
        return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const getAllPets = async (req, res) => {
    try {
        const pets = await petServices.getAllPets();
        return res.status(200).json(pets);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const getPetById = async (req, res) => {
    try {
        const user = await petServices.getPetById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const getAvailablePets = async (req, res) => {
    try {
        const pets = await petServices.getAvailablePets();
        return res.status(200).json(pets);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const updatePet = async (req, res) => {
    try {
        const updatedPet = await petServices.updatePet(req.params.id, req.body);
        if (!updatedPet) {
            return res.status(404).json({ message: 'Pets não encontrado' });
        }
        return res.status(200).json(updatedPet);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const deletePet = async (req, res) => {
    if(req.status === "adopted"){
        
    }
    try {
        const success = await petServices.deletePet(req.params.id);
        if (!success) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


module.exports = {
  createPet,
  getAllPets,
  getPetById,
  getAvailablePets,
  updatePet,
  deletePet,
};