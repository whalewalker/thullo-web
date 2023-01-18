import React from "react";
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/SignUp"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/auth/ResetPassword"));

const publicRoutes = [
    {
        path: "/login",
        component: Login
    },

    {
        path: "/sign-up",
        component: Register
    },

    {
        path: "/forgot-password",
        component: ForgetPassword
    },

    {
        path: "/reset-password",
        component: ResetPassword
    },

];

export default publicRoutes;