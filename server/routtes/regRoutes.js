const express = require("express");
const router = express.Router();
const regController = require("../controlllers/regiControllers");


router.post("/register", regController.Register);
router.post("/login", regController.login);
router.post("/userData",regController.userData);



module.exports = router