const express = require('express');
const userController = require('../controllers/user.controller');
const { verifyJWT, isAdmin, isSelfOrAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Rota pública para criar um usuário
router.post('/', userController.createUser);

// Rotas protegidas
router.get('/', verifyJWT, isAdmin, userController.getAllUsers);
router.get('/:id', verifyJWT, isSelfOrAdmin, userController.getUserById);
router.put('/:id', verifyJWT, isSelfOrAdmin, userController.updateUser);
router.delete('/:id', verifyJWT, isAdmin, userController.deleteUser);

module.exports = router;