import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

function Update({ updateClick, onClose }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const base = {
    contact: user.contact,
    email: user.email,
  };
  if (user.name) base.name = user.name;
  else base.Username = user.Username;
  if (user.price) base.price = user.price;
  if (user.address) base.address = user.address;

  const [updateDetails, setUpdateDetails] = useState(base);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine userType consistently
      const userType = user.name ? "karmikas" : "users";

      // Step 1: send OTP with proper purpose
      await axios.post(`${API_URL}/api/otp/send-otp`, {
        email: updateDetails.email,
        userType,
        purpose: "profile_update",
      });

      alert(`otp sent to the email ${updateDetails.email}`)

      // Step 2: go to verify page carrying userType & details
      navigate("/verify-otp", {
        state: {
          action: "update",
          data: { ...updateDetails, userType },
        },
      });

      alert("Profile updated successfully")
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP for update");
      console.log(err)
    }
  };

  return (
    <>
      {updateClick && (
        <div className="Total_KarmikaForm">
          <div className="Form_Title">
            <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
            <h1>Hello {user.name ? "Karmika" : "User"},</h1>
          </div>
          <div className="Karmika_Form">
            <form onSubmit={handleSubmit}>
              {user.name ? (
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={updateDetails.name}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  name="Username"
                  placeholder="Enter Name"
                  value={updateDetails.Username}
                  onChange={handleChange}
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={updateDetails.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="contact"
                placeholder="Enter Contact Number"
                value={updateDetails.contact}
                onChange={handleChange}
              />
              {user.price && (
                <input
                  type="text"
                  placeholder="Enter your price per Day"
                  name="price"
                  value={updateDetails.price}
                  onChange={handleChange}
                />
              )}
              {user.address && (
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your Address"
                  value={updateDetails.address}
                  onChange={handleChange}
                />
              )}
              <input
                type="submit"
                value="Update Profile"
                style={{
                  backgroundColor: "#B71C1C",
                  color: "#ffff",
                  cursor: "pointer",
                  fontSize: "25px",
                }}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Update;