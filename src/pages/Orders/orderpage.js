import React, { useEffect, useState } from 'react';
import './orderpage.css'; // (we'll create a pink stylish CSS)

const OrderPage = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('lastOrder'));
    setOrderData(storedOrder);
  }, []);

  const getExpectedDeliveryDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5); // 5 days delivery
    return currentDate.toDateString();
  };

  if (!orderData) {
    return (
      <div className="order-page">
        <h2>Loading your order...</h2>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-header">
        <h1>Thank you for your order, {orderData.username}!</h1>
        <p>Your products are on the way!</p>
      </div>

      <div className="order-details">
        <h2>Order Summary</h2>
        <div className="order-items">
          {orderData.items.map((item, index) => (
            <div key={index} className="order-item">
              <p><strong>Product Name:</strong> {item.name}</p>
              {/* You can modify this if you fetch product names instead of ID */}
            </div>
          ))}
        </div>

        <div className="order-address">
          <h3>Delivery Address</h3>
          <p>{orderData.address}</p>
          <p><strong>Expected Delivery:</strong> {getExpectedDeliveryDate()}</p>
        </div>

        <div className="order-total">
          <h2>Total Amount: ₹{orderData.total.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
