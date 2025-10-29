import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://backend-k59u.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        onClose();
        navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={modalStyles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={modalStyles.input}
          />
          <button type="submit" style={modalStyles.button}>Login</button>
          {error && <p style={modalStyles.error}>{error}</p>}
          <button type="button" onClick={onClose} style={modalStyles.cancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%", padding: 8, margin: "10px 0", borderRadius: 4, border: "1px solid #ccc",
  },
  button: {
    padding: 10, width: "100%", background: "#b71c1c", color: "#fff", border: "none", borderRadius: 4,
  },
  cancel: {
    padding: 8, width: "100%", background: "#eee", color: "#333", marginTop: 8, borderRadius: 4,
  },
  error: {
    color: "crimson", fontSize: 14,
  },
};

export default AdminLoginModal;
