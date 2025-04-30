import React from 'react';
import { FaFileContract, FaShieldAlt, FaUndoAlt, FaTruck } from 'react-icons/fa';

const PoliciesPage = () => {
  const styles = {
    page: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#fff0f5',
      margin: 0,
      padding: '20px',
      color: '#333',
    },
    header: {
      padding: '20px 0',
      textAlign: 'center',
      color: '#e91e63',
      fontSize: '32px',
      fontWeight: '700',
      letterSpacing: '1px',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '25px 30px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
      borderLeft: '6px solid #e91e63',
      transition: 'transform 0.2s ease-in-out',
    },
    cardHover: {
      transform: 'scale(1.02)',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '22px',
      fontWeight: '600',
      color: '#e91e63',
      marginBottom: '15px',
    },
    icon: {
      marginRight: '10px',
    },
    p: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: '#555',
    },
    link: {
      color: '#e91e63',
      textDecoration: 'underline',
    },
    footer: {
      textAlign: 'center',
      fontSize: '14px',
      padding: '30px 10px 10px',
      color: '#888',
    },
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>Our Policies - E-Cosmeticx</header>

      <div style={styles.container}>

        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <FaFileContract style={styles.icon} />
            Terms & Conditions
          </div>
          <p style={styles.p}>
            Welcome to E-Cosmetics! By accessing and using our website, you agree to abide by our terms and conditions.
            All products are intended for personal use only. Unauthorized resale or distribution is prohibited.
            Prices, offers, and availability are subject to change without prior notice. By placing an order,
            you agree to our policies regarding payment, shipping, returns, and refunds.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <FaShieldAlt style={styles.icon} />
            Privacy Policy
          </div>
          <p style={styles.p}>
            Your privacy is important to us. E-Cosmetics collects only the necessary information to process your orders
            and improve your shopping experience. We promise never to sell or share your personal information with third
            parties without your consent. All transactions are secured with end-to-end encryption.
            For more details, please review our full&nbsp;
            <a href="#" style={styles.link}>Privacy Policy</a>.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <FaUndoAlt style={styles.icon} />
            Return & Refund Policy
          </div>
          <p style={styles.p}>
            We want you to love your E-Cosmetics experience! If you are not satisfied with your purchase, you may return
            unopened products within 14 days of delivery for a full refund or exchange. Products must be in their original
            packaging, unused, and accompanied by a valid receipt. Due to hygiene reasons, opened or used cosmetic
            products cannot be returned unless they are defective. Refunds are processed within 7-10 business days after
            we receive the returned item.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.sectionHeader}>
            <FaTruck style={styles.icon} />
            Shipping Policy
          </div>
          <p style={styles.p}>
            E-Cosmetics proudly ships across the country! Orders are processed within 1-2 business days. Delivery typically
            takes 3-7 business days depending on your location. You will receive a tracking number once your order has shipped.
            Please note that delivery times may be affected by holidays or unforeseen courier delays.
            For any urgent concerns, feel free to&nbsp;
            <a href="#" style={styles.link}>contact our support team</a>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PoliciesPage;
