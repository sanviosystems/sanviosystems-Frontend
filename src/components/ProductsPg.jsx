import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsPg = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pin: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      // .get("https://sanvio-backend-1.onrender.com/api/products")
      .get("https://sanviosystem-backend-nsfy.onrender.com")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Product added to cart");
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = () => {
    const { name, mobile, email, address, pin } = formData;
    if (!name || !mobile || !email || !address || !pin) {
      alert("Please fill in all fields");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ ...selectedProduct, userDetails: formData });
    localStorage.setItem("orders", JSON.stringify(orders));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...selectedProduct, userDetails: formData });
    localStorage.setItem("cart", JSON.stringify(cart));

    setShowForm(false);
    setFormData({ name: "", mobile: "", email: "", address: "", pin: "" });

    alert("✅ Thank you! Your details have been submitted successfully.");
    navigate("/buy-now");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading products...</h2>
        <img
          src="https://i.gifer.com/ZZ5H.gif"
          alt="Loading..."
          width="80"
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Products and Services</h2>
      <div style={styles.cardGrid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img
              src={`${product.imageUrl}?q_auto&f_auto&w_400`}
              alt="Product"
              style={styles.image}
              loading="lazy"
            />
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>₹ {product.price}</p>
            <div style={styles.buttonRow}>
              <button style={styles.cartBtn} onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button style={styles.buyBtn} onClick={() => handleBuyNow(product)}>Buy Now</button>

            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeading}>Enter Your Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              maxLength="10"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="PIN Code"
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
              style={styles.input}
            />
            <div style={styles.buttonRow}>
              <button onClick={handleFormSubmit} style={styles.cartBtn}>Submit</button>
              <button onClick={() => setShowForm(false)} style={styles.buyBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "280px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "15px",
    marginBottom: "15px",
    transition: "transform 0.3s ease",
  },
  description: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#444",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: "10px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "15px",
  },
  cartBtn: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    flex: 1,
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  buyBtn: {
    backgroundColor: "#20c997",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    flex: 1,
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-in-out",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "left",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  modalHeading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "15px",
  },
};

export default ProductsPg;
