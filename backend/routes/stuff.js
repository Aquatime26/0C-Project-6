const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const stuffCtrl = require('../controllers/control');

// Routes
//Créer un nouvel élément
router.post('/', auth, stuffCtrl.createThing);

//Modifier un élément
router.put('/:id', auth, stuffCtrl.modifieThing);

//Supprimer un élément
router.delete('/:id', auth, stuffCtrl.deleteThing);

//Récupérer tous les éléments
router.get('/' , auth, stuffCtrl.getAllThings);

//Récupérer un élément
router.get('/:id', auth, stuffCtrl.getOneThing);


module.exports = router;