import {boardAction} from "../slice/boardSlice";
import {extractMessage, toastError} from "../utils/helperFn";
import {TaskColumnOptions} from "../utils/types";
import {createTaskColumn, deleteTaskColumn, getTaskColumn, updateTaskColumn} from "../services/taskColumnService";

export const addTaskColumn = ({name, boardTag}: TaskColumnOptions) => {
    return async (dispatch: Function) => {
        dispatch(boardAction.setIsLoading(true));
        try {
            const response: any = await createTaskColumn({name, boardTag});
            dispatch(boardAction.setIsLoading(false));
            const taskColumn = response.data.data;
            dispatch(boardAction.addTaskColumn({taskColumn}));
        } catch (err) {
            dispatch(boardAction.setIsLoading(false));
            dispatch(boardAction.setError(true));
            const errorMsg = extractMessage(err);
            toastError(extractMessage(errorMsg));
            dispatch(boardAction.setErrorMsg(errorMsg));
        }
    };
};


export const editTaskColumn = ({name, taskColumnId, boardTag}: TaskColumnOptions) => {
    return async (dispatch: Function) => {
        dispatch(boardAction.setIsLoading(true));
        try {
            const response: any = await updateTaskColumn({name, taskColumnId, boardTag});
            dispatch(boardAction.setIsLoading(false));
            const taskColumn = response.data.data;
            dispatch(boardAction.editTaskColumn({taskColumn, taskColumnId}));
        } catch (err) {
            dispatch(boardAction.setIsLoading(false));
            dispatch(boardAction.setError(true));
            const errorMsg = extractMessage(err);
            toastError(extractMessage(errorMsg));
            dispatch(boardAction.setErrorMsg(errorMsg));
        }
    };
};


export const removeTaskColumn = ({taskColumnId, boardTag}: TaskColumnOptions) => {
    return async (dispatch: Function) => {
        dispatch(boardAction.setIsLoading(true));
        try {
            await deleteTaskColumn({taskColumnId, boardTag});
            dispatch(boardAction.deleteTaskColumn({taskColumnId}));
            const response: any = await getTaskColumn({name: "no status", boardTag});
            const taskColumn = response.data.data;
           if(taskColumn){
               dispatch(boardAction.addTaskColumn({taskColumn}));
           }
        } catch (err) {
            const errorMsg = extractMessage(err);
            toastError(errorMsg);
            dispatch(boardAction.setError(true));
            dispatch(boardAction.setErrorMsg(errorMsg));
        } finally {
            dispatch(boardAction.setIsLoading(false));
        }
    };
};



