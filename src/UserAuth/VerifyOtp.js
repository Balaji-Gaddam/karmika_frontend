// src/UserAuth/VerifyOtp.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { action, data } = location.state || {};


    const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (action === "signup") {
        const formData = new FormData();

        if (data.userType === "users") {
          formData.append("Username", data.Username);
          formData.append("email", data.email);
          formData.append("contact", data.contact);
          formData.append("password", data.password);
          formData.append("otpCode", otp);  
          if (data.image instanceof File) {
            formData.append("image", data.image);
          }
        } else {
          // karmika signup
          Object.keys(data).forEach((key) => {
            if (data[key]) formData.append(key, data[key]);
          });
          formData.append("otpCode", otp);
        }

        const endpoint =
          data.userType === "users"
            ? `${API_URL}/api/signup`
            : `${API_URL}/api/karmika/signup`;

        await axios.post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        navigate("/login");
      }

      else if (action === "update") {
        // Update profile → backend will verify OTP
        const payload = {
          email: data.email.toLowerCase(),
          otpCode: otp,
          userType: data.type === "user" ? "users" : "karmikas", // ✅ must match schema
          purpose: "profile_update",
          ...data,
        };

        await axios.patch(`${API_URL}/api/me`, payload, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        navigate("/account");
      }

      else if(action === "reset"){
        navigate("/reset-password", {
          state: { email: data.email, userType: data.userType, otpCode: otp },
        });
      }
      else {
        navigate("/login");
      }

    } 
    catch (err) {
      setError(err.response?.data?.message || "Signup failed after OTP");
    }
  };

  return (
    <div className="Total_Login">
      <div className="Login_Fields">
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Verify OTP"
            style={{
              backgroundColor: "#B71C1C",
              color: "#fff",
              cursor: "pointer",
              fontSize: "25px",
            }}
          />
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default VerifyOtp;


