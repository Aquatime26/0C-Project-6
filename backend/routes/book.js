const express = require('express');
const auth = require('../middleware/auth.js');
const router = express.Router();
const multer = require('../middleware/multer-config.js');

const bookCtrl = require('../controllers/book.js');

// Routes

//Récupérer tous les éléments
router.get('/' , bookCtrl.getAllBooks);

//Créer un nouvel élément
router.post('/', auth, multer, bookCtrl.createBook);

//Récupérer un élément
router.get('/:id', bookCtrl.getOneBook);

//Modifier un élément
router.put('/:id', auth, multer, bookCtrl.modifyBook);

//Supprimer un élément
router.delete('/:id', auth, multer, bookCtrl.deleteBook);

// Noter un livre
router.post('/:id/rating', auth, bookCtrl.rateBook);

// // Les 3 meilleurs livres 
// router.get('/best-rated', bookCtrl.getBestRatedBooks);

module.exports = router;