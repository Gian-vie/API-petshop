const express = require('express');
const petController = require('../controllers/pet.controller');
const { verifyJWT, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Rota pública para listar pets disponíveis
router.get('/available', petController.getAvailablePets);

// Rotas protegidas (somente admin)
router.get('/', verifyJWT, isAdmin, petController.getAllPets);
router.post('/', verifyJWT, isAdmin, petController.createPet);
router.get('/:id', verifyJWT, isAdmin, petController.getPetById);
router.put('/:id', verifyJWT, isAdmin, petController.updatePet);
router.delete('/:id', verifyJWT, isAdmin, petController.deletePet);

module.exports = router;