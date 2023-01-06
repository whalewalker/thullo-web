import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/user//Dashboard";
import DashboardMain from "./pages/user/DashboardMain";
import Profile from "./pages/user/Profile";
import User from "./pages/user/User";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ForgotPassword />} />
        <Route path="/user" element={<User />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Navigate to={"dashboard"} />} />
            <Route path="dashboard" element={<DashboardMain />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer limit={1} />
    </div>
  );
};

export default App;
