import React, { useState } from "react";
import "./helpPage.css";
import { FaShoppingCart, FaBox, FaCreditCard, FaUndo, FaReceipt, FaQuestionCircle , FaCommentDots } from 'react-icons/fa';

const HelpPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setShowChat(!showChat);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // Dummy bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thanks for your message! We’ll get back shortly.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="help-container">
        <div className="help-wrapper">
          <h2 className="help-title"><FaQuestionCircle className="help-icon" /> Need Help?</h2>
          <p className="help-subtext">Welcome to our help center. Here are a few things you can try:</p>

          <div className="help-flex">
            <div className="help-left">
              <ul className="help-list">
                <li><FaShoppingCart className="icon" /> Learn how to place an order.</li>
                <li><FaBox className="icon" /> Track your product shipment.</li>
                <li><FaCreditCard className="icon" /> Understand our payment methods.</li>
                <li><FaUndo className="icon" /> Request returns and refunds.</li>
                <li><FaReceipt className="icon" /> View your purchase history.</li>
              </ul>
            </div>

            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              <ul className="faq-list">
                <li>
                  <strong>Q:</strong> How can I track my order?<br />
                  <strong>A:</strong> Go to <em>My Orders</em> and check the current status.
                </li>
                <li>
                  <strong>Q:</strong> Can I cancel my order?<br />
                  <strong>A:</strong> Yes, within 24 hours of placing it.
                </li>
                <li>
                  <strong>Q:</strong> What payment options are available?<br />
                  <strong>A:</strong> UPI, Credit/Debit Card, Net Banking.
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="contact-info">
            <h3>Need More Help?</h3>
            <p>Email us at <a href="mailto:support@ecosmetics.com">support@ecosmetics.com</a></p>
            <p>Call us: +91 98765 43210 (Mon–Sat, 9 AM to 6 PM)</p>
        </div>

        <div className="chat-toggle" onClick={toggleChat}>
            <FaCommentDots /> Chat with Us
        </div>

        {showChat && (
            <div className="chat-box">
            <div className="chat-header">Chat Support</div>
            <div className="chat-body">
                {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                    {msg.text}
                </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
      )}


    </div>
  );
};

export default HelpPage;
