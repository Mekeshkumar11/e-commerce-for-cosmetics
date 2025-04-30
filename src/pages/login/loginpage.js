import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginsignup.css";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:5000/api/login" : "http://localhost:5000/api/signup";

    try {
      const res = await axios.post(url, formData);
      if (isLogin) {
        const { token, user } = res.data;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("Logged in successfully!");
        navigate("/home");
      } else {
        alert("Signed up successfully!");
        navigate("/home");
        setIsLogin(true); // Switch to login mode after signup
      }
    } catch (err) {
      console.error("Signup/Login Error:", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>{isLogin ? "Welcome Back" : "Join Us"}</h2>
        <p>{isLogin ? "Login to continue" : "Create an account"}</p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="toggle" onClick={toggleMode}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
