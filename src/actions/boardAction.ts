import {userAction} from "../slice/userSlice";
import {extractMessage, toastError, toastSuccess} from "../utils/helperFn";
import {createBoard} from "../services/boardService";

export const addBoard = (file: any, boardName: string) => {
    return async (dispatch: Function) => {
        dispatch(userAction.setIsLoading(true));
        try {
            const response: any = await createBoard(file, boardName);
            console.log("Board response ==> ", response)
            dispatch(userAction.setIsLoading(false));
            toastSuccess(extractMessage(response.data.message));
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