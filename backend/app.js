const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

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

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

//Configuration de multer pour la gestion des fichiers
// const storage = multer.diskStorage({

module.exports = app;