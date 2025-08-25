// src/UserAuth/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("users");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${API_URL}/api/otp/send-otp`, {
        email,
        userType,
        purpose: "password_reset",
      });

      navigate("/verify-otp", {
        state: {
          action: "reset",
          data: { email, userType },
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="Total_Login">
      <div className="Login_Fields">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="users">User</option>
            <option value="karmikas">Karmika</option>
          </select>

          <input
            type="submit"
            value="Send OTP"
            style={{
              backgroundColor: "#B71C1C",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </form>
        {error && <p style={{ color: "#fff" }}>{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
