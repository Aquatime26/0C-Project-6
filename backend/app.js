const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

const uri = "mongodb+srv://Aquatime26:jvWu%23cP%249H_nc9h@clusteraa.qenjevu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAA";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie avec Mongoose !"))
.catch(err => console.error("Erreur de connexion MongoDB :", err));

const app = express();

// Middleware to parse JSON bodies
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// Routes
//Créer un nouvel élément
app.post('/api/books', (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body
  });
  book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

//Récupérer un élément
app.get('/api/books/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
});

//Récupérer tous les éléments
app.use('/api/books', (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
});

//Modifier un élément
app.put('/api/books/:id', (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//Supprimer un élément
app.delete('/api/books/:id', (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});


const multer = require('multer');


module.exports = app;