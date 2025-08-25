// src/UserAuth/ResetPassword.js
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, userType, otpCode } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/password/reset`, {
        email,
        userType,
        otpCode,
        newPassword: password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="Total_Login">
      <div className="Login_Fields">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Reset Password"
            style={{
              backgroundColor: "#B71C1C",
              color: "#fff",
              fontSize: "20px",
            }}
          />
        </form>
        {error && <p style={{ color: "#fff" }}>{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
