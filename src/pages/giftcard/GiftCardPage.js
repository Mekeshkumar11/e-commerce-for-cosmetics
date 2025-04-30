import React from 'react';
import './GiftCardPage.css';

const giftCards = [
  {
    title: 'Glow Up Deal',
    offer: 'Flat ₹500 Off',
    description: 'On orders above ₹1999',
  },
  {
    title: 'Self-Care Special',
    offer: 'Buy 1 Get 1 Free',
    description: 'Applicable on selected products',
  },
  {
    title: 'Beauty Bonus',
    offer: '₹100 Cashback',
    description: 'Via Wallet on prepaid orders',
  },
  {
    title: 'Glam Gift',
    offer: 'Free Lip Balm',
    description: 'On orders above ₹999',
  },
  {
    title: 'Radiance Pack',
    offer: '20% Off',
    description: 'On all skincare combos',
  },
  {
    title: 'Festive Beauty',
    offer: 'Free Makeup Kit',
    description: 'On orders above ₹2999',
  },
];

const GiftCardPage = () => {

  function status(){
    alert("Availed the gift card successfully !");
  }

  return (
    <div className="gift-card-page">
      <h1 className="cosmetix-heading">
        Welcome to <span className="cosmetix-style">Cosmetix</span> Gift Cards
      </h1>
      <p className="slogan">“Because you deserve a little luxury every day.”</p>

      <div className="gift-card-grid">
        {giftCards.map((card, index) => (
          <div key={index} className="gift-card">
            <h2>{card.title}</h2>
            <p className="offer">{card.offer}</p>
            <p className="description">{card.description}</p>
            <button onClick={status} className="avail-btn">Avail Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCardPage;
