import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Rating stars function
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={"full" + i} style={{ color: "#f5c518", fontSize: "18px" }}>★</span>
        ))}
        {halfStar && <span style={{ color: "#f5c518", fontSize: "18px" }}>☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={"empty" + i} style={{ color: "#ccc", fontSize: "18px" }}>★</span>
        ))}
        <span style={{ marginLeft: "8px", color: "#666", fontWeight: "600" }}>
          {rating.toFixed(1)} / 5
        </span>
      </div>
    );
  };

  // Back button handler
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else if (product?.category) {
      navigate(`/category/${product.category}`); // redirect to category page if direct link
    } else {
      navigate("/"); // fallback home
    }
  };

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Product Not Found</h2>
        <button
          onClick={handleBack}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,123,255,0.4)",
            transition: "background-color 0.3s ease",
          }}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "120px auto 50px", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Back Button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleBack}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          ← Back
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
        {/* Image Gallery */}
        <div style={{ flex: "1 1 450px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "100%", maxWidth: "450px", height: "450px", borderRadius: "15px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <img
              src={product.images[selectedImageIndex]}
              alt={`${product.name} - image ${selectedImageIndex + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", overflowX: "auto", gap: "12px", width: "100%", maxWidth: "450px", paddingBottom: "5px" }}>
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                onClick={() => setSelectedImageIndex(idx)}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: selectedImageIndex === idx ? "3px solid #007bff" : "2px solid transparent",
                  boxShadow: selectedImageIndex === idx ? "0 0 8px #007bff" : "0 1px 4px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "25px" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", fontWeight: "700", color: "#222" }}>
              {product.name}
            </h1>

            <p style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "15px" }}>
              {product.offer ? (
                <>
                  <span style={{ color: "#007bff", marginRight: "10px" }}>
                    ₹{(product.price - (product.price * product.offer) / 100).toFixed(2)}
                  </span>
                  <span style={{ textDecoration: "line-through", color: "#888" }}>
                    ₹{product.price}
                  </span>
                </>
              ) : (
                <span style={{ color: "#007bff" }}>₹{product.price}</span>
              )}
            </p>

            {product.rating !== undefined && renderStars(product.rating)}

            <p style={{ fontSize: "1rem", fontWeight: "600", color: "#555", marginBottom: "10px" }}>
              Category: <span style={{ color: "#333" }}>{product.category}</span>
            </p>

            <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#666" }}>
              {product.description || "No description provided."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <button
              onClick={() => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingIndex = cart.findIndex((item) => item._id === product._id);
                if (existingIndex !== -1) {
                  cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
                } else {
                  cart.push({ ...product, quantity: 1 });
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                navigate("/my-cart");
              }}
              style={{
                flex: 1,
                padding: "14px 0",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 6px 15px rgba(236, 168, 20, 0.4)",
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/buy-now", { state: { cart: [{ ...product, quantity: 1 }] } })}
              style={{
                flex: 1,
                padding: "14px 0",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 6px 15px rgba(0,123,255,0.4)",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
