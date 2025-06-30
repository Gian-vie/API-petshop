const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    // 409 Conflict é um bom status para "recurso já existe"
    if (error.message.includes('cadastrado')) {
        return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const success = await userService.deleteUser(req.params.id);
        if (!success) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};