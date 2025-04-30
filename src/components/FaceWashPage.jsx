// src/pages/FaceWashPage.jsx
import React from "react";
import facewashData from "../data/facewashData";
import ProductCard from "./ProductCard";
import "./productcard.css" ;

const FaceWashPage = () => {
  return (
    <div className="facewash-page">
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
      </div>

      <div className="product-grid">
        {facewashData.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default FaceWashPage;
