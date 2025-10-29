import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CardsDis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>No Product Found</h2>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>⬅ Go Back</button>
      <div style={styles.productCard}>
        <img src={product.img} alt={product.brand} style={styles.image} />
        <h2>{product.brand} - {product.model}</h2>
        <p>Price: ₹{product.price}</p>
        <p>Description: {product.description || "No Description Available"}</p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  backButton: {
    background: "#ff5733",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },
  productCard: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    background: "#fff",
    maxWidth: "400px",
    margin: "auto",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "10px",
  },
};

export default CardsDis;
