const Book = require('../models/Book');
const fs = require('fs');

//Récupérer tous les éléments
exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}

//Créer un nouvel élément
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book.save()
  .then(() => { res.status(201).json({ message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
}

//Récupérer un élément
exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
}

//Modifier un élément
exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message : 'Not authorized'});
      } else {
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
          .then(() => res.status(200).json({ message : 'Objet modifié!'}))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error }); 
  });
}

//Supprimer un élément
exports.deleteBook = (req, res, next) => {
   Book.findOne({ _id: req.params.id})
       .then(book => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else {
               const filename = book.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => {
                   Book.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};

// Noter un livre
exports.rateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req.auth?.userId;

    // Vérifications de base
    if (!bookId) return res.status(400).json({ message: 'Book ID missing' });
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Livre non trouvé' });

    // Empêcher l’auteur de noter son propre livre
    if (userId === book.userId) {
      return res.status(403).json({ message: 'Vous ne pouvez pas noter votre propre livre' });
    }

    // Récupérer la note depuis le corps de la requête
    const { grade, rating } = req.body;
    const finalGrade = Number(grade ?? rating);

    if (isNaN(finalGrade) || finalGrade < 0 || finalGrade > 5) {
      return res.status(400).json({ message: 'Note invalide, doit être un nombre entre 0 et 5' });
    }

    // Vérifier si l'utilisateur a déjà noté le livre
    const existingRatingIndex = book.ratings.findIndex(r => r.userId === userId);

    if (existingRatingIndex !== -1) {
      // Mettre à jour la note existante
      book.ratings[existingRatingIndex].grade = finalGrade;
    } else {
      // Ajouter une nouvelle note
      book.ratings.push({ userId, grade: finalGrade });
    }

    // Recalculer la moyenne sur toutes les notes
    const totalGrades = book.ratings.reduce((sum, r) => sum + Number(r.grade), 0);
    book.averageRating = totalGrades / book.ratings.length;

    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error('Erreur dans rateBook:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l’ajout de la note' });
  }
};

// Les 3 meilleurs livres
exports.getBestRatedBooks = async (req, res) => {
  try {
    // Récupère tous les livres triés par averageRating décroissant, limite 3
    const books = await Book.find()
      .sort({ averageRating: -1 })
      .limit(3)
      .lean(); // pour retourner un objet JS simple

    res.status(200).json(books);
  } catch (error) {
    console.error('Erreur getBestRatedBooks:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des meilleurs livres' });
  }
};