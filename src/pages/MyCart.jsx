// src/pages/MyCart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart + listen for updates
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(stored);
    };

    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  // + / - quantity update
  const updateQuantity = (id, delta) => {
    const updatedCart = cart
      .map(item =>
        item._id === id
          ? { ...item, quantity: (item.quantity || 1) + delta }
          : item
      )
      .filter(item => item.quantity > 0); // quantity 0 se remove

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); // update badge
  };

  // Remove product
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); // update badge
  };

  // Calculate total price with offer
  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.offer
        ? item.price - (item.price * item.offer) / 100
        : item.price;
      return sum + price * (item.quantity || 1);
    }, 0);
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h2>Your Cart is Empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "120px", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 My Cart</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cart.map((item) => {
          const discountedPrice = item.offer
            ? (item.price - (item.price * item.offer) / 100).toFixed(2)
            : item.price;
          return (
            <div
              key={item._id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  style={{ width: "100px", height: "100px", objectFit: "contain", borderRadius: "8px" }}
                />
                <div>
                  <h3 style={{ marginBottom: "5px" }}>{item.name}</h3>
                  <p style={{ margin: "5px 0" }}>
                    ₹{discountedPrice} {item.offer && <span style={{ color: 'green' }}>({item.offer}% OFF)</span>}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                    <button onClick={() => updateQuantity(item._id, -1)} style={qtyBtn}>−</button>
                    <span style={{ fontWeight: "600" }}>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} style={qtyBtn}>+</button>
                  </div>
                  <p style={{ color: "#555", marginTop: "5px" }}>
                    Total: ₹{(discountedPrice * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div
        style={{
          marginTop: "30px",
          textAlign: "right",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Total: ₹{getTotal().toFixed(2)}
        <button
          onClick={() => navigate("/buy-now", { state: { cart } })}
          style={{
            marginLeft: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

// Quantity button style
const qtyBtn = {
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  width: "28px",
  height: "28px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};

export default MyCart;
