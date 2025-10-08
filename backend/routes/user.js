const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Route pour inscription
router.post('/signup', userCtrl.signup);

// Route pour connexion
router.post('/login', userCtrl.login);

module.exports = router;