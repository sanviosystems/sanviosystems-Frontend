import React, { useState } from "react";

const ForgotPassword = () => {
    const [newPassword, setNewPassword] = useState("");

    const handleReset = (e) => {
        e.preventDefault();
        // abhi ke liye password localStorage me update kar dete hai
        localStorage.setItem("adminPassword", newPassword);
        alert("Password Reset Successfully!");
    };

    return (
        <div className="login-container">
            <h2>Reset Admin Password</h2>
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
