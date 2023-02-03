import {authAction} from "../slice/authSlice";
import {
    forgetPasswordHandler,
    loginHandler,
    registerHandler,
    resetPasswordHandler,
    verifyUserHandler
} from "../services/authService";
import {extractMessage, toastError, toastSuccess} from "../utils/helperFn";
import {ACCESS_TOKEN} from "../utils/constants";

export const login = (data: {}, callbackFn: Function) => {
    return async (dispatch: Function) => {
        dispatch(authAction.setIsLoading(true));
        try {
            const response: any = await loginHandler(data);
            localStorage.setItem(ACCESS_TOKEN, response.data.data.jwtToken)

            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setData(response.data))
            callbackFn();
        } catch (err) {
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setError(true))
            const errorMsg = extractMessage(err)
            toastError(extractMessage(errorMsg));
            dispatch(authAction.setErrorMsg(errorMsg));
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
            toastSuccess(verificationResponse.data.message)
            dispatch(authAction.setSuccessMsg(verificationResponse.data.message))
            callbackFn();
        } catch (err) {
            console.log(err);
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setError(true))
            const errorMsg = extractMessage(err)
            toastError(extractMessage(errorMsg));
            dispatch(authAction.setErrorMsg(errorMsg));
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
            const errorMsg = extractMessage(err)
            toastError(extractMessage(errorMsg));
            dispatch(authAction.setErrorMsg(errorMsg));
        }
    }
}

export const resetPassword = (data: {}, callbackFn: Function) => {
    return async (dispatch: Function) => {
        dispatch(authAction.setIsLoading(true));

        try {
            const response: any = await resetPasswordHandler(data);
            dispatch(authAction.setIsLoading(false));
            toastSuccess(response.data.message)
            dispatch(authAction.setSuccessMsg(response.data.message));
            callbackFn();

        } catch (err) {
            console.log(err);
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setError(true))
            const errorMsg = extractMessage(err)
            toastError(extractMessage(errorMsg));
            dispatch(authAction.setErrorMsg(errorMsg));
        }
    }
}