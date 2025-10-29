import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.jpg';
import { FaShoppingCart, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // ✅ cart count state
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCartClick = () => {
    navigate('/my-cart');
  };

  // ✅ Update cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCartCount(); // first load pe check karo

    // ✅ Custom event listener jab bhi cart update ho
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <img src={logo} alt="logo" className="logo-img" />
            SANVIO SYSTEMS
          </a>

          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="/" className="nav-item">Home</a>
            <a href="/about" className="nav-item">About</a>
            <a href="/Products" className="nav-item">Products</a>
            <a href="/blogs" className="nav-item">Blogs</a>
            <a href="/contact" className="nav-item">Contact</a>
          </div>

          <div className="nav-top-icons">
            {/* Cart Click with badge */}
            <div className="cart-icon-wrapper" onClick={handleCartClick}>
              <FaShoppingCart className="nav-icon" style={{ cursor: 'pointer' }} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>

            {/* Social Icons */}
            <div className="social-icons">
              <a href="https://www.facebook.com/SanvioSystems1" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
              </a>
              <a href="https://www.instagram.com/sanvio_systems/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://x.com/sanviosystems" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
              </a>
              <a href="https://www.youtube.com/@sanviosystems_official" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="social-icon" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="menu-icon" onClick={toggleMenu}>
              <div style={{ fontSize: '30px', cursor: 'pointer' }}>
                {menuOpen ? '✖' : '☰'}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && <div className="overlay active" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
