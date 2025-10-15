const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique: true pour s'assurer que deux utilisateurs ne peuvent pas avoir la même adresse
  password: { type: String, required: true } // Le mot de passe sera haché avant d'être stocké
});

module.exports = mongoose.model('User', userSchema); // Le modèle 'User' sera utilisé pour interagir avec la collection 'users' dans la base de données
// 