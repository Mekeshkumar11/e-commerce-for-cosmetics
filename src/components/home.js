// ImageSlider.js
import React, { useState, useEffect } from 'react';
import './home.css'; // or separate CSS
import { Link } from 'react-router-dom';
const images = [
  require('../assets/first.jpg'),
  require('../assets/second.jpg'),
  require('../assets/third.jpg'),
  require('../assets/fourth.jpg'),
  require('../assets/fifth.jpg')
];

export const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <img src={images[current]} alt={`Slide ${current + 1}`} className="slide-image" />
        <button className="slider-btn left" onClick={goToPrev}>‹</button>
        <button className="slider-btn right" onClick={goToNext}>›</button>
      </div>
    </div>
  );
};

const imageList = [
  "blush.jpg", "eyeliner.jpg", "facebrush.webp", "falseeyelash.webp", "kajal.jpg",
  "lipstick.jpg", "makeupkit.webp", "nailpolish.jpg", "settingspary.jpg", "lipcrayon.avif" ,
  "facebrush.webp", "falseeyelash.webp", "kajal.jpg",
  "lipstick.jpg"
];

const productNames = [
  "Blush Bloom", "Velvet Lipstick", "Glow Serum", "Matte Foundation", "Lash Luxe Mascara",
  "Silk Primer", "Rose Glow Highlighter", "Nude Palette", "Hydra Mist", "Pore Vanish Gel",
  "Sun Kiss Bronzer", "Berry Tint", "Peach Pop Gloss", "Flawless Finish"
];

const productLinks = [
  '/face/moisturizing/tintedcream',
  'face/moisturizing/nightcream',
];
export const DiamondCollage = () => {
  return (
    <div className="diamond-collage">
      <div className="row">
        {imageList.slice(0, 2).map((img, index) => (
          <Link to={productLinks[index]} key={index} style={{ textDecoration: 'none' }}>
            <div className="diamond">
              <img src={require(`../assets/diamonds/${img}`)} alt={`img${index + 1}`} />
              <div className="overlay">
                <p>{productNames[index]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="row">
        {imageList.slice(2, 5).map((img, index) => (
          <div key={index + 2} className="diamond">
            <img src={require(`../assets/diamonds/${img}`)} alt={`img${index + 3}`} />
            <div className="overlay">
              <p>{productNames[index + 2]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        {imageList.slice(5, 9).map((img, index) => (
          <div key={index + 5} className="diamond">
            <img src={require(`../assets/diamonds/${img}`)} alt={`img${index + 6}`} />
            <div className="overlay">
              <p>{productNames[index + 5]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        {imageList.slice(9, 12).map((img, index) => (
          <div key={index + 9} className="diamond">
            <img src={require(`../assets/diamonds/${img}`)} alt={`img${index + 10}`} />
            <div className="overlay">
              <p>{productNames[index + 9]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        {imageList.slice(12, 14).map((img, index) => (
          <div key={index + 12} className="diamond">
            <img src={require(`../assets/diamonds/${img}`)} alt={`img${index + 13}`} />
            <div className="overlay">
              <p>{productNames[index + 12]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
