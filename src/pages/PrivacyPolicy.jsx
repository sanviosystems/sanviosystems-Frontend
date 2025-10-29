import React from "react";

const PrivacyPolicy = () => {
    return (
        <>
            <div style={{
                padding: "30px 20px",
                marginTop: "80px",
                backgroundColor: "#ffffff",
                color: "#000000",
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: "1.6",
                fontFamily: "Arial, sans-serif"
            }}>
                <h1 style={{
                    fontSize: "28px",
                    marginBottom: "20px",
                    color: "#b71c1c",
                    borderBottom: "2px solid #b71c1c",
                    paddingBottom: "8px"
                }}>
                    Privacy Policy – Sanvio Systems
                </h1>

                <p>
                    At Sanvio Systems, we value the privacy of our customers and business partners.
                    This Privacy Policy outlines how we collect, use, and protect your personal information
                    when you interact with us, whether through inquiries, purchases, or service requests.
                </p>

                <h3 style={{ marginTop: "20px", color: "#444" }}>Information We May Collect</h3>
                <ul>
                    <li>Your name and business name</li>
                    <li>Contact details (phone number, email address, postal address)</li>
                    <li>Purchase and service history</li>
                    <li>Communication records (calls, emails, WhatsApp messages)</li>
                </ul>
                <p><strong>We do not collect or store sensitive information.</strong></p>

                <h3 style={{ marginTop: "20px", color: "#444" }}>How We Use Your Information</h3>
                <p>Customer information is used only for:</p>
                <ul>
                    <li>Responding to inquiries and service requests</li>
                    <li>Processing orders and deliveries</li>
                    <li>Invoicing and payment coordination</li>
                    <li>Providing after-sales support and updates</li>
                    <li>Sharing relevant product or service information (only with consent)</li>
                </ul>

                <h3 style={{ marginTop: "20px", color: "#444" }}>🔒 Data Security</h3>
                <ul>
                    <li>Data is stored in secure systems with restricted access</li>
                    <li>Communications are conducted through trusted platforms</li>
                    <li>Only authorized personnel access your data</li>
                </ul>
                <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

                <h3 style={{ marginTop: "20px", color: "#444" }}>📧 Communication Preferences</h3>
                <p>You may receive updates or promotional messages if:</p>
                <ul>
                    <li>You have purchased from us or shown interest in our products</li>
                    <li>You have opted in via WhatsApp, email, or online platforms</li>
                </ul>
                <p>You can opt out at any time by replying <strong>"Unsubscribe"</strong> or contacting us directly.</p>

                <h3 style={{ marginTop: "20px", color: "#444" }}>Your Rights</h3>
                <p>At any time, you can request to:</p>
                <ul>
                    <li>Review the personal data we have about you</li>
                    <li>Update or correct your information</li>
                    <li>Ask us to delete your records (subject to legal and accounting obligations)</li>
                </ul>

                <h3 style={{ marginTop: "20px", color: "#444" }}>📞 Contact Us</h3>
                <p>
                    <strong>Sanvio Systems</strong><br />
                    📍 353/14/1 Dr Hira Singh Road, Near Ghumar Mandi, Civil Lines, Ludhiana – 141001<br />
                    📞 +91 98159 01342, 0161-5057224<br />
                    ✉ sanviosystems@gmail.com<br />
                    🌐 www.sanviosystems.com
                </p>

                <p style={{ marginTop: "30px", fontStyle: "italic" }}>
                    <strong>Updated Jan 2025</strong>
                </p>
            </div>
        </>
    );
};

export default PrivacyPolicy;
