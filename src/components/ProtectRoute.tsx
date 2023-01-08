import React from 'react';
import {ACCESS_TOKEN} from "../utils/constants";
import {Navigate, Outlet} from "react-router-dom";

const ProtectRoute: React.FC<any> = ({children, redirectPath="/login"}) => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) return children ? children : <Outlet/>
    else return <Navigate to={redirectPath}/>
};

export default ProtectRoute;