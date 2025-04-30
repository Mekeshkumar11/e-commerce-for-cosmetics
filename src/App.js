import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductPage from "./components/ProductCard"; 
import { ImageSlider, DiamondCollage } from "./components/home";
import LoginSignup from "./pages/login/loginpage";
import HelpPage from "./pages/help/helpPage";
import GiftCardPage from './pages/giftcard/GiftCardPage';
import Footer from './pages/Footer/Footer';
import WishlistPage from './pages/Wishlist/Wishlist';
import CartPage from './pages/Cart/cartPage';
import PoliciesPage from './pages/Policy/Policypage';
import OrderPage from './pages/Orders/orderpage';
import AboutPage from './pages/About/aboutpage';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";
  
  const HomePage = () => (
    <div>
      <ImageSlider />
      <DiamondCollage />
      {/* Add more homepage content here if needed */}
    </div>
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/help" element = {<HelpPage/>} />
        <Route path="/giftcard" element = {<GiftCardPage/>} />
        <Route path="/Wishlist" element = {<WishlistPage/>} />
        <Route path="/cart" element = {<CartPage/>} />
        <Route path="/orders" element = {<OrderPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/policypage" element = {<PoliciesPage/>} />
        <Route path="/face/cleansing/:category" element={<ProductPage />} />
        <Route path="/face/moisturizing/:category" element={<ProductPage />} />
        <Route path="/body/bodycare/:category" element={<ProductPage />} />
      </Routes>
      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;
