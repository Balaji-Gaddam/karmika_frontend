
//Recent changes of AI
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser(loginDetails));
    if (loginUser.fulfilled.match(response)) {
      localStorage.setItem("token", response.payload.token);
      if (response.payload.status === "success") {
        navigate("/");
      } else {
        setErrorMessage(response.payload.message);
      }
    } else {
      setErrorMessage(response.payload?.message || "Login failed");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='Total_Login'>
      <div className='Login_Fields'>
        <form onSubmit={handleLoginSubmit}>
          <input
            type='text'
            placeholder='Enter email'
            name='email'
            onChange={handleLoginChange}
            value={loginDetails.email}
            required
          />
          <span className='spanInputLogin'>
            <input
              name='password'
              type={showPassword ? "password" : "text"}
              placeholder='Enter Password'
              onChange={handleLoginChange}
              value={loginDetails.password}
              required
            />
            <i
              className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
              onClick={togglePassword}
              style={{ cursor: 'pointer' }}
            ></i>
          </span>
          <input
            type='submit'
            value={loading ? "Logging in..." : "LogIn"}
            style={{ backgroundColor: "#B71C1C", color: "#fff", cursor: "pointer", fontSize: "25px" }}
          />
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>No Account? <Link to="/signUp">SignUp</Link></p>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../authSlice";

// function Login() {
//   const [showPassword, setShowPassword] = useState(true);
//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const loading = useSelector((state) => state.auth?.loading || false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginDetails({
//       ...loginDetails,
//       [name]: value,
//     });
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (!loginDetails.email || !loginDetails.password) {
//       setErrorMessage("Please fill in both fields.");
//       return;
//     }

//     try {
//       const response = await dispatch(
//         loginUser({
//           email: loginDetails.email,
//           password: loginDetails.password,
//         })
//       );

//       if (loginUser.fulfilled.match(response)) {
//         localStorage.setItem("token", response.payload.token);

//         if (response.payload.status === "success") {
//           navigate("/");
//           setLoginDetails({ email: "", password: "" });
//         } else {
//           setErrorMessage(response.payload.message || "Login failed.");
//           localStorage.removeItem("token");
//         }
//       } else {
//         setErrorMessage(response.payload?.message || "Login failed.");
//         localStorage.removeItem("token");
//       }
//     } catch {
//       setErrorMessage("Unable to connect to the server.");
//       localStorage.removeItem("token");
//     }
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="Total_Login">
//       <div className="Login_Title">
//         <h1>Welcome to Karmika Dalam</h1>
//         <h2>LogIn</h2>
//       </div>
//       <div className="Login_Fields">
//         <form onSubmit={handleLoginSubmit}>
//           <input
//             type="text"
//             placeholder="Enter email"
//             name="email"
//             onChange={handleLoginChange}
//             value={loginDetails.email}
//             required
//           />
//           <span className="spanInputLogin">
//             <input
//               name="password"
//               type={showPassword ? "password" : "text"}
//               placeholder="Enter Password"
//               onChange={handleLoginChange}
//               value={loginDetails.password}
//               required
//             />
//             <i
//               className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
//               onClick={toggleShowPassword}
//               style={{ cursor: "pointer" }}
//             ></i>
//           </span>
//           <input
//             type="submit"
//             value={loading ? "Logging in..." : "LogIn"}
//             disabled={loading}
//             style={{
//               backgroundColor: "#B71C1C",
//               color: "#fff",
//               cursor: "pointer",
//               fontSize: "25px",
//             }}
//           />
//         </form>
//         {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//         <p>
//           No Account? <Link to="/signUp">SignUp</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;




// Not updated version of chatgpt

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {useDispatch} from "react-redux"
// import { loginUser } from '../authSlice';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [showPassword, setShowPassword] = useState(true);
//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: ""
//   });

//   const user= useSelector(state=>state.auth.user)
//   // console.log(user)

//   const dispatch= useDispatch()
//   const navigate= useNavigate()
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginDetails({
//       ...loginDetails,
//       [name]: value
//     });
//   }

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response= await dispatch(loginUser({  email: loginDetails.email,password: loginDetails.password }));

//       console.log(response.payload)

      
     
//       localStorage.setItem("token",response.payload.token)
//       if (response.payload.status=="success"){
//         navigate("/")
//         setLoginDetails({
//           email: "",
//           password: ""
//         });
//       }
//       else{
//         setErrorMessage(response.payload.message)
//       }
     
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.data.message);
//       } else if (error.request) {
//         setErrorMessage("No response from the server.");
//       } else {
//         setErrorMessage("Error in setting up the request.");
//       }
//       console.log(error);
//     }
//   }

//   const showPasswords = () => {
//     setShowPassword(!showPassword);
//   }

//   return (
//     <>
//       <div className='Total_Login'>
//         <div className='Login_Title'>
//           <h1>Welcome to Karmika Dalam</h1>
//           <h2>LogIn</h2>
//         </div>
//         <div className='Login_Fields'>
//           <form onSubmit={handleLoginSubmit}>
//             <input
//               type='text'
//               placeholder='Enter email'
//               name='email'
//               onChange={handleLoginChange}
//               value={loginDetails.email}
//               required
//             />
//             <span className='spanInputLogin'>
//               <input
//                 name='password'
//                 type={showPassword ? "password" : "text"}
//                 placeholder='Enter Password'
//                 onChange={handleLoginChange}
//                 value={loginDetails.password}
//                 required
//               />
//               <i
//                 className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
//                 onClick={showPasswords}
//                 style={{ cursor: 'pointer' }}
//               ></i>
//             </span>
//             <input
//               type='submit'
//               value="LogIn"
//               style={{ backgroundColor: "#B71C1C", color: "#ffff", cursor: "pointer", fontSize: "25px" }}
//             />
//           </form>
//           {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//           <p>No Account? <Link to="/signUp">SignUp</Link></p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;




























/* import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Login() {
  const [showPassword, setShowPassword]=useState(true)
  const [loginDetails, setLoginDetails] = useState({
    email:"",
    password:""
  })

  

  const handleLoginChange=(e)=>{
    const {name,value}=e.target;
    setLoginDetails({
      ...loginDetails,
      [name]:value
    })
  }

  const handleLoginSubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("email",loginDetails.email);
    formData.append("password",loginDetails.password);
    try {

      await axios.post("http://localhost:5000/login",formData,{

        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });
      setLoginDetails({
        email:"",
        password:""
      })
      console.log("user logged in successfully");
      window.location.href("/")
    } catch (error) {
      console.log(error)
    }
  }

  const showPasswords=()=>{
    setShowPassword(!showPassword)
}
  return (
    <>
    <div className='Total_Login'>
      <div className='Login_Title'>
          <h1>Welcome to Karmika Dalam</h1>
          <h2>LogIn</h2>
      </div>
      <div className='Login_Fields'>
        <form onSubmit={handleLoginSubmit}>
          <input type='text' placeholder='Enter email' name='email' onChange={handleLoginChange} value={loginDetails.email}/>
          <span className='spanInputLogin'><input name='password' type={showPassword ? "password":"text"} placeholder='Enter Password'  onChange={handleLoginChange} value={loginDetails.password}/><i className={showPassword ? "fa-solid fa-eye-slash":"fa-solid fa-eye"} onClick={showPasswords} style={{cursor:'pointer'}}></i></span>
          <input type='submit' value="LogIn"  style={{backgroundColor:"#B71C1C", color:"#ffff",cursor:"pointer", fontSize:"25px"}}/>
        </form>
          <p>No Account ? <Link to="/signUp">SignUp</Link></p>
      </div>
    </div>
    </>
  )
}

export default Login */