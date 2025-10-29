import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [messages, setMessages] = useState([]);

  // 🔄 Fetch all contact messages
  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://backend-k59u.onrender.com/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🗑️ Delete message handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await axios.delete(`https://backend-k59u.onrender.comapi/contact/${id}`);
      if (res.data.success) {
        // Filter out deleted message from local state
        setMessages(messages.filter((msg) => msg._id !== id));
        alert("Message deleted successfully!");
      } else {
        alert("Failed to delete message.");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Server error while deleting.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📬 Contact Messages</h2>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th> {/* 👈 new column */}
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.phone}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    style={{
                      backgroundColor: "#e63946",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contact;
