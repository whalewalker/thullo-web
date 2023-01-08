import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/user//Dashboard";
import DashboardMain from "./pages/user/DashboardMain";
import Profile from "./pages/user/Profile";
import User from "./pages/user/User";
import ProfileEdit from "./pages/user/ProfileEdit";
import ProfileMain from "./pages/user/ProfileMain";
import ProtectRoute from "./components/ProtectRoute";
import PageNotFound from "./components/PageNotFound";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="forgot-password" element={<ForgotPassword/>}/>
                <Route path="reset-password" element={<ResetPassword/>}/>
                <Route path="user" element={
                    <ProtectRoute><User/></ProtectRoute>}>
                    <Route path="" element={<Dashboard/>}>
                        <Route path="" element={<Navigate to={"dashboard"}/>}/>
                        <Route path="dashboard" element={<DashboardMain/>}/>
                    </Route>
                    <Route path="profile" element={<Profile/>}>
                        <Route path="" element={<ProfileMain/>}/>
                        <Route path="edit" element={<ProfileEdit/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ToastContainer limit={1}/>
        </>
    );
};
export default App;
