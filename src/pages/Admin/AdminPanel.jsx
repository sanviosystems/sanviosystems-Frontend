import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import Dashboard from "./Dashboard";
import Contact from "./Contact";
import UploadProducts from "./UploadProducts";
import AllProducts from "./AllProducts";
import Orders from "./Orders";
import AdminContact from "./AdminContact";
import "./AdminPanel.css";



const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const goHome = () => navigate("/");

  // 🅰 Sort alphabetically
  const menuItems = [
    { name: "All Products", path: "/admin/all-products" },
    { name: "Contact", path: "/admin/contact" },
    { name: "Dashboard", path: "/admin" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Upload Products", path: "/admin/upload-products" },
  ].sort((a, b) => a.name.localeCompare(b.name)); // alphabetical order

  return (
    <div className="admin-panel-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Area */}
      <main className="admin-main-content">
        {/* Top Bar */}
        <div className="admin-topbar">
          {/* Sidebar Toggle (Mobile only) */}
          <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          <h1 className="admin-heading">Welcome, Admin</h1>

          <button className="go-home-btn" onClick={goHome}>
            <FaHome /> <span>Home</span>
          </button>
        </div>

        {/* Content */}
        <div className="admin-content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="contact" element={<Contact/>}/>
            <Route path="contact" element={<AdminContact />} />
            <Route path="orders" element={<Orders />} />
            <Route path="upload-products" element={<UploadProducts />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
