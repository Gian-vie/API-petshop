const express = require('express');
const adoptionController = require('../controllers/adoption.controller');
const { verifyJWT, isAdmin, isAdopter } = require('../middlewares/auth.middleware');

const router = express.Router();

// Rotas protegidas
router.post('/', verifyJWT, isAdopter, adoptionController.createAdoption);
router.get('/', verifyJWT, isAdmin, adoptionController.getAllAdoprions);

module.exports = router;