import "./App.css";
import { Routes, Route } from "react-router-dom";
import TotalHome from "./Components/TotalHome";
import SignUp from "./UserAuth/SignUp";
import Login from "./UserAuth/Login";
import Account from "./Components/Account";
import Services from "./Components/Services";
import NavBar from "./Components/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./authSlice";

import ForgotPassword from "./UserAuth/ForgotPassword";
import ResetPassword from "./UserAuth/ResetPassword";

import VerifyOtp from "./UserAuth/VerifyOtp";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; 
    dispatch(fetchUser())
      .unwrap()
      .then((res) => {
        console.log("User fetched:", res);
      })
      .catch((err) => {
        console.warn("Backend not available or token invalid. Clearing token.");
        localStorage.removeItem("token"); 
      });
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<TotalHome />} />
        <Route path="/services" element={<Services />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;