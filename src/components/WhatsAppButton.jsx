import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919815901342"; // Apna WhatsApp number yaha likh

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "28px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      <FaWhatsapp />
    </button>
  );
};

export default WhatsAppButton;
