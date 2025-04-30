import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/policypage">Terms & Conditions</a></li>
            <li><a href="/policypage">Privacy Policy</a></li>
            <li><a href="/policypage">Return & Refund Policy</a></li>
            <li><a href="/policypage">Shipping Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer</h3>
          <ul>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/account">My Account</a></li>
            <li><a href="/help">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><a href="/face/cleansing/facewash">Makeup</a></li>
            <li><a href="/skincare">Skincare</a></li>
            <li><a href="/haircare">Haircare</a></li>
            <li><a href="/fragrance">Fragrance</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaPhone /> +91 98765 43210</p>
          <p><FaEnvelope /> support@cosmetix.com</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© 2025 Cosmetix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
