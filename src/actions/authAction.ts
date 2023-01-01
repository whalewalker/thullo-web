import {authAction} from "../slice/authSlice";
import {loginHandler, registerHandler, verifyUserHandler} from "../services/authService";

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
            dispatch(authAction.setErrorMsg(err));
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
            dispatch(authAction.setSuccessMsg(verificationResponse.data.message))
            callbackFn();
        } catch (err) {
            console.log(err);
            dispatch(authAction.setIsLoading(false));
            dispatch(authAction.setError(true))
            dispatch(authAction.setErrorMsg(err));
        }
    }
}
