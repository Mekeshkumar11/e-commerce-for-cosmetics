import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Cart/cartPAge.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const username = storedUser?.username;

  useEffect(() => {
    if (username) {
      fetchCart();
    }
  }, [username]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${username}`);
      const fetchedItems = response.data;

      const storedQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};

      const updatedItems = fetchedItems.map(item => ({
        ...item,
        quantity: storedQuantities[item.productId] || item.quantity || 1,
      }));

      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.product.price * (item.quantity || 1), 0);
    setTotal(totalAmount);
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      const storedQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};
      storedQuantities[productId] = newQty;
      localStorage.setItem('cartQuantities', JSON.stringify(storedQuantities));

      const updatedCartItems = cartItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQty } : item
      );
      setCartItems(updatedCartItems);
      calculateTotal(updatedCartItems);

      await axios.post('http://localhost:5000/api/cart/update-quantity', {
        username,
        productId,
        quantity: newQty,
      });

    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart/remove', { username, productId });

      const storedQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};
      delete storedQuantities[productId];
      localStorage.setItem('cartQuantities', JSON.stringify(storedQuantities));

      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const proceedToCheckout = () => {
    localStorage.removeItem('cartQuantities');
    setShowSummary(true);
  };

  const placeOrder = () => {
    alert("Order placed successfully!");
    setShowSummary(false);
  };

  const calculateGrandTotal = () => {
    const gstAmount = total * 0.13;
    return (total + gstAmount).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.productId}>
            <img src={item.product.image} alt={item.product.name} />
            <div className="info">
              <h4>{item.product.name}</h4>
              <p>₹{item.product.price}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.productId, (item.quantity || 1) - 1)}>−</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => updateQuantity(item.productId, (item.quantity || 1) + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>Remove</button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹{total}</h3>
          <textarea className="address-box" placeholder="Enter your address here..." />
          <button className="checkout-btn" onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}

      {/* Pop-up Window (Summary Modal) */}
      {showSummary && (
        <div className="summary-popup">
          <div className="summary-content">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map(item => (
                <li key={item.productId}>
                  {item.product.name} - ₹{item.product.price} x {item.quantity} = ₹{item.product.price * item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Subtotal:</strong> ₹{total.toFixed(2)}</p>
            <p><strong>GST (13%):</strong> ₹{(total * 0.13).toFixed(2)}</p>
            <p><strong>Grand Total:</strong> ₹{calculateGrandTotal()}</p>
            <button className="placeorder-btn" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
