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
        <p style={{ marginTop: "10px" }}>
          <Link to="/forgot-password" style={{ color: "#B71C1C", fontWeight: "bold" }}>
            Forgot Password?
          </Link>
        </p>
        <p>No Account? <Link to="/signUp">SignUp</Link></p>
      </div>
    </div>
  );
}

export default Login;