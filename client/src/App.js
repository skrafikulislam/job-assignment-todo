import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App = () => {
  return (
    <div className="app-main">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
