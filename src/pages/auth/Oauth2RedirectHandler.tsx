import {useEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {ACCESS_TOKEN} from "../../utils/constants";
import {extractMessage, toastError} from "../../utils/helperFn";


const Oauth2RedirectHandler = () => {
    const location = useLocation();

    // @ts-ignore
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        const error = queryParams.get("error");


        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
        } else {
            toastError(extractMessage(error));
            return <Navigate to="/login"/>;
        }
    }, [location.search]);
    return <Navigate to="/user/profile"/>;
};
export default Oauth2RedirectHandler;