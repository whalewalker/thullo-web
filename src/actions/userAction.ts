import {userAction} from "../slice/userSlice";
import {extractMessage, toastError, toastSuccess} from "../utils/helperFn";
import {getCurrentUser, updateUserDetails} from "../services/userService";

export const getUserDetails = () => {
    return async (dispatch: Function) => {
        dispatch(userAction.setIsLoading(true));
        try {
            const response: any = await getCurrentUser();
            dispatch(userAction.setIsLoading(false));
            dispatch(userAction.setData(response.data))
        } catch (err) {
            dispatch(userAction.setIsLoading(false));
            dispatch(userAction.setError(true))
            const errorMsg = extractMessage(err)
            toastError(extractMessage(errorMsg));
            dispatch(userAction.setErrorMsg(errorMsg));
        }
    }
}

export const updateUserProfile = (data: {}, callbackFn: Function) => {
    return async (dispatch: Function) => {
        dispatch(userAction.setIsLoading(true));
        try {
            const response: any = await updateUserDetails(data);
            dispatch(userAction.setIsLoading(false));
            dispatch(userAction.setData(response.data))
            toastSuccess(response.data.message)
            callbackFn();
        } catch (err) {
            dispatch(userAction.setIsLoading(false));
            dispatch(userAction.setError(true))
            const errorMsg = extractMessage(err)
            toastError(extractMessage(errorMsg));
            dispatch(userAction.setErrorMsg(errorMsg));
        }
    }
}

