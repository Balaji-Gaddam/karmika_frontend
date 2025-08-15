
// Changes of the AI

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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // ✅ Don't try to fetch if no token

    dispatch(fetchUser())
      .unwrap()
      .then((res) => {
        console.log("User fetched:", res);
      })
      .catch((err) => {
        console.warn("Backend not available or token invalid. Clearing token.");
        localStorage.removeItem("token"); // ✅ Remove invalid token
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
      </Routes>
    </>
  );
}

export default App;

// import './App.css';
// import { Routes,Route } from 'react-router-dom';
// import TotalHome from './Components/TotalHome';
// import SignUp from './UserAuth/SignUp';
// import Login from "./UserAuth/Login"
// import Account from './Components/Account';
// import Services from './Components/Services';
// import NavBar from './Components/NavBar';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchUser } from './authSlice';

// function App() {
//   const dispatch= useDispatch();

//   console.log(localStorage.getItem("token"))


//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await dispatch(fetchUser({}));
//         console.log("User fetched:", response);
//       } catch (e) {
//         console.error("Error fetching user:", e);
//       }
//     };
  
//     const token = localStorage.getItem("token");
//     console.log("Token from localStorage:", token);
  
//     if (token) {
//       fetch();
//     }
//   }, [dispatch]);
  
//   return (
//     <>
//     <NavBar/>
//     <Routes>
//       <Route path='/' element={<TotalHome/>} />
//       <Route path='/services' element={<Services />}/>
//       <Route path='/account' element={<Account/>}/>
//       <Route  path='/signUp' element={<SignUp/>}/>
//       <Route path='/Login' element={<Login/>} />
//     </Routes>
//     </>
//   );
// }

// export default App;
