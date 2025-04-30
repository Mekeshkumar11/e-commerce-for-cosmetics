// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { FaGift, FaQuestionCircle  , FaSearch, FaHeart, FaShoppingCart , FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username); // or user.name, depending on your backend response
    }
  }, []);

  const handleUserClick = () => {
    if (username) {
      // Logout logic
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUsername(""); // Update local state
      navigate("/home"); // Redirect to login
    } else {
      navigate("/"); // If not logged in, just navigate
    }
  };

  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setShowText(true);
      }, 2000); // Show again after 3 seconds
    }, 6000); // Repeat every 7 seconds

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="navbar-wrapper">
      <div className="animated-banner">
        <div className="makeup-icons">
          <i className="fas fa-lipstick"></i>
          <i className="fas fa-brush"></i>
          <i className="fas fa-paint-brush"></i>
          <i className="fas fa-eye-dropper"></i>
        </div>

        <div className="banner-inner">
          <div className={`offer-text ${showText ? 'show' : 'hide'}`}>
            Limited Time Offer
            <span style={{ color: "rgb(134, 3, 174)", fontWeight: "bold" }}> BUY 1 </span> Get 
            <span style={{ color: "rgb(233, 30, 99)", fontWeight: "bold" }}> 1 FREE! </span>
          </div>

          <div className="banner-actions">
          <button className="banner-btn" onClick={ ()=> navigate('giftcard') }>
            <FaGift style={{ marginRight: "6px" }} /> Gift Card
          </button>
          <button className="banner-btn"  onClick={ ()=> navigate('help') }>
            <FaQuestionCircle style={{ marginRight: "6px" }} /> Help
          </button>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-left">
          <h2 className="logo">Cosmetix</h2>
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li className="has-submenu">
              <a href="#">Face</a>
              <ul className="submenu">
                <li className="has-submenu">
                  <a href="#">Cleansing</a>
                  <ul className="submenu">
                    <li><Link to="/face/cleansing/facewash">Face Wash</Link></li>
                    <li><Link to="/face/cleansing/makeupremover">Makeup Remover</Link></li>
                    <li><Link to="/face/cleansing/micellarwater">Micellar Water</Link></li>
                    <li><Link to="/face/cleansing/toner">Toner</Link></li>
                    <li><Link to="/face/cleansing/cleansingbar">Cleansing Bars</Link></li>
                    <li><Link to="/face/cleansing/wipes">Wipes</Link></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Moisturizing</a>
                  <ul className="submenu">
                    <li><Link to="/face/moisturizing/daycream">Day Cream</Link></li>
                    <li><Link to="/face/moisturizing/nightcream">Night Cream</Link></li>
                    <li><Link to="/face/moisturizing/tintedcream">Tinted Cream</Link></li>
                    <li><Link to="/face/moisturizing/serums">Serums</Link></li>
                    <li><Link to="/face/moisturizing/moisturiser">Moisturiser with SPF</Link></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Anti Aging</a>
                  <ul className="submenu">
                    <li><a href="#">Luminous 630</a></li>
                    <li><a href="#">Expert List with Bakuchiol</a></li>
                    <li><a href="#">Q10 Power</a></li>
                    <li><a href="#">Dark Circles Under Eyes</a></li>
                    <li><a href="#">Cellular Expert Filler</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Lip</a>
                  <ul className="submenu">
                    <li><a href="#">Lip Balm and Scrubs</a></li>
                  </ul>
                </li>
              </ul>
              <span className="sub-toggle"><i></i></span>
            </li>
            <li className="has-submenu">
              <a href="#">Body</a>
              <ul className="submenu">
                <li className="has-submenu">
                  <a href="#">Bodycare</a>
                  <ul className="submenu">
                    <li><Link to="/body/bodycare/lotion">Lotion</Link></li>
                    <li><Link to="/body/bodycare/gradualtan">Gradual Tan</Link></li>
                    <li><Link to="/body/bodycare/firmingshaping">Firming & Shaping</Link></li>
                    <li><Link to="/body/bodycare/allpurposecream">All Purpose Cream</Link></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Deodorant</a>
                  <ul className="submenu">
                    <li><a href="#">Roll On Deodorant</a></li>
                    <li><a href="#">Spray Deodorant</a></li>
                    <li><a href="#">Anti Stain Deodorant</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Shower</a>
                  <ul className="submenu">
                    <li><a href="#">Shower Cream</a></li>
                    <li><a href="#">Shower Gel</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Hand</a>
                  <ul className="submenu">
                    <li><a href="#">Hand Cream</a></li>
                    <li><a href="#">Hand Wash</a></li>
                  </ul>
                </li>
              </ul>
              <span className="sub-toggle"><i></i></span>
            </li>
            <li className="has-submenu">
              <a href="#">Men</a>
              <ul className="submenu">
                <li className="has-submenu">
                  <a href="#">Face Care</a>
                  <ul className="submenu">
                    <li><a href="#">Men Face Moisturiser</a></li>
                    <li><a href="#">Men Face Wash</a></li>
                    <li><a href="#">Men Anti Age</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Shaving</a>
                  <ul className="submenu">
                    <li><a href="#">Shaving Gel</a></li>
                    <li><a href="#">Shaving Foam</a></li>
                    <li><a href="#">Post Shave Care</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Deodorant</a>
                  <ul className="submenu">
                    <li><a href="#">Men Deodorant Spray</a></li>
                    <li><a href="#">Men Deodorant Roll On</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Shower</a>
                  <ul className="submenu">
                    <li><a href="#">Men Shower Gel</a></li>
                  </ul>
                </li>
              </ul>
              <span className="sub-toggle"><i></i></span>
            </li>
            <li><a href="#" >Fragrance</a></li>
            <li><a href="#" >Baby</a></li>
            <li><a href="/about" >About</a></li>
          </ul>
        </div>


        <div className="navbar-right">
          <ul className="nav-icons">
            <li onClick={handleUserClick} style={{ cursor: "pointer" }}>
              <FaUser style={{ marginRight: "5px" }} />
              {username ? `Logout (${username})` : "Login"}
            </li>
            <li onClick={()=> navigate('Wishlist')}><FaHeart /></li>
            <li onClick={()=> navigate('cart')}><FaShoppingCart /></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
