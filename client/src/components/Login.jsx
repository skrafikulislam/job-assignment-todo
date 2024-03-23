import React, {useState} from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
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
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          ...inputValue,
        },
       
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        
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
    });
  };
  return (
    <div className="register">
      <h1>Login Page</h1>
     <form onSubmit={handleSubmit}>
     <div className="register-info">
        <input type="email" name="email" placeholder="Your Email" onChange={handleOnChange}/>
        <input type="text" name="password" placeholder="Your Password" onChange={handleOnChange} />
      </div>
      <div className="submit-btn">
        <button type="submit"> Login</button>
      </div>
     </form>
      <div className="login">
        <p>
          Don't have an account <Link to="/">Register Here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;