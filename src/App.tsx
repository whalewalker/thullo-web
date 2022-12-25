import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/auth/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
