import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt, faMapMarkerAlt, faMobile } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.column}>
          <h3 style={styles.heading}>Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000.902125912212!2d75.8449!3d30.9117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a8330dd74fd67%3A0x5f7c6f3b4e4e2a0d!2s353%2F14%2F1%2C%20Dr%20Hira%20Singh%20Road%2C%20Near%20Ghumar%20Mandi%2C%20Civil%20Lines%2C%20Ludhiana%2C%20Punjab%20141001!5e0!3m2!1sen!2sin!4v1632939169074!5m2!1sen!2sin"
            style={styles.map}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>Quick Links</h3>
          <a href="/" style={styles.link}>Home</a>
          <a href="/about" style={styles.link}>About</a>
          <a href="/products" style={styles.link}>Products</a>
          <a href="/blogs" style={styles.link}>Blogs</a>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>Policies</h3>
          <a href="/TermsAndConditions" style={styles.link}>Terms & Conditions</a>
          <a href="/ContactAndSupportPolicy" style={styles.link}>Contact & Support Policy</a>
          <a href="/PrivacyPolicy" style={styles.link}>Privacy Policy</a>
          <a href="/RefundsANDReturnPolicy" style={styles.link}>Refunds & Return Policy</a>
          <a href="/SustainabilityPolicy" style={styles.link}>Sustainability Policy</a>
          <a href="/login" style={styles.link}>My Account</a>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>Contact</h3>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.contactIcon} />
            353/14/1, Dr Hira Singh Road, Ludhiana, Punjab 141001
          </p>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.contactIcon} />
            sanviosystems@gmail.com
          </p>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faPhoneAlt} style={styles.contactIcon} />
            +0161 5057224
          </p>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faMobile} style={styles.contactIcon} />
            9815901342 , 8288032068 , 9914011660
          </p>
        </div>
      </div>

      <div style={styles.copyright}>
        <p>© 2025 Sanvio Systems. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Responsive CSS in JS
const styles = {
  footer: {
    backgroundColor: "rgb(183, 28, 28)",
    color: "#ecf0f1",
    padding: "20px 0 10px",
    fontFamily: "Arial, sans-serif"
  },
  footerContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "10px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  column: {
    flex: "1 1 250px",
    margin: "15px",
    minWidth: "230px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffeb3b",
    marginBottom: "10px",
    borderBottom: "2px solid #ffeb3b",
    paddingBottom: "5px"
  },
  link: {
    display: "block",
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "16px",
    margin: "6px 0",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    margin: "10px 0",
    fontSize: "15px",
    lineHeight: "1.4"
  },
  contactIcon: {
    marginRight: "10px",
    marginTop: "3px",
    fontSize: "16px",
    color: "#ffeb3b",
  },
  map: {
    width: "100%",
    height: "200px",
    border: "none",
    borderRadius: "6px",
  },
  copyright: {
    backgroundColor: "rgb(211, 97, 96)",
    textAlign: "center",
    padding: "8px",
    fontSize: "13px",
    marginTop: "10px"
  },
};

export default Footer;
