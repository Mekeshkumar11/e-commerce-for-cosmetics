const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  reviews: Number,
  image: String
});

module.exports = (collectionName) => mongoose.model(collectionName, productSchema, collectionName);
