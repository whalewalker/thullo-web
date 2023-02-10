import { extractMessage, toastError, toastSuccess } from "../utils/helperFn";
import {
  createBoard,
  getAllBoards,
  createTask,
} from "../services/boardService";
import { boardAction } from "../slice/boardSlice";

export const addBoard = (file: any, boardName: string) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));
    try {
      // sending a request for board to be added
      const response: any = await createBoard(file, boardName);
      dispatch(boardAction.setIsLoading(false));
      toastSuccess(extractMessage(response.data.message));

      // dispatching an action that adds board to boardList
      dispatch(boardAction.addBoardToBoardList(response.data.data));
    } catch (err) {
      dispatch(boardAction.setIsLoading(false));
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const getBoards = () => {
  return async (dispatch: Function) => {
    try {
      const response: any = await getAllBoards();
      dispatch(boardAction.setIsLoading(false));

      // dispatching an action that adds board to boardList
      dispatch(boardAction.getAllBoards(response.data.data));
    } catch (err) {
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const addTask = ({
  columnId,
  boardId,
  taskName,
  file,
}: {
  columnId: string;
  boardId: string;
  taskName: string;
  file: any;
}) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));

    try {
      // request for create task
      const response: any = await createTask({ columnId, taskName, file });
      dispatch(boardAction.setIsLoading(false));
      dispatch(
        boardAction.setSuccessMsg(extractMessage(response.data.message))
      );
      const task = response.data.data;
      dispatch(boardAction.addTask({ boardId, columnId, task }));
      toastSuccess(extractMessage(response.data.message));
    } catch (err) {
      dispatch(boardAction.setIsLoading(false));
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};
