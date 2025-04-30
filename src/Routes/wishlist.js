const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlistModel'); // assuming separate wishlist model

// Add to wishlist
router.post('/add', async (req, res) => {
  try {
    const { username, product } = req.body;
    await Wishlist.create({ username, productId: product._id, product });
    res.send({ success: true });
  } catch (err) {
    console.error('Add to wishlist error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Remove from wishlist
router.post('/remove', async (req, res) => {
  try {
    const { username, productId } = req.body;
    await Wishlist.deleteOne({ username, productId });
    res.send({ success: true });
  } catch (err) {
    console.error('Remove from wishlist error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get user's wishlist
router.get('/:username', async (req, res) => {
  try {
    const items = await Wishlist.find({ username: req.params.username });
    res.send(items);
  } catch (err) {
    console.error('Get wishlist error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST /api/wishlist/check
router.post('/check', async (req, res) => {
  const { username, productId } = req.body;

  try {
    const existing = await Wishlist.findOne({ username, productId });

    if (existing) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete('/:username/:productId', async (req, res) => {
  const { username, productId } = req.params;

  try {
    await Wishlist.findOneAndUpdate(
      { username },
      { $pull: { products: { _id: productId } } }
    );
    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product' });
  }
});

// Add product to cart
router.post('/:username', async (req, res) => {
  const { username } = req.params;
  const { product } = req.body;

  try {
    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = new Cart({ username, products: [] });
    }

    cart.products.push(product);
    await cart.save();

    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

module.exports = router;
