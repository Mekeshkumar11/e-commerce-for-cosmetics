const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema for Cart
const cartSchema = new mongoose.Schema({
  username: String,
  productId: String,
  product: Object,
});

const Cart = mongoose.model("Cart", cartSchema);

// ✅ Get all cart items for a user
router.get("/:username", async (req, res) => {
  try {
    const items = await Cart.find({ username: req.params.username });
    res.json(items);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// ✅ Add a product to cart only if not already present
router.post("/items", async (req, res) => {
  try {
    const { username, product } = req.body;

    const existing = await Cart.findOne({
      username,
      productId: product._id,
    });

    if (existing) {
      return res.status(200).json({ message: "Product already in cart", alreadyInCart: true });
    }

    await Cart.create({ username, productId: product._id, product });
    res.status(200).json({ message: "Product added to cart", alreadyInCart: false });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// Update quantity
router.post("/update-quantity", async (req, res) => {
  const { username, productId, quantity } = req.body;
  try {
    const item = await Cart.findOne({ username, productId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await item.save();
    res.status(200).json({ message: "Quantity updated" });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ message: "Error updating quantity" });
  }
});

// Remove item
router.post("/remove", async (req, res) => {
  const { username, productId } = req.body;
  try {
    await Cart.deleteOne({ username, productId });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ message: "Error removing item" });
  }
});

// Clear all cart items for user
router.post('/clear', async (req, res) => {
  try {
    const { username } = req.body;
    await Cart.deleteMany({ username }); // Remove all cart items for this user
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error("Failed to clear cart:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
