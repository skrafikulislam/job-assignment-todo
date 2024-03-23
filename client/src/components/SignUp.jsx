import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/signup", {
        ...inputValue,
      });
      const { success, message } = data;
      if (success) {
        console.log(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="register">
      <h3>First Create An Account To Use Our To-Do Site</h3>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="register-info">
          <input
            type="text"
            name="username"
            placeholder="Your Name"
            onChange={handleOnChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Your Password"
            onChange={handleOnChange}
          />
        </div>
        <div className="submit-btn">
          <button type="submit"> Register</button>
        </div>
      </form>
      <div className="login">
        <p>
          Already have an account <Link to="/login">Login Here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
