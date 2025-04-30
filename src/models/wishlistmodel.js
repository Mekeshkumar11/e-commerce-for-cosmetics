const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  username: String,
  productId: String,
  product: Object,
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
