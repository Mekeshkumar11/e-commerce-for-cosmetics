import React from 'react';
import './aboutpage.css';
import aboutImage from '../../assets/about.jpg';
import { FaCheckCircle, FaUsers, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
      </header>

      <section className="about-main-section">
        <div className="about-left-column">
          <div className="about-mission">
            <h2>Our Mission</h2>
            <p>
              At <span>Cosmetix</span>, our mission is to provide the highest quality products that meet the needs of our customers. 
              We prioritize customer satisfaction, product innovation, and ethical practices in everything we do.Cosmetics companies 
              often have mission statements that reflect their core values, goals, and aspirations. For example, MAC Cosmetics' 
              mission is to be the world's leading makeup authority among both professional makeup artists and consumers, aiming to 
              meet customers' needs for superior quality services and to provide a secure and 
              challenging work environment for all employees.
            </p>
          </div>
          <div className="about-why">
            <h2>Why Choose Us?</h2>
            <p>
              We are committed to offering top-notch products backed by a team of experts in the industry. 
              Whether you're looking for reliability, performance, or value, we strive to deliver the best experience possible for our customers.
            </p>
          </div>
        </div>
        <div className="about-right-column">
          <img src={aboutImage} alt="Trusted Products" className="about-main-image" />
        </div>
      </section>

      <section className="about-values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaCheckCircle className="value-icon" />
            <h4>Quality First</h4>
            <p>We ensure every product meets our strict standards before reaching you.</p>
          </div>
          <div className="value-card">
            <FaUsers className="value-icon" />
            <h4>Customer-Centric</h4>
            <p>We listen, adapt, and improve with your feedback at the core of our growth.</p>
          </div>
          <div className="value-card">
            <FaLightbulb className="value-icon" />
            <h4>Innovation</h4>
            <p>Our team constantly evolves to bring you the latest and greatest in cosmetics.</p>
          </div>
          <div className="value-card">
            <FaShieldAlt className="value-icon" />
            <h4>Integrity</h4>
            <p>We stand by our words and our products — transparency is key.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
