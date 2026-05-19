// src/pages/BuyNow.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 Loader state

  const updateQuantity = (id, delta) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: (item.quantity || 1) + delta }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const finalPrice = item.offer
        ? item.price - (item.price * item.offer) / 100
        : item.price;
      return sum + finalPrice * (item.quantity || 1);
    }, 0);
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h2>No items found in your cart 🛒</h2>
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
    <div
      style={{
        marginTop: "120px",
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      {/* LEFT - Order Summary */}
      <div style={{ flex: "1.5", minWidth: "320px" }}>
        <h2>🛍️ Order Summary</h2>
        {cart.map((item) => {
          const discountedPrice = item.offer
            ? item.price - (item.price * item.offer) / 100
            : item.price;
          return (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>
                  ₹{discountedPrice}{" "}
                  {item.offer && (
                    <span style={{ color: "green" }}>
                      ({item.offer}% OFF)
                    </span>
                  )}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    style={qtyBtn}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: "600" }}>
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    style={qtyBtn}
                  >
                    +
                  </button>
                </div>
                <p style={{ color: "#555", marginTop: "6px" }}>
                  Total: ₹{discountedPrice * (item.quantity || 1)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT - Shipping Form */}
      <div
        style={{
          flex: "1",
          minWidth: "320px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#fafafa",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Price Details</h3>
        <p>Items: {cart.length}</p>
        <p>Total Amount: ₹{getTotal()}</p>
        <hr />

        <h3>Shipping Information</h3>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true); // 🔹 Start loader

            const formData = new FormData(e.target);

            const orderDetails = {
              fullName: formData.get("fullName"),
              address: formData.get("address"),
              mobile: formData.get("mobile"),
              email: formData.get("email"),
              paymentMethod,
              transactionId: paymentMethod === "Online" ? transactionId : null,
              cart,
              totalAmount: getTotal(),
            };

            try {
              const res = await fetch(
                "https://backend-k59u.onrender.com/api/orders",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(orderDetails),
                }
              );

              const data = await res.json();

              if (res.ok) {
                alert("✅ Order placed successfully!");
                localStorage.removeItem("cart");
                navigate("/Products");
              } else {
                alert("❌ Failed to place order: " + data.message);
              }
            } catch (error) {
              console.error(error);
              alert("⚠️ Something went wrong!");
            } finally {
              setLoading(false); // 🔹 Stop loader
            }
          }}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={inputStyle}
          />

          <div>
            <h4>Payment Method:</h4>
            <label style={radioLabel}>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label style={radioLabel}>
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay Online
            </label>
          </div>

          {paymentMethod === "Online" && (
            <div
              style={{
                marginTop: "15px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                background: "#fff",
              }}
            >
              <h4>Scan QR to Pay</h4>
              <img
                src="/UPI.jpeg"
                alt="QR Code"
                style={{
                  width: "180px",
                  height: "180px",
                  display: "block",
                  margin: "10px auto",
                }}
              />
              <p>
                <strong>UPI ID:</strong>{" "}
                <span style={{ color: "#007bff" }}>8288032068@okbizicici</span>
              </p>
              <p>
                <strong>Mobile No:</strong> +91 9815901342
              </p>

              <input
                type="text"
                placeholder="UPI Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                style={{ ...inputStyle, marginTop: "10px" }}
              />
            </div>
          )}

          {/* 🔹 Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: loading ? "#ccc" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <div
                style={{
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </div>

      {/* Loader Animation */}
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
};

// Styles
const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
};

const radioLabel = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "8px",
  fontSize: "15px",
};

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

export default BuyNow;
