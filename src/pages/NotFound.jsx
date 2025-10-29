import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div
            style={{
            textAlign: "center",
            padding: "80px 20px", 
            }}>
            <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>404</h1>
            <h2 style={{ marginBottom: "10px" }}>Ouch, looks like you found our 404 page</h2>
            <p style={{ marginBottom: "20px" }}>
            Sorry, the page you are looking for does not exist.
            </p>
            <Link
            to="/"
            style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
            }}
            >
            Go Back Home
            </Link>
        </div>
    );
}
export default NotFound;
