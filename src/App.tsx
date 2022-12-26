import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/auth/SignUp";
import Login from "./Pages/auth/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
