import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Wishlist.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUser(storedUser);

      // Fetch wishlist using stored username
      axios.get(`http://localhost:5000/api/wishlist/${storedUser.username}`)
        .then(res => setWishlist(res.data))
        .catch(err => console.log(err));
    } else {
      alert('Please login to view your wishlist');
    }
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/wishlist/remove', {
        username: user.username,
        productId
      });
      // Update UI
      setWishlist(prev => prev.filter(({ product }) => product._id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  const addToCart = async (product) => {
    try {
      const res = await axios.post('http://localhost:5000/api/cart/items', {
        username: user.username,
        product
      });

      if (!res.data.alreadyInCart) {
        // If added successfully, remove from wishlist
        removeFromWishlist(product._id);
      } else {
        alert("Item already in cart");
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (!user) {
    return <p>Please log in to access your wishlist.</p>;
  }

  return (
    <div className="wishlist-page">
      <h2>{user.username}'s Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <p>No products added to wishlist yet.</p>
        ) : (
          wishlist.map(({ product }) => (
            <div className="wishlist-card" key={product._id}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>Price: ₹{product.price}</p>
              <div className="wishlist-buttons">
                <button className="btn-remove" onClick={() => removeFromWishlist(product._id)}>Remove</button>
                <button className="btn-cart" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
