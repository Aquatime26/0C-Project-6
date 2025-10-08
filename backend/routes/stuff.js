const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/control');

// Routes

//Récupérer tous les éléments
router.get('/' , auth, stuffCtrl.getAllThings);

//Créer un nouvel élément
router.post('/', auth, multer, stuffCtrl.createThing);

//Récupérer un élément
router.get('/:id', auth, stuffCtrl.getOneThing);

//Modifier un élément
router.put('/:id', auth, multer, stuffCtrl.modifieThing);

//Supprimer un élément
router.delete('/:id', auth, multer, stuffCtrl.deleteThing);

module.exports = router;