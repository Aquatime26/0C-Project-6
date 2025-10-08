const express = require('express');
const mongoose = require('mongoose');

const app = express();


const uri = "mongodb+srv://Aquatime26:jvWu%23cP%249H_nc9h@clusteraa.qenjevu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAA";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie avec Mongoose !"))
.catch(err => console.error("Erreur de connexion MongoDB :", err));

module.exports = app;