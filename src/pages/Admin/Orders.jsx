import React, { useEffect, useState } from "react";
import "./Orders.css";  // CSS file import karo

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("https://backend-k59u.onrender.com/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    setLoading(true);
    try {
      const res = await fetch(`https://backend-k59u.onrender.com/api/orders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Order deleted successfully!");
        setOrders((prev) => prev.filter((order) => order._id !== id));
      } else {
        alert("❌ Failed to delete order.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("⚠️ Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>No Orders Yet 🛒</h2>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>📦 Customer Orders</h2>
      {loading && <p className="orders-loading">Processing...</p>}

      {orders.map((order, index) => (
        <div key={order._id} className="order-card">
          {/* Order Header with flex */}
          <div className="order-header">
            <h3>Order #{index + 1}</h3>
            <p><strong>Name:</strong> {order.fullName}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Mobile:</strong> {order.mobile}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
             <p><strong>Txn ID:</strong> {order.transactionId}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          </div>

          {/* Products */}
          <h4>🛍️ Products:</h4>
          <div className="products-list">
            {order.cart.map((item) => (
              <div key={item._id} className="product-item">
                <img
                  src={item.images?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h5>{item.name}</h5>
                  <p>Qty: {item.quantity || 1}</p>
                  <p className="product-price">₹{item.price * (item.quantity || 1)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer with date and delete button */}
          <div className="order-footer">
            <p className="order-date">Placed on: {formatDate(order.createdAt)}</p>
            <button
              className="delete-btn"
              onClick={() => deleteOrder(order._id)}
              disabled={loading}
            >
              🗑️ Delete Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
