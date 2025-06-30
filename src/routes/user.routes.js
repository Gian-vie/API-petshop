const express = require("express");
const userController = require("../controllers/user.controller");
const route = express.Router();
router.post("./", userController.create)