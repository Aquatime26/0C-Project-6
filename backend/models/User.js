const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique: true pour s'assurer que deux utilisateurs ne peuvent pas avoir la même adresse
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// const userSchema = mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model('User', userSchema);