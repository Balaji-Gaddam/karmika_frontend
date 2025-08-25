// src/services/authService.js
import axios from "axios";
import { API_URL } from "../config";

// Create axios instance for cleaner code
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========== AUTH APIs ==========

// Signup (User)
export const signupUser = (formData) =>
  axios.post(`${API_URL}/api/signup`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Signup (Karmika)
export const signupKarmika = (formData) =>
  axios.post(`${API_URL}/api/karmika/signup`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Login
export const login = (data) => api.post("/login", data);

// OTP Verify (common for user/karmika)
export const verifyOtp = (data) => api.post("/verify-otp", data);

// Resend OTP
export const resendOtp = (email) => api.post("/resend-otp", { email });

// Forgot password (send OTP)
export const forgotPassword = (email) =>
  api.post("/forgot-password", { email });

// Reset password
export const resetPassword = (data) => api.post("/reset-password", data);

// Update Profile (after OTP)
export const updateUserProfile = (data, token) =>
  api.put("/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Upload Photo separately
export const updatePhoto = (formData, token) =>
  axios.put(`${API_URL}/api/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
