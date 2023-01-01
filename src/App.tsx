import React from "react";
import {Routes, Route} from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./pages/auth/ResetPassword";


const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
            </Routes>
            <ToastContainer
                limit={1}
            />
        </div>
    );
};

export default App;
