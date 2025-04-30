// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./productcard.css"; // general reusable styles
import { useParams } from "react-router-dom";
import axios from 'axios';

const ProductCard = ( { product }) => {
  const [liked, setLiked] = useState(false);
  const [username , setusername] = useState(null);

  useEffect(() => {
    const storeduser = JSON.parse(localStorage.getItem('user'));
    if (storeduser && storeduser.username) {
      setusername(storeduser.username);

      axios.get('api/wishlist/${storeduser.username}')
        .then(res => {
          const isLiked = res.data.some(item => item.productId === product._id);
          setLiked(isLiked);
        })
        .catch(err => console.log(err));
      }
    }, [product._id]);

    const toggleWishlist = async () => {
      if (!username) {
        alert("Please login to manage your wishlist");
        return;
      }
    
      try {
        const response = await axios.post('http://localhost:5000/api/wishlist/check', {
          username,
          productId: product._id
        });
    
        const isInWishlist = response.data.exists;
    
        if (isInWishlist) {
          await axios.post('http://localhost:5000/api/wishlist/remove', {
            username,
            productId: product._id
          });
          alert(`${product.name} has been removed from your wishlist! 💔`);
        } else {
          await axios.post('http://localhost:5000/api/wishlist/add', {
            username,
            product
          });
          alert(`${product.name} has been added to your wishlist! ❤️`);
        }
    
        setLiked(!isInWishlist); // update local liked state
    
      } catch (error) {
        console.error("Error handling wishlist toggle:", error);
        alert("Something went wrong. Please try again later.");
      }
    };
    
    const handleAddToCart = async () => {
      if (!username) {
        alert("Please login to add to cart!");
        return;
      }
    
      try {
        const addResponse = await axios.post("http://localhost:5000/api/cart/items", {
          username,
          product,
        });
    
        if (addResponse.data.alreadyInCart) {
          alert(`${product.name} is already in your cart!`);
        } else {
          alert(`${product.name} has been added to your cart! 🛒`);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert(`An error occurred while adding to cart: ${error.message || "Please try again."}`);
      }
    };
    
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-title">
          {product.name.length > 85? `${product.name.slice(0, 85)}...` : product.name}
        </div>
      </div>

      <div className="product-details">
        {/* <p>⭐ {product.rating} ({product.reviews} reviews)</p> */}
        <h4>₹ {product.price}</h4>

        <div className="icon-buttons">
          <button className="icon-btn" onClick={handleAddToCart}>
            < FaShoppingCart/>
          </button>
          <button className="icon-btn" onClick={toggleWishlist}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${category}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="facewash-page">
      <h2 className="category-title">{category.toUpperCase()}</h2>
{/* 
      <div className="top-bar">
        <div className="filters">
          <select>
            <option>All Brands</option>
            <option>GlowCare</option>
            <option>Herbals</option>
            <option>Natural Beauty</option>
          </select>
          <select>
            <option>Price Range</option>
            <option>Under ₹250</option>
            <option>₹250 - ₹500</option>
            <option>Above ₹500</option>
          </select>
        </div>
        <div className="sortby">
          <select>
            <option>Sort by</option>
            <option>Popularity</option>
            <option>Ratings</option>
            <option>New Products</option>
          </select>
        </div>
      </div> */}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
