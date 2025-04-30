const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  username: String,
  productId: String,
  product: Object,
});

module.exports = mongoose.model('Cart', cartSchema);
