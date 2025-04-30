import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [address, setAddress] = useState(localStorage.getItem('address') || '');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const username = storedUser?.username;
  const navigate = useNavigate();
  useEffect(() => {
    if (username) {
      fetchCart();
    }
  }, [username]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${username}`);
      const cartWithLocalQty = response.data.map(item => {
        const storedQty = parseInt(localStorage.getItem(`qty_${item.productId}`));
        item.quantity = isNaN(storedQty) ? 1 : storedQty;
        return item;
      });
      setCartItems(cartWithLocalQty);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/update-quantity', {
        username,
        productId,
        quantity: newQty,
      });

      // Always update localStorage correctly
      localStorage.setItem(`qty_${productId}`, newQty);
      
      // Update state without re-fetching
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart/remove', { username, productId });
      localStorage.removeItem(`qty_${productId}`);
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    localStorage.setItem('address', e.target.value);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity * 1.13, 0);
  };

  const placeOrder = async () => {
    try {
      if (!address.trim()) {
        alert("Please enter your delivery address before placing the order.");
        return;
      }
  
      const formattedItems = cartItems.map(item => ({
        productId: item.productId,
        name: item.product.name,    // ⬅️ Save product name also
        price: item.product.price,
        quantity: item.quantity,
      }));
  
      const orderDetails = {
        username,
        items: formattedItems,      // ⬅️ Use formatted items
        address,
        total: calculateTotal(),
        placedAt: new Date().toISOString()
      };
  
      // Save order details in localStorage
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
  
      // Clear cart in backend
      await axios.post('http://localhost:5000/api/cart/clear', { username });
  
      // Clear cartItems and address in localStorage
      localStorage.removeItem('address');
  
      // Also remove all saved qty_ keys from localStorage
      cartItems.forEach(item => {
        localStorage.removeItem(`qty_${item.productId}`);
      });
  
      setCartItems([]);
      setAddress('');
      setShowSummary(false);
  
      alert("🎉 Order Placed Successfully! Your cart has been cleared.");
      navigate('/orders');
  
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Error while placing the order. Try again!");
    }
  };  
    
  return (
    <div className="main-container">
      <div className={`cart-page ${showSummary ? 'blurred' : ''}`}>
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
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Total (with 13% GST): ₹{calculateTotal().toFixed(2)}</h3>
            <textarea
              className="address-box"
              placeholder="Enter your address here..."
              value={address}
              onChange={handleAddressChange}
            />
            <button className="checkout-btn" onClick={() => setShowSummary(true)}>Proceed to Checkout</button>
          </div>
        )}
      </div>

      {showSummary && (
        <div className="summary-popup">
          <div className="popup-content">
            <h2>🛍️ Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.productId} className="popup-item">
                <p>{item.product.name} (x{item.quantity})</p>
                <p>₹{(item.product.price * item.quantity * 1.13).toFixed(2)}</p>
              </div>
            ))}
            <hr />
            <div className="popup-address">
              <h4>Delivery Address:</h4>
              <p>{address}</p>
            </div>
            <hr />
            <h3>Total (with GST): ₹{calculateTotal().toFixed(2)}</h3>
            <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
            <button className="close-btn" onClick={() => setShowSummary(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
