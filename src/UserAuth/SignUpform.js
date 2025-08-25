import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

function SignUpform({ userType, onClose, closeForm, closeKarmika }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const [userDetails, setUserDetails] = useState({
    Username: "",
    email: "",
    contact: "",
    image: null,
    password: "",
    confirmPassword: "",
  });

  const [karmikaDetails, setKarmikaDetails] = useState({
    name: "",
    price: "",
    email: "",
    contact: "",
    profileImage: null,
    workType: "",
    address: "",
    aadharImage: null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [karmikaErrors, setKarmikaErrors] = useState({});

  // toggle password
  const showPasswords = () => setShowPassword(!showPassword);
  const showConfirmPasswords = () => setHiddenPassword(!hiddenPassword);

  // handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserDetails({ ...userDetails, image: e.target.files[0] });
  };

  const handleKarmikaChange = (e) => {
    const { name, value } = e.target;
    setKarmikaDetails({ ...karmikaDetails, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setKarmikaDetails((prev) => ({ ...prev, profileImage: file }));
  };

  const handleAadharImageChange = (e) => {
    const file = e.target.files[0];
    setKarmikaDetails((prev) => ({ ...prev, aadharImage: file }));
  };

  // validators
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const validateForm = (details, setErrors, type) => {
    const errs = {};

    if (type === "user") {
      if (!/^[a-zA-Z\s]+$/.test(details.Username)) {
        errs.Username = "Enter valid name";
      }
    } else {
      if (!/^[a-zA-Z\s]+$/.test(details.name)) {
        errs.name = "Enter valid name";
      }
    }

    if (!validateEmail(details.email)) {
      errs.email = "Email must be a valid Gmail address.";
    }

    if (!/^\d{10}$/.test(details.contact)) {
      errs.contact = "Contact must be a 10-digit number.";
    }

    if (details.password !== details.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    if (type === "user" && !details.image) {
      errs.image = "Please upload an image.";
    }

    if (type === "karmika") {
      if (!details.profileImage) errs.profileImage = "Please upload a profile image.";
      if (!details.aadharImage) errs.aadharImage = "Please upload an Aadhar image.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(userDetails, setErrors, "user")) {
      try {
        await axios.post(`${API_URL}/api/otp/send-otp`, {
          email: userDetails.email,
          userType: "users",    
          purpose: "signup",  
        });

        navigate("/verify-otp", {
          state: {
            action: "signup",
            data: { ...userDetails, userType: "users" },
          },
        });
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to send OTP");
      }
    }
  };

  // karmika signup 
  const handleKarmikaSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(karmikaDetails, setKarmikaErrors, "karmika")) {
      try {
        await axios.post(`${API_URL}/api/otp/send-otp`, {
          email: karmikaDetails.email,
          userType: "karmikas", 
          purpose: "signup",      
        });

        navigate("/verify-otp", {
          state: {
            action: "signup",
            data: { ...karmikaDetails, userType: "karmikas" }, 
          },
        });
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to send OTP");
      }
    }
  };

  return (
    <>
      {/* User Signup */}
      {userType === "user" && !closeForm && (
        <div className="Total_UserForm">
          <div className="Form_Title">
            <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
            <h1>Hello User,</h1>
          </div>
          <div className="User_Form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="Username"
                value={userDetails.Username}
                placeholder="Enter Name"
                onChange={handleChange}
              />
              {errors.Username && <p className="error">{errors.Username}</p>}
              <input
                type="email"
                name="email"
                value={userDetails.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="text"
                name="contact"
                value={userDetails.contact}
                placeholder="Enter Contact Number"
                onChange={handleChange}
              />
              {errors.contact && <p className="error">{errors.contact}</p>}
              <input
                className="spanInputFile"
                name="image"
                id="ImageFile"
                type="file"
                onChange={handleFileChange}
              />
              {errors.image && <p className="error">{errors.image}</p>}
              {userDetails.image && <p>Selected Image: {userDetails.image.name}</p>}
              <label htmlFor="ImageFile">
                <i className="fa-solid fa-file-arrow-up"></i> Upload Image
              </label>
              <span className="spanInput">
                <input
                  name="password"
                  type={showPassword ? "password" : "text"}
                  value={userDetails.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                <i
                  className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                  onClick={showPasswords}
                ></i>
              </span>
              <span className="spanInput">
                <input
                  name="confirmPassword"
                  type={hiddenPassword ? "password" : "text"}
                  value={userDetails.confirmPassword}
                  placeholder="Enter Password again"
                  onChange={handleChange}
                />
                <i
                  className={hiddenPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                  onClick={showConfirmPasswords}
                ></i>
              </span>
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              <input
                type="submit"
                value="Sign Up"
                style={{
                  backgroundColor: "#B71C1C",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </form>
          </div>
        </div>
      )}

      {/* Karmika Signup */}
      {userType === "karmika" && !closeKarmika && (
        <div className="Total_KarmikaForm">
          <div className="Form_Title">
            <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
            <h1>Hello Karmika,</h1>
          </div>
          <div className="Karmika_Form">
            <form onSubmit={handleKarmikaSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleKarmikaChange}
                value={karmikaDetails.name}
              />
              {karmikaErrors.name && <p className="error">{karmikaErrors.name}</p>}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleKarmikaChange}
                value={karmikaDetails.email}
              />
              {karmikaErrors.email && <p className="error">{karmikaErrors.email}</p>}
              <input
                type="text"
                name="contact"
                placeholder="Enter Contact Number"
                onChange={handleKarmikaChange}
                value={karmikaDetails.contact}
              />
              {karmikaErrors.contact && <p className="error">{karmikaErrors.contact}</p>}
              <input
                className="spanInputFile"
                id="ProfileImageFile"
                type="file"
                onChange={handleProfileImageChange}
              />
              {karmikaErrors.profileImage && <p className="error">{karmikaErrors.profileImage}</p>}
              {karmikaDetails.profileImage && (
                <p>Selected Profile Image: {karmikaDetails.profileImage.name}</p>
              )}
              <label htmlFor="ProfileImageFile">
                <i className="fa-solid fa-file-arrow-up"></i> Upload Profile Image
              </label>
              <select
                name="workType"
                onChange={handleKarmikaChange}
                value={karmikaDetails.workType}
              >
                <option>Select your type of Work</option>
                <option>electrician</option>
                <option>cleaner</option>
                <option>constructor</option>
                <option>cook</option>
                <option>delivery</option>
                <option>doctor</option>
                <option>gardening</option>
                <option>painter</option>
                <option>plumber</option>
                <option>servant</option>
                <option>Carpenter</option>
                <option>Tech Service (mobile, laptop, TV)</option>
              </select>
              <input
                type="text"
                placeholder="Enter your price per Day"
                name="price"
                value={karmikaDetails.price}
                onChange={handleKarmikaChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Enter your Address"
                onChange={handleKarmikaChange}
                value={karmikaDetails.address}
              />
              {karmikaErrors.address && <p className="error">{karmikaErrors.address}</p>}
              <input
                className="spanInputFile"
                id="AadharImageFile"
                type="file"
                onChange={handleAadharImageChange}
              />
              {karmikaErrors.aadharImage && <p className="error">{karmikaErrors.aadharImage}</p>}
              {karmikaDetails.aadharImage && (
                <p>Selected Aadhar Image: {karmikaDetails.aadharImage.name}</p>
              )}
              <label htmlFor="AadharImageFile">
                <i className="fa-solid fa-file-arrow-up"></i> Upload Aadhar Image
              </label>
              <span className="spanInput">
                <input
                  name="password"
                  type={showPassword ? "password" : "text"}
                  placeholder="Enter Password"
                  onChange={handleKarmikaChange}
                  value={karmikaDetails.password}
                />
                <i
                  className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                  onClick={showPasswords}
                ></i>
              </span>
              <span className="spanInput">
                <input
                  name="confirmPassword"
                  type={hiddenPassword ? "password" : "text"}
                  placeholder="Enter Password again"
                  onChange={handleKarmikaChange}
                  value={karmikaDetails.confirmPassword}
                />
                <i
                  className={hiddenPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                  onClick={showConfirmPasswords}
                ></i>
              </span>
              {karmikaErrors.confirmPassword && (
                <p className="error">{karmikaErrors.confirmPassword}</p>
              )}
              <input
                type="submit"
                value="Sign Up"
                style={{
                  backgroundColor: "#B71C1C",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpform;
