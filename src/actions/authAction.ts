import {authAction} from "../slice/authSlice";
import {
    forgetPasswordHandler,
    loginHandler,
    registerHandler,
    resetPasswordHandler,
    verifyUserHandler
} from "../services/authService";
import {extractErrorMessage} from "../utils/helperFn";
import {toast} from "react-toastify";
import {AiFillCheckCircle} from "react-icons/ai"


export const login = (data: {}, callbackFn: Function) => {
    return async (dispatch: Function) => {
        dispatch(authAction.setIsLoading(true));
        try {
            const response: any = await loginHandler(data);
            localStorage.setItem("AccessToken", response.data.data.jwtToken)

            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setData(response.data))
            callbackFn();
        } catch (err) {
            console.log(err);
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setError(true))
            dispatch(authAction.setErrorMsg(extractErrorMessage(err)));
        }
    }
}

export const register = (data: {}, callbackFn: Function) => {
    return async (dispatch: Function) => {
        dispatch(authAction.setIsLoading(true));

        try {
            const response: any = await registerHandler(data);
            const token: string = response.data["_links"]["user-verification"]["href"].split("=")[1];

            const verificationResponse: any = await verifyUserHandler(token);
            dispatch(authAction.setIsLoading(false));
            toast.success(verificationResponse.data.message, {
                hideProgressBar: true,
                autoClose: 2000,
            })

            dispatch(authAction.setSuccessMsg(verificationResponse.data.message))
            callbackFn();
        } catch (err) {
            console.log(err);
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setError(true))
            toast.error(extractErrorMessage(err));
            dispatch(authAction.setErrorMsg(extractErrorMessage(err)));
        }
    }
}

export const forgetPassword = (email: string, callbackFn: Function) => {
    return async (dispatch: Function) => {
        dispatch(authAction.setIsLoading(true));

        try {
            const response: any = await forgetPasswordHandler(email);
            console.log(response.data)
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setData(response.data.token));
            callbackFn();

        } catch (err) {
            console.log(err);
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setError(true))
            toast.error(extractErrorMessage(err));
            dispatch(authAction.setErrorMsg(extractErrorMessage(err)));
        }
    }
}

export const resetPassword = (data: {}, callbackFn: Function) => {
    return async (dispatch: Function) => {
        dispatch(authAction.setIsLoading(true));

        try {
            const response: any = await resetPasswordHandler(data);
            dispatch(authAction.setIsLoading(false));
            toast.success(response.data.message, {
                hideProgressBar: true,
                autoClose: 2000,
            })
            dispatch(authAction.setSuccessMsg(response.data.message));
            callbackFn();

        } catch (err) {
            console.log(err);
            dispatch(authAction.setIsLoading(true));
            dispatch(authAction.setError(true))
            toast.error(extractErrorMessage(err));
            dispatch(authAction.setErrorMsg(extractErrorMessage(err)));
        }
    }
}