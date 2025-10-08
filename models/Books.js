const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: { type: String },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);