import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/PageNotFound";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectRoute from "./components/ProtectRoute";
import User from "./pages/user/User";
import DashboardMain from "./pages/user/DashboardMain";
import BoardDetail from "./pages/user/BoardDetail";
import Profile from "./pages/user/Profile";
import ProfileMain from "./pages/user/ProfileMain";
import ProfileEdit from "./pages/user/ProfileEdit";
import OauthRedirectHandler from "./pages/auth/OauthRedirectHandler";
import Hello from "./components/Hello";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/user/dashboard"} />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="user"
          element={
            <ProtectRoute>
              <User />
            </ProtectRoute>
          }
        >
          <Route path="dashboard" element={<DashboardMain />} />
          <Route path="board/:boardTag" element={<Hello />} />
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<ProfileMain />} />
            <Route path="edit" element={<ProfileEdit />} />
          </Route>
        </Route>
          <Route path="oauth2/redirect" element={<OauthRedirectHandler />} />
          <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer limit={1} autoClose={2000} />
    </>
  );
};
export default App;
