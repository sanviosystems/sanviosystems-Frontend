import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 🌀 loader state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // show loader

    const endpoint = isSignUp
      ? "https://backend-k59u.onrender.com/api/admin/register"
      : "https://backend-k59u.onrender.com/api/admin/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (!isSignUp) {
        // ✅ Login success
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        // ✅ Signup success
        alert("Signup successful. Please log in.");
        setIsSignUp(false);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center" }}>
          {isSignUp ? "Admin Sign Up" : "Admin Login"}
        </h2>

        {/* 🌀 Show loader when loading is true */}
        {loading ? (
          <div style={styles.loaderContainer}>
            <div style={styles.loader}></div>
            <p style={{ textAlign: "center", marginTop: "10px" }}>Please wait...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ ...styles.input, paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleEye}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" style={styles.button}>
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
        )}

        {error && <p style={styles.error}>{error}</p>}

        {!loading && (
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
              }}
            >
              {isSignUp ? "Already have an account? Login" : "New admin? Sign up"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f4f4",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    width: "350px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
  toggleEye: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#555",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
  },
  loader: {
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #007bff",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
  },
};

// 🌀 CSS animation
const styleSheet = document.styleSheets[0];
const keyframes =
  "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Login;
