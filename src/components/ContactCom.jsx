import React, { useState } from "react";
import axios from "axios";

const ContactCom = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const [animateFormOut, setAnimateFormOut] = useState(false);

  // 🧠 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phone = form.phone.trim();
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setStatus({ loading: true, success: false, error: false });
    setAnimateFormOut(true);

    setTimeout(async () => {
      try {
        // ✅ Replace with your backend URL
        const res = await axios.post("https://backend-k59u.onrender.com/api/contact", form);

        if (res.data.success) {
          setStatus({ loading: false, success: true, error: false });
          setForm({ name: "", phone: "", email: "", message: "" });
        } else {
          setStatus({ loading: false, success: false, error: true });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setStatus({ loading: false, success: false, error: true });
      }
    }, 700);
  };

  return (
    <div
      style={{
        background: "url('/background-3.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px 20px 40px",
      }}
    >
      <div style={{ perspective: "1200px", width: "100%", maxWidth: "600px" }}>
        {!status.success ? (
          <form
            onSubmit={handleSubmit}
            className={`form-card ${animateFormOut ? "flip-out" : ""}`}
            style={formCardStyle}
          >
            <h2 style={{ textAlign: "center", color: "#333" }}>Contact Us</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              style={inputStyle}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows="4"
              required
              style={inputStyle}
            ></textarea>

            <button
              type="submit"
              disabled={status.loading}
              style={{
                ...buttonStyle,
                backgroundColor: status.loading ? "#ccc" : "#e63946",
                cursor: status.loading ? "not-allowed" : "pointer",
              }}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>

            {/* 🔔 Show error message if failed */}
            {status.error && (
              <p style={{ color: "red", textAlign: "center" }}>
                ❌ Failed to send message. Try again.
              </p>
            )}
          </form>
        ) : (
          <div style={thankYouStyle}>
            <div style={{ fontSize: "3rem" }}>😊</div>
            <h2 style={{ color: "#333", marginTop: "10px" }}>Thank You!</h2>
            <p style={{ color: "#555", marginTop: "10px", fontSize: "1.1rem" }}>
              Your message has been sent successfully. <br />
              We'll get back to you as soon as possible.
            </p>
          </div>
        )}
      </div>

      {/* ✅ Animation CSS */}
      <style>{`
        .flip-out {
          transform: rotateY(90deg);
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// 🎨 CSS Styles
const formCardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  transformStyle: "preserve-3d",
  transition: "transform 0.7s ease-in-out",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  width: "100%",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#e63946",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "1.1rem",
  cursor: "pointer",
  width: "100%",
};

const thankYouStyle = {
  backgroundColor: "#fff",
  padding: "50px 30px",
  borderRadius: "15px",
  textAlign: "center",
  animation: "fadeIn 1s ease forwards",
  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  transform: "rotateY(0deg)",
};

export default ContactCom;
