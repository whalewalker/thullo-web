import React, { useEffect } from "react";
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
import { useAppDispatch } from "./hooks/customHook";
import { getBoards } from "./actions/boardAction";

const App = () => {
  const dispatchFn = useAppDispatch();

  useEffect(() => {
    dispatchFn(getBoards());
  }, [dispatchFn]);
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
          <Route path="board/:boardId" element={<BoardDetail />} />
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<ProfileMain />} />
            <Route path="edit" element={<ProfileEdit />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer limit={1} />
    </>
  );
};
export default App;
