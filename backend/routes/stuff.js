const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/control');

// Routes
// Route pour inscription et connexion
router.post('/signup', stuffCtrl.signup);

//Créer un nouvel élément
router.post('/', stuffCtrl.createThing);

//Modifier un élément
router.put('/:id', stuffCtrl.modifieThing);

//Supprimer un élément
router.delete('/:id', stuffCtrl.deleteThing);

//Récupérer tous les éléments
router.get('/' , stuffCtrl.getAllThings);

//Récupérer un élément
router.get('/:id', stuffCtrl.getOneThing);


module.exports = router;